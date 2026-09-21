import sharp from 'sharp';
import {execFileSync} from 'node:child_process';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
const ffmpeg=process.env.PORTFOLIO_FFMPEG||'ffmpeg';
const scratch=await mkdtemp(tmpdir()+'/helmet-loop-');
const size=720,frames=96;
const {data}=await sharp('public/animation/helmet-particles-source.png').resize(size,size).flatten({background:'#000'}).grayscale().raw().toBuffer({resolveWithObject:true});
const points=[];
const hash=n=>{n=Math.imul(n^61,0x45d9f3b);return((n^(n>>>16))>>>0)/4294967296};
for(let y=0;y<size;y++)for(let x=0;x<size;x++){
 const i=y*size+x,value=data[i];
 if(value<=65)continue;
 // Follow the crest's curved mounting line. Motion vanishes at the metal root.
 const root=178+(x<370?.0015:.003)*(x-370)**2;
 const wind=Math.pow(Math.max(0,Math.min(1,(root-y)/135)),1.3);
 points.push({x,y,value,wind,phase:hash(i)*Math.PI*2,spark:hash(i+731)<.003,seed:i});
}
try{
 for(let f=0;f<frames;f++){
  const phase=f/frames*Math.PI*2,pixels=Buffer.alloc(size*size*3);
  const put=(x,y,v)=>{if(x<0||y<0||x>=size||y>=size)return;const i=(y*size+x)*3;pixels[i]=pixels[i+1]=pixels[i+2]=Math.max(pixels[i],v);};
  for(const p of points){
   // Coherent gusts travel through the bristles; the metal never turns or drifts.
   const gust=27*Math.sin(phase)+10*Math.sin(phase*2-p.x*.013)+5*Math.sin(phase*3+p.y*.04);
   const x=Math.round(p.x+p.wind*gust);
   const y=Math.round(p.y-p.wind*(6*Math.sin(phase)+3*Math.sin(phase*2+p.x*.014)));
   const wave=.87+.09*Math.sin(phase*2-p.x*.009-p.y*.005)+.04*Math.sin(phase*5+p.phase);
   const glint=Math.pow(Math.max(0,Math.sin(phase*3+p.phase)),18);
   const flicker=hash(p.seed+f*196613)<.035;
   const threshold=68+12*Math.sin(phase*2+p.x*.012+p.y*.01);
   if(p.value<threshold||flicker)continue;
   const value=Math.round(Math.min(255,(p.value-42)*1.35*wave+glint*35));
   put(x,y,value);
   if(p.spark&&glint>.6)for(let d=-2;d<=2;d++){
    put(x+d,y,Math.round(240*(1-Math.abs(d)/3)*glint));
    put(x,y+d,Math.round(240*(1-Math.abs(d)/3)*glint));
   }
  }
  await sharp(pixels,{raw:{width:size,height:size,channels:3}}).png({compressionLevel:3}).toFile(`${scratch}/${String(f).padStart(4,'0')}.png`);
  if(f===0){const rgba=Buffer.alloc(size*size*4);for(let i=0;i<size*size;i++){rgba[i*4]=rgba[i*4+1]=rgba[i*4+2]=255;rgba[i*4+3]=pixels[i*3];}await sharp(rgba,{raw:{width:size,height:size,channels:4}}).webp({quality:94,alphaQuality:100}).toFile('public/animation/helmet-gust-poster.webp');}
 }
 const run=args=>execFileSync(ffmpeg,['-hide_banner','-loglevel','error','-y',...args]);
 run(['-framerate','12','-i',`${scratch}/%04d.png`,'-an','-c:v','libx264','-preset','slow','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart','public/animation/helmet-gust.mp4']);
 run(['-i','public/animation/helmet-gust.mp4','-vf','scale=384:384:flags=lanczos','-an','-c:v','libx264','-preset','slow','-crf','22','-pix_fmt','yuv420p','-movflags','+faststart','public/animation/helmet-gust-small.mp4']);
 console.log(`Helmet: ${frames} frames, 8-second closed wind cycle, fixed metal, local dither pulses.`);
}finally{await rm(scratch,{recursive:true,force:true});}
