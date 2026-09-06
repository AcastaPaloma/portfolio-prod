"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = { name: string; src: string; smallSrc?: string; poster: string; width: number; height: number; className?: string; monochrome?: boolean; packedAlpha?: boolean; controls?: boolean };

// Effects are baked offline. One pass removes a black matte or samples packed alpha.
function createRenderer(canvas: HTMLCanvasElement, video: HTMLVideoElement, packedAlpha: boolean) {
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, powerPreference: "low-power" });
  if (!gl) return null;
  const shaders: WebGLShader[] = [];
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source); gl.compileShader(shader); shaders.push(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error("Video shader unavailable");
    return shader;
  };
  const program = gl.createProgram()!;
  const buffer = gl.createBuffer();
  const texture = gl.createTexture();
  const dispose = () => { gl.deleteTexture(texture); gl.deleteBuffer(buffer); gl.deleteProgram(program); shaders.forEach(shader => gl.deleteShader(shader)); };
  try {
    gl.attachShader(program, compile(gl.VERTEX_SHADER, `attribute vec2 p; varying vec2 uv; void main(){uv=vec2((p.x+1.0)*.5,(1.0-p.y)*.5);gl_Position=vec4(p,0.,1.);}`));
    const sample = packedAlpha
      ? `vec3 c=texture2D(frame,vec2(uv.x,uv.y*.5)).rgb;float a=texture2D(frame,vec2(uv.x,.5+uv.y*.5)).r;`
      : `vec3 c=texture2D(frame,uv).rgb;float peak=max(c.r,max(c.g,c.b));float a=smoothstep(.025,.09,peak);`;
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, `precision mediump float; varying vec2 uv; uniform sampler2D frame; void main(){${sample}gl_FragColor=vec4(c*a,a);}`));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("Video shader unavailable");
    gl.useProgram(program); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    return { draw() {
      if (video.readyState < 2 || gl.isContextLost()) return false;
      const height=video.videoHeight/(packedAlpha?2:1);
      if (canvas.width !== video.videoWidth || canvas.height !== height) { canvas.width=video.videoWidth; canvas.height=height; }
      gl.viewport(0,0,canvas.width,canvas.height);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,video);
      gl.drawArrays(gl.TRIANGLES,0,6); return true;
    }, dispose };
  } catch { dispose(); return null; }
}

export function TransparentLoop({name,src,smallSrc,poster,width,height,className="",monochrome=false,packedAlpha=false,controls=true}: Props) {
  const host=useRef<HTMLDivElement>(null), video=useRef<HTMLVideoElement>(null), canvas=useRef<HTMLCanvasElement>(null);
  const preference=useRef<boolean|null>(null), sync=useRef<()=>void>(()=>{});
  const [playing,setPlaying]=useState(false);
  const [ready,setReady]=useState(false);
  const [supported,setSupported]=useState(true);
  useEffect(()=>{
    const el=video.current, surface=canvas.current, wrapper=host.current;
    if(!el||!wrapper||!surface)return;
    const reduce=matchMedia("(prefers-reduced-motion: reduce)");
    let visible=false, disposed=false, frame=0, timer=0, renderer:ReturnType<typeof createRenderer>=null;
    const cancel=()=>{if(frame)el.cancelVideoFrameCallback?.(frame);clearTimeout(timer);frame=0;timer=0;};
    const draw=()=>{if(renderer?.draw())setReady(true);};
    const tick=()=>{frame=0;timer=0;if(disposed||el.paused||!visible||document.hidden)return;draw();schedule();};
    const schedule=()=>{if(frame||timer)return;if(el.requestVideoFrameCallback)frame=el.requestVideoFrameCallback(tick);else timer=window.setTimeout(tick,packedAlpha?42:83);};
    const update=()=>{
      if(disposed)return;
      if(visible&&!document.hidden&&(preference.current??!reduce.matches)) {
        if(!renderer){renderer=createRenderer(surface,el,packedAlpha);if(!renderer){setSupported(false);return;}}
        void el.play().then(()=>{if(disposed){el.pause();return;}draw();schedule();}).catch(()=>{});
      } else {el.pause();cancel();}
    };
    const paused=()=>{setPlaying(false);cancel();};
    const started=()=>{setPlaying(true);schedule();};
    const lost=(event:Event)=>{event.preventDefault();el.pause();cancel();setReady(false);};
    const restored=()=>{renderer?.dispose();renderer=null;update();};
    const error=()=>{setReady(false);setSupported(false);el.pause();cancel();};
    sync.current=update;
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting&&entry.intersectionRatio>.05;update();},{threshold:[0,.05]});
    observer.observe(wrapper);
    reduce.addEventListener("change",update); document.addEventListener("visibilitychange",update);
    el.addEventListener("play",started);el.addEventListener("pause",paused);el.addEventListener("loadeddata",draw);el.addEventListener("error",error);
    surface?.addEventListener("webglcontextlost",lost);surface?.addEventListener("webglcontextrestored",restored);
    return()=>{disposed=true;cancel();observer.disconnect();reduce.removeEventListener("change",update);document.removeEventListener("visibilitychange",update);el.removeEventListener("play",started);el.removeEventListener("pause",paused);el.removeEventListener("loadeddata",draw);el.removeEventListener("error",error);surface?.removeEventListener("webglcontextlost",lost);surface?.removeEventListener("webglcontextrestored",restored);el.pause();renderer?.dispose();};
  },[src,packedAlpha]);
  return <div ref={host} className={`transparent-loop ${monochrome?"monochrome-loop":""} ${className}`} style={{aspectRatio:`${width}/${height}`}}>
    <div className="loop-art" role="img" aria-label={name}>
      <Image unoptimized className="loop-poster" src={poster} width={width} height={height} alt="" loading="lazy" decoding="async" style={{visibility:ready?"hidden":"visible"}} />
      <canvas ref={canvas} width={width} height={height} aria-hidden="true" style={{visibility:ready?"visible":"hidden"}} />
    </div>
    <video ref={video} className="loop-source" muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1}>
      {smallSrc&&<source media="(max-width:48rem)" src={smallSrc} type="video/mp4"/>}<source src={src} type="video/mp4"/>
    </video>
    {supported&&controls&&<button className="loop-toggle" type="button" aria-label={`${playing?"Pause":"Play"} ${name}`} onClick={()=>{preference.current=video.current?.paused??true;sync.current();}}>
      <svg viewBox="0 0 24 24" aria-hidden="true">{playing?<path d="M8 5v14M16 5v14"/>:<path d="m8 5 11 7-11 7Z"/>}</svg>
    </button>}
  </div>;
}
