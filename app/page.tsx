import { ColorBoundary } from "@/components/color-boundary";
import { TransparentLoop } from "@/components/transparent-loop";
import { InlineIcon } from "@/components/inline-icon";
import { getDuolingoProfile } from "@/lib/duolingo";
import { StreakCard } from "@/components/streak-card";
import Image from "next/image";
import type { ReactNode } from "react";
import "./dither.css";

type Photo = { name:string; width:number; height:number; alt:string; location?:ReactNode };
const pinataPhotos: Photo[] = [
  {name:"pinata-1552",width:1100,height:1467,alt:"An event directory screen at Open House Montreal"},
  {name:"pinata-1225",width:1100,height:1467,alt:"Three friends smiling together with a Google sign"},
  {name:"pinata-0839",width:1100,height:733,alt:"The audience gathered at a Piñata Pitch event"},
  {name:"pinata-3876",width:1066,height:1600,alt:"A colorful donkey piñata at a Build Day event"},
];
const aroundPhotos: Photo[] = [
  {name:"around-0752",width:1100,height:1467,alt:"A childhood photo, asleep under a red blanket"},
  {name:"around-2721",width:738,height:1600,alt:"A person peeking out of an inflatable dinosaur costume"},
];
const moments: Photo[] = [
  {name:"eze",width:1100,height:619,alt:"A French flag above tiled rooftops overlooking the Mediterranean coastline",location:"Èze, France"},
  {name:"villefranche",width:900,height:1600,alt:"A narrow stone stairway between colorful buildings at dusk",location:"Villefranche-sur-Mer, France"},
  {name:"monte-carlo",width:1100,height:1467,alt:"A Spider-Man sculpture above a car beside a coral-colored building",location:"Monte Carlo, Monaco"},
  {name:"saint-paul-de-vence",width:1100,height:1467,alt:"A figure suspended between sunlit stone buildings above a courtyard",location:"Saint-Paul-de-Vence, France"},
  {name:"paris",width:1100,height:1467,alt:"The Arc de Triomphe beneath a cloud-streaked sky",location:"Paris, France"},
  {name:"british-museum",width:1100,height:1467,alt:"A carved stone pig displayed in a museum case",location:"The British Museum, London"},
  {name:"chinatown",width:1100,height:1467,alt:"A bubble waffle held beneath rows of red lanterns",location:"Chinatown, London"},
  {name:"platja-de-la-riera",width:1100,height:1467,alt:"An orange sunset over the sea and a quiet beach",location:"Platja de la Riera, Spain"},
  {name:"after-rain",width:1100,height:1467,alt:"A rainy city street at dusk",location:"???"},
  {name:"window",width:1100,height:1467,alt:"A window framing a turquoise waterfront between yellow walls",location:"Menton, France"},
  {name:"circa-2026",width:768,height:1024,alt:"Four LEGO figures lined up on a boardwalk at the beach",location:"???"},
  {name:"aurora",width:1100,height:1467,alt:"Colorful auroras and stars above a lake and silhouetted trees",location:"???"},
  {name:"luray-caverns",width:1100,height:1467,alt:"Illuminated stalactites and tall rock formations inside a cavern",location:<>Luray Caverns, <span className="location-united">U</span>{""}<span className="location-states-of">S</span>{""}<span className="location-america">A</span></>},
  {name:"new-zealand",width:1100,height:1271,alt:"A coastal rock formation and beachgoers seen beneath a rock arch",location:"Cathedral Cove, New Zealand"},
];
function PhotoWall({photos,variant}:{photos:Photo[];variant:string}) {
  return <div className={variant==="moments"?"masonry-moments":`photo-bento bento-${variant}`}>
    {photos.map(photo=><figure key={photo.name} className={`photo-cell photo-${photo.name}`}>
      <a className="people-photo" href={`/people/${photo.name}.webp`} target="_blank" rel="noreferrer">
        <picture>
          <source media="(max-width:48rem)" srcSet={`/people/${photo.name}-small.webp`}/>
          <img src={`/people/${photo.name}.webp`} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async"/>
        </picture>
      </a>
      {photo.location&&<figcaption className="photo-location text-layer ink">{photo.location}</figcaption>}
    </figure>)}
  </div>;
}

function WebringNav() {
  const ringUrl="https://cs.uwatering.com/#https://www.kuant.space";
  return <nav className="webring-nav" aria-label="University of Waterloo Computer Science webring">
    <a href={`${ringUrl}?nav=prev`} aria-label="Previous site in the Waterloo CS webring">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7"/></svg>
    </a>
    <a href={ringUrl} target="_blank" rel="noreferrer" aria-label="Open the Waterloo CS webring">
      <Image src="https://cs.uwatering.com/icon.white.svg" alt="" width={24} height={24} unoptimized/>
    </a>
    <a href={`${ringUrl}?nav=next`} aria-label="Next site in the Waterloo CS webring">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 5 7 7-7 7"/></svg>
    </a>
  </nav>;
}

export default async function Home() {
  const bookingUrl=process.env.NEXT_PUBLIC_CAL_COM_URL||"https://cal.com/kywaterloo";
  const duolingo=await getDuolingoProfile();
  return <main className="dither-page">
    <section className="dither-intro" aria-labelledby="name">
      <div className="dither-intro-copy text-layer">
        <h1 id="name" className="ink">Kuan Yi Wang</h1>
        <p className="ink">I’m a computer science student at the <a href="https://uwaterloo.ca/"><span className="icon-word"><InlineIcon name="waterloo"/>University</span> of Waterloo</a>, now working on computer vision inference at <a href="https://reflex.inc/"><span className="icon-word"><InlineIcon name="reflex"/>Reflex</span></a> and representation learning at <a href="https://rbcborealis.com/"><span className="icon-word"><InlineIcon name="rbc-borealis"/>RBC</span> Borealis</a>. Previously, I worked on agentic systems at <a href="https://www.morganstanley.com/"><span className="icon-word"><InlineIcon name="morgan-stanley"/>Morgan</span> Stanley</a> and medical imaging at <a href="https://neuro.polymtl.ca/"><span className="icon-word"><InlineIcon name="neuropoly"/>NeuroPoly</span></a> (Mila).</p>
        <p className="ink">I also co-founded <a href="https://www.pinatapitch.tech"><InlineIcon name="pinata"/>Piñata Pitch</a>, turning 2000+ student ideas into startups.</p>
        <p className="ink">Outside of that: a little German every day + the gym + reading.</p>
        <StreakCard initial={duolingo}/>
        <nav className="dither-links ink" aria-label="Find me">
          <a href="/resume/kuan-yi-wang-resume.pdf"><InlineIcon name="resume"/>résumé</a>
          <a href="https://www.linkedin.com/in/kuan-yi-wang-443871319/"><InlineIcon name="linkedin"/>linkedin</a>
          <a href="mailto:ky7wang@uwaterloo.ca"><InlineIcon name="email"/>email</a>
          <a className="booking-link" href={bookingUrl} target="_blank" rel="noreferrer"><InlineIcon name="coffee"/>join me for a workout. or a coffee.</a>
        </nav>
      </div>
      <TransparentLoop className="minifigure-art" name="minifigure spin" src="/animation/minifigure-spin.mp4" smallSrc="/animation/minifigure-spin-small.mp4" poster="/animation/minifigure-transparent.webp" width={768} height={1032}/>
    </section>

    <section className="dither-work" aria-labelledby="work">
      <div className="work-copy text-layer">
        <h2 id="work" className="ink">A few things I’ve built.</h2>
        <ul>
          <li className="ink"><a href="https://acastapaloma.github.io/genie/"><InlineIcon name="world"/>Genie Doom World Model</a><span>Playable, action-conditioned Doom video from unlabeled footage.</span></li>
          <li className="ink"><a href="https://isef.net/project/phys061t-sparse-gnn-decoders-for-quantum-error-correction"><InlineIcon name="quantum"/>GNN Quantum Error Decoder</a><span>ISEF Silver · Physics &amp; Astronomy · Team Canada. <br /> Quantum error correction; sponsored by <b className="jane-street">Jane Street</b>.</span></li>
          <li className="ink"><a href="https://github.com/fiona-cai/ampitup"><InlineIcon name="code"/>Allot (1st 🏆 · Ramp × UW Blueprint)</a><span>Hackathon winner. Calendar and event-based budgets for companies.</span></li>
          <li className="ink"><a href="https://cortesol.onrender.com/"><InlineIcon name="network"/>Cortesol (HackThe6ix finalist)</a><span>Critical thinking over a knowledge graph.</span></li>
          <li className="ink"><a href="https://github.com/AcastaPaloma/MvPvP"><InlineIcon name="code"/>MvPVP (McHacks)</a><span>Competitive vibe coding. Build an MVP in five minutes.</span></li>
        </ul>
      </div>
      <TransparentLoop className="helmet-art" name="helmet particles" src="/animation/helmet-gust.mp4" smallSrc="/animation/helmet-gust-small.mp4" poster="/animation/helmet-gust-poster.webp" width={720} height={720} monochrome/>
    </section>

    <section className="dither-people" aria-labelledby="people">
      <h2 id="people" className="section-title text-layer ink">People.</h2>
      <section className="people-group" aria-labelledby="pinata-people">
        <div className="people-intro">
          <h3 id="pinata-people" className="text-layer ink"><InlineIcon name="pinata"/>Piñata Pitch</h3>
        </div>
        <PhotoWall photos={pinataPhotos} variant="pinata"/>
      </section>
      <div className="people-secondary">
      <section className="people-group morgan-group" aria-labelledby="morgan-people">
        <h3 id="morgan-people" className="section-title text-layer ink"><InlineIcon name="morgan-stanley"/>Morgan Stanley</h3>
        <TransparentLoop className="globe-art" name="Morgan Stanley photo globe" src="/animation/morgan-bloop-pair.mp4" smallSrc="/animation/morgan-bloop-pair-small.mp4" poster="/animation/morgan-bloop-black-poster.webp" lightPoster="/animation/morgan-bloop-white-poster.webp" width={600} height={600} controls={false}/>
      </section>
      <section className="people-group" aria-labelledby="around-people">
        <div className="around-intro">
          <h3 id="around-people" className="section-title text-layer ink">Around the dot</h3>
          <TransparentLoop className="ink-art" name="handwritten around the dot" src="/animation/ink-around.mp4" poster="/animation/ink-around-poster.webp" width={816} height={424} monochrome/>
        </div>
        <PhotoWall photos={aroundPhotos} variant="around"/>
      </section>
      </div>
    </section>

    <section className="dither-gallery" aria-labelledby="elsewhere">
      <h2 id="elsewhere" className="section-title text-layer ink">Elsewhere.</h2>
      <PhotoWall photos={moments} variant="moments"/>
    </section>
    <footer className="webring-footer"><WebringNav/></footer>
    <ColorBoundary/>
  </main>;
}
