import sharp from 'sharp';
import {execFileSync} from 'node:child_process';
import {mkdtemp,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
const ffmpeg=process.env.PORTFOLIO_FFMPEG||'ffmpeg';
const scratch=await mkdtemp(tmpdir()+'/portfolio-ink-');
const run=args=>execFileSync(ffmpeg,['-hide_banner','-loglevel','error','-y',...args]);
try {
 run(['-i','public/animation/ink-source.webm','-vf','scale=960:540,format=gray','-f','rawvideo',`${scratch}/frames.gray`]);
 const raw=await readFile(`${scratch}/frames.gray`),size=960*540,count=raw.length/size;
 let left=960,top=540,right=0,bottom=0;
 for(let f=0;f<count;f++)for(let y=0;y<540;y++)for(let x=0;x<960;x++)if(raw[f*size+y*960+x]>30){left=Math.min(left,x);top=Math.min(top,y);right=Math.max(right,x);bottom=Math.max(bottom,y);}
 left=Math.max(0,left-8);top=Math.max(0,top-8);
 const width=Math.ceil((right-left+9)/2)*2,height=Math.ceil((bottom-top+9)/2)*2;
 const sequence=[...Array(count).keys(),...Array.from({length:count-2},(_,i)=>count-2-i)];
 for(let i=0;i<sequence.length;i++){
  const frame=raw.subarray(sequence[i]*size,(sequence[i]+1)*size);
  const crop=sharp(frame,{raw:{width:960,height:540,channels:1}}).extract({left,top,width,height});
  await crop.clone().png().toFile(`${scratch}/${String(i).padStart(3,'0')}.png`);
  if(i===0){const alpha=await crop.clone().grayscale().raw().toBuffer();const rgba=Buffer.alloc(width*height*4);for(let p=0;p<width*height;p++){rgba[p*4]=rgba[p*4+1]=rgba[p*4+2]=255;rgba[p*4+3]=alpha[p];}await sharp(rgba,{raw:{width,height,channels:4}}).webp({lossless:true}).toFile('public/animation/ink-around-poster.webp');}
 }
 run(['-framerate','4','-i',`${scratch}/%03d.png`,'-an','-c:v','libx264','-preset','slow','-crf','22','-pix_fmt','yuv420p','-movflags','+faststart','public/animation/ink-around.mp4']);
 console.log({width,height,frames:sequence.length,fps:4});
} finally {await rm(scratch,{recursive:true,force:true});}
