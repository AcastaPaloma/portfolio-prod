"use client";

import {useEffect,useRef,useState} from "react";
import {TransparentLoop} from "./transparent-loop";

// Sample ballistic arcs once, then let the compositor play only transforms.
function hopRoute(width:number,height:number,size:number):Keyframe[] {
  const ground=height-size-64;
  const right=Math.max(12,width-size-20),middle=(width-size)*.46,left=16;
  const frames:Keyframe[]=[];
  const point=(offset:number,x:number,y:number,angle=0,sx=1,sy=1)=>frames.push({offset,transform:`translate3d(${x}px,${y}px,0) rotate(${angle}deg) scale(${sx},${sy})`});
  const hop=(start:number,end:number,x1:number,y1:number,x2:number,y2:number,lift:number)=>{
    point(start-.008,x1,y1,0,1.1,.85);
    for(let i=0;i<=24;i++){
      const t=i/24;
      point(start+(end-start)*t,x1+(x2-x1)*t,y1+(y2-y1)*t-4*lift*t*(1-t),Math.sin(t*Math.PI*2)*(x2>x1?9:-9));
    }
    point(end+.008,x2,y2,0,1.13,.82);
    point(end+.025,x2,y2);
  };
  point(0,right,ground);point(.15,right,ground);
  hop(.17,.25,right,ground,middle,ground,Math.min(120,height*.16));
  point(.40,middle,ground);
  hop(.42,.49,middle,ground,left,ground-24,Math.min(100,height*.13));
  point(.66,left,ground-24);
  hop(.68,.81,left,ground-24,right,ground,Math.min(200,height*.27));
  point(1,right,ground);
  return frames;
}

export function RovingPinata(){
 const body=useRef<HTMLDivElement>(null),animation=useRef<Animation|null>(null),active=useRef(false);
 const [playing,setPlaying]=useState(false),[preference,setPreference]=useState<boolean|null>(null);
 useEffect(()=>{
  const el=body.current;if(!el)return;
  const layout=()=>{
   const time=animation.current?.currentTime??0;
   animation.current?.cancel();
   const next=el.animate(hopRoute(innerWidth,innerHeight,el.offsetWidth),{duration:22000,iterations:Infinity,easing:"linear"});
   next.currentTime=time;animation.current=next;
   if(!active.current)next.pause();
  };
  layout();window.addEventListener("resize",layout);
  return()=>{window.removeEventListener("resize",layout);animation.current?.cancel();};
 },[]);
 useEffect(()=>{active.current=playing;if(playing)animation.current?.play();else animation.current?.pause();},[playing]);
 return <div className="roving-pinata">
  <div className="pinata-body" ref={body}>
   <TransparentLoop name="roaming piñata" src="/animation/pinata-roam.mp4" poster="/animation/pinata-leap-poster.webp" width={672} height={672} controls={false} motionPreference={preference} onPlaybackChange={setPlaying}/>
  </div>
  <button className="roving-toggle" type="button" aria-label={`${playing?"Pause":"Play"} roaming piñata`} onClick={()=>setPreference(!playing)}>
   <svg viewBox="0 0 24 24" aria-hidden="true">{playing?<path d="M8 5v14M16 5v14"/>:<path d="m8 5 11 7-11 7Z"/>}</svg>
  </button>
 </div>;
}
