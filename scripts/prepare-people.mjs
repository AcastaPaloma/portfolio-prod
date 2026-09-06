import sharp from 'sharp';
import {mkdir,writeFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';

const selected=[
 ['IMG_1552.HEIC','pinata-1552'],['IMG_1225.HEIC','pinata-1225'],
 ['IMG_0839.JPG','pinata-0839'],['DSC_3876.JPEG','pinata-3876'],
 ['IMG_0752.HEIC','around-0752'],['IMG_0738.HEIC','around-0738'],
];
const originals=['after-rain','off-the-clock','hills','window','a-short-break','circa-2026'];
await mkdir('public/people',{recursive:true});
await mkdir('/tmp/portfolio-people-inputs',{recursive:true});
const manifest=[];
async function prepare(source,name){
 const photo=sharp(source).rotate();
 const info=await photo.clone().resize({width:1100,withoutEnlargement:true}).webp({quality:87}).toFile(`public/people/${name}.webp`);
 await photo.clone().resize({width:550,withoutEnlargement:true}).webp({quality:83}).toFile(`public/people/${name}-small.webp`);
 manifest.push({name,width:info.width,height:info.height});
}
for(const [file,name] of selected){
 const jpeg=`/tmp/portfolio-people-inputs/${file.split('.')[0]}.jpg`;
 execFileSync('sips',['-s','format','jpeg','-Z','1600',`/Users/kuanw/Pictures/${file}`,'--out',jpeg],{stdio:'ignore'});
 await prepare(jpeg,name);
}
for(const name of originals)await prepare(`public/photos/${name}-original.webp`,name);
await writeFile('public/people/manifest.json',JSON.stringify(manifest,null,2)+'\n');
console.log(`Prepared ${manifest.length} full-color photographs, with stripped metadata and mobile variants.`);
