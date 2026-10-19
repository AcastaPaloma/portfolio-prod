// Copies the Genie and π0.7 write-ups into public/ so they are served at kuant.space/genie/ and kuant.space/pi/.
// Their sources stay in their own repos; this runs before every build. By default it takes a shallow sparse
// clone of each repo's main branch. `--local` copies from the sibling checkouts in ../../_learn instead, for
// previewing unpushed edits.
import {execFileSync} from 'node:child_process';
import {cp,mkdtemp,readdir,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
const local=process.argv.includes('--local');
const projects=[
 // The repo is named genie on GitHub; the local checkout is still genie3.
 {name:'genie',repo:'https://github.com/AcastaPaloma/genie',checkout:'../../_learn/genie3',dir:'docs',skip:[]},
 // Matches what the pi repo's Pages workflow used to publish: the reader, not the editor or its tooling.
 {name:'pi',repo:'https://github.com/AcastaPaloma/pi',checkout:'../../_learn/pi',dir:'writeup',skip:['editor.css','editor.mjs','editor-server.mjs','author-copy.json','package.json','README.md','RESEARCH.md','VERIFICATION.md','scripts','tests']},
];
const git=args=>execFileSync('git',args,{stdio:['ignore','ignore','inherit']});
const scratch=await mkdtemp(join(tmpdir(),'portfolio-projects-'));
try {
 for(const project of projects){
  let source;
  if(local)source=join(resolve(project.checkout),project.dir);
  else {
   const clone=join(scratch,project.name);
   git(['clone','--depth','1','--filter=blob:none','--sparse',project.repo,clone]);
   git(['-C',clone,'sparse-checkout','set',project.dir]);
   source=join(clone,project.dir);
  }
  const target=join('public',project.name);
  await rm(target,{recursive:true,force:true});
  await cp(source,target,{recursive:true,filter:path=>!path.split('/').includes('.DS_Store')});
  for(const entry of project.skip)await rm(join(target,entry),{recursive:true,force:true});
  console.log(`${project.name}: ${(await readdir(target)).length} entries from ${local?source:project.repo}`);
 }
} finally {await rm(scratch,{recursive:true,force:true});}
