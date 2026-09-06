import sharp from 'sharp';
import {execFileSync} from 'node:child_process';
import {mkdtemp,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
const ffmpeg=process.env.PORTFOLIO_FFMPEG||'ffmpeg';
const scratch=await mkdtemp(tmpdir()+'/globe-alpha-');
const size=600,pixels=size*size,fps=24;
const run=args=>execFileSync(ffmpeg,['-hide_banner','-loglevel','error','-y',...args]);
try{
 run(['-i','/Users/kuanw/Downloads/Bloop-orbitglobe-15s.mp4','-an','-vf',`fps=${fps},scale=${size}:${size}:flags=lanczos,format=rgb24`,'-f','rawvideo',`${scratch}/source.rgb`]);
 const raw=await readFile(`${scratch}/source.rgb`),count=Math.floor(raw.length/(pixels*3));
 for(let f=0;f<count;f++){
  const rgb=raw.subarray(f*pixels*3,(f+1)*pixels*3),background=new Uint8Array(pixels),queue=new Int32Array(pixels);
  const key=[rgb[0],rgb[1],rgb[2]];let end=0;
  const visit=i=>{
   if(i<0||i>=pixels||background[i])return;
   const p=i*3,r=rgb[p],g=rgb[p+1],b=rgb[p+2];
   // Connected matte and its neutral shadow. Interior photo colors stay opaque.
   if(Math.max(Math.abs(r-key[0]),Math.abs(g-key[1]),Math.abs(b-key[2]))>10||Math.max(r,g,b)-Math.min(r,g,b)>16)return;
   background[i]=1;queue[end++]=i;
  };
  for(let x=0;x<size;x++){visit(x);visit((size-1)*size+x);}
  for(let y=0;y<size;y++){visit(y*size);visit(y*size+size-1);}
  for(let q=0;q<end;q++){const i=queue[q];if(i%size)visit(i-1);if(i%size<size-1)visit(i+1);visit(i-size);visit(i+size);}
  const alpha=Buffer.alloc(pixels,255);
  for(let i=0;i<pixels;i++)if(background[i])alpha[i]=0;
  // Small enclosed gaps between photo planes can be disconnected from the outer matte.
  for(let i=0;i<pixels;i++)if(!background[i]){
   const p=i*3;
   if(Math.max(Math.abs(rgb[p]-key[0]),Math.abs(rgb[p+1]-key[1]),Math.abs(rgb[p+2]-key[2]))<=3)alpha[i]=0;
  }
  const refined=await sharp(alpha,{raw:{width:size,height:size,channels:1}}).dilate(1).erode(1).blur(.4).grayscale().raw().toBuffer();
  const mask=await sharp(refined,{raw:{width:size,height:size,channels:1}}).png().toBuffer();
  const color=await sharp(rgb,{raw:{width:size,height:size,channels:3}}).png().toBuffer();
  await sharp({create:{width:size,height:size*2,channels:3,background:'#000'}}).composite([{input:color,left:0,top:0},{input:mask,left:0,top:size}]).png({compressionLevel:1}).toFile(`${scratch}/${String(f).padStart(4,'0')}.png`);
  if(f===0){
   await sharp(rgb,{raw:{width:size,height:size,channels:3}}).joinChannel(refined,{raw:{width:size,height:size,channels:1}}).webp({quality:90,alphaQuality:100}).toFile('public/animation/morgan-orbit-alpha-poster.webp');
  }
 }
 run(['-framerate',String(fps),'-i',`${scratch}/%04d.png`,'-an','-c:v','libx264','-preset','slow','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart','public/animation/morgan-orbit-alpha.mp4']);
 run(['-i','public/animation/morgan-orbit-alpha.mp4','-vf','scale=384:768:flags=lanczos','-an','-c:v','libx264','-preset','slow','-crf','22','-pix_fmt','yuv420p','-movflags','+faststart','public/animation/morgan-orbit-alpha-small.mp4']);
 console.log(`Globe: ${count} full-color frames with a separate alpha mask, ${size}px / 384px mobile.`);
}finally{await rm(scratch,{recursive:true,force:true});}
