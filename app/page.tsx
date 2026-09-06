import { ColorBoundary } from "@/components/color-boundary";
import { TransparentLoop } from "@/components/transparent-loop";
import { InlineIcon } from "@/components/inline-icon";
import "./dither.css";

type Photo = { name:string; width:number; height:number; alt:string };
const pinataPhotos: Photo[] = [
  {name:"pinata-1552",width:1100,height:1467,alt:"An event directory screen at Open House Montreal"},
  {name:"pinata-1225",width:1100,height:1467,alt:"Three friends smiling together with a Google sign"},
  {name:"pinata-0839",width:1100,height:733,alt:"The audience gathered at a Piñata Pitch event"},
  {name:"pinata-3876",width:1066,height:1600,alt:"A colorful donkey piñata at a Build Day event"},
];
const aroundPhotos: Photo[] = [
  {name:"around-0752",width:1100,height:1467,alt:"A childhood photo, asleep under a red blanket"},
  {name:"around-0738",width:1100,height:825,alt:"Two people together in a sunlit cloister garden"},
];
const moments: Photo[] = [
  {name:"after-rain",width:1100,height:1467,alt:"A rainy city street at dusk"},
  {name:"window",width:1100,height:1467,alt:"A window framing a turquoise waterfront between yellow walls"},
  {name:"off-the-clock",width:1100,height:825,alt:"Friends striking improbable poses on a sunny beach"},
  {name:"hills",width:1100,height:733,alt:"Two friends on a trail between green mountains"},
  {name:"a-short-break",width:1100,height:1467,alt:"Lying on the grass beside a pool with arms outstretched"},
  {name:"circa-2026",width:768,height:1024,alt:"Four LEGO figures lined up on a boardwalk at the beach"},
];
function PhotoWall({photos,variant}:{photos:Photo[];variant:string}) {return <div className={`photo-bento bento-${variant}`}>{photos.map(photo=><a key={photo.name} className={`people-photo photo-${photo.name}`} href={`/people/${photo.name}.webp`} target="_blank" rel="noreferrer"><picture><source media="(max-width:48rem)" srcSet={`/people/${photo.name}-small.webp`}/><img src={`/people/${photo.name}.webp`} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async"/></picture></a>)}</div>;}

export default function Home() {
  const bookingUrl=process.env.NEXT_PUBLIC_CAL_COM_URL||"https://cal.com";
  return <main className="dither-page">
    <section className="dither-intro" aria-labelledby="name">
      <div className="dither-intro-copy text-layer">
        <h1 id="name" className="ink">Kuan Yi Wang</h1>
        <p className="ink">I’m a computer science student at the <a href="https://uwaterloo.ca/"><span className="icon-word"><InlineIcon name="waterloo"/>University</span> of Waterloo</a>, now working on computer vision inference at <a href="https://reflex.inc/"><span className="icon-word"><InlineIcon name="reflex"/>Reflex</span></a>. Previously, I worked on agentic systems at <a href="https://www.morganstanley.com/"><span className="icon-word"><InlineIcon name="morgan-stanley"/>Morgan</span> Stanley</a> and medical imaging at <a href="https://neuro.polymtl.ca/"><span className="icon-word"><InlineIcon name="neuropoly"/>NeuroPoly</span></a> (Mila).</p>
        <p className="ink">I also co-founded <a href="https://www.pinatapitch.tech"><InlineIcon name="pinata"/>Piñata Pitch</a>, bringing people together to build things.</p>
        <p className="ink">Outside of that: a little German every day, the gym, and whatever my camera roll is turning into.</p>
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
          <li className="ink"><a href="https://isef.net/project/phys061t-sparse-gnn-decoders-for-quantum-error-correction"><InlineIcon name="quantum"/>GNN Quantum Error Decoder</a><span>Quantum error correction. ISEF Silver Award.</span></li>
          <li className="ink">Cortesol<span>Critical thinking over a knowledge graph. Hackthe6ix finalist.</span></li>
          <li className="ink">Multimodal Conversational Agent<span>A V-JEPA-inspired world model for conversation.</span></li>
        </ul>
      </div>
      <TransparentLoop className="helmet-art" name="helmet particles" src="/animation/helmet-wind.mp4" smallSrc="/animation/helmet-wind-small.mp4" poster="/animation/helmet-wind-poster.webp" width={720} height={720} monochrome/>
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
        <TransparentLoop className="globe-art" name="Morgan Stanley photo globe" src="/animation/morgan-orbit-alpha.mp4" smallSrc="/animation/morgan-orbit-alpha-small.mp4" poster="/animation/morgan-orbit-alpha-poster.webp" width={600} height={600} packedAlpha controls={false}/>
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
    <ColorBoundary/>
  </main>;
}
