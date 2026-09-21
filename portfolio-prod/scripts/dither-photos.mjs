import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

// Luminance-sized diamond halftones, inspired by Lance Yan's public reference.
// Everything is baked into images: no canvas, shader, animation loop, or photo metadata at runtime.
export async function renderDither(source, name, { columns = 180, threshold = .055, saturation = 1.8 } = {}) {
  const root = path.resolve('public/photos');
  await mkdir(root, { recursive: true });
  const input = sharp(source).rotate();
  await input.clone().resize({ width: 1500, withoutEnlargement: true }).webp({ quality: 86 }).toFile(`${root}/${name}-original.webp`);
  const {data,info} = await input.resize({width:columns}).flatten({background:'#fff'}).removeAlpha().raw().toBuffer({resolveWithObject:true});
  const cell = 6, width = info.width * cell, height = info.height * cell;
  const groups = new Map();
  for(let y=0; y<info.height; y++) for(let x=0; x<info.width; x++) {
    const p=(y*info.width+x)*3;
    const red=data[p], green=data[p+1], blue=data[p+2];
    const luminance=(.299*red+.587*green+.114*blue)/255;
    const density=1-luminance;
    if(density<threshold) continue;
    const alpha=Math.round((density-threshold)/(1-threshold)*16)/16;
    if(alpha<=0) continue;
    const average=(red+green+blue)/3;
    const channels=[red,green,blue].map(channel=>Math.max(0,Math.min(255,Math.round((average+(channel-average)*saturation)*.78/16)*16)));
    const key=`${channels.join(',')}/${alpha}`;
    const radius=(Math.sqrt(density)*cell*.83).toFixed(2);
    const cx=(x+.5)*cell, cy=(y+.5)*cell;
    const diamond=`M${cx} ${cy-Number(radius)}l${radius} ${radius}-${radius} ${radius}-${radius}-${radius}Z`;
    groups.set(key,(groups.get(key)||'')+diamond);
  }
  const paths=[...groups].map(([key,d])=>{const [rgb,alpha]=key.split('/'); return `<path fill="rgb(${rgb})" opacity="${alpha}" d="${d}"/>`;}).join('');
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="white"/>${paths}</svg>`;
  const image=sharp(Buffer.from(svg));
  await image.clone().webp({lossless:true,effort:6}).toFile(`${root}/${name}.webp`);
  await image.clone().resize({width:600}).webp({quality:90}).toFile(`${root}/${name}-small.webp`);
  console.log(`${name}: ${width} × ${height}, ${groups.size} ink groups`);
  return {name,width,height};
}
if(process.argv[2]) await renderDither(process.argv[2], process.argv[3] || 'photo');
