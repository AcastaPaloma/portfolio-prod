import sharp from 'sharp';
import {mkdir,writeFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';

const pictures=[
 ['IMG_1552.HEIC','pinata-1552'],['IMG_1225.HEIC','pinata-1225'],
 ['IMG_0839.JPG','pinata-0839'],['DSC_3876.JPEG','pinata-3876'],
 ['IMG_0752.HEIC','around-0752'],
];
const downloads=[
 ['IMG_2721.PNG','around-2721'],
 ['IMG_8880.jpg','eze'],['IMG_8856.jpg','villefranche'],
 ['IMG_8743.jpg','monte-carlo'],['IMG_8648.heic','saint-paul-de-vence'],
 ['IMG_8444.jpg','paris'],['IMG_3988.jpg','british-museum'],
 ['IMG_3954.jpg','chinatown'],['IMG_5444.HEIC','platja-de-la-riera'],
];
const selected=[
 ...pictures.map(([file,name])=>[`/Users/kuanw/Pictures/${file}`,name]),
 ...downloads.map(([file,name])=>[`/Users/kuanw/Downloads/${file}`,name]),
];
const originals=['after-rain','window','circa-2026'];
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
 const jpeg=`/tmp/portfolio-people-inputs/${name}.jpg`;
 execFileSync('sips',['-s','format','jpeg','-Z','1600',file,'--out',jpeg],{stdio:'ignore'});
 await prepare(jpeg,name);
}
for(const name of originals)await prepare(`public/photos/${name}-original.webp`,name);
await writeFile('public/people/manifest.json',JSON.stringify(manifest,null,2)+'\n');
console.log(`Prepared ${manifest.length} full-color photographs, with stripped metadata and mobile variants.`);
