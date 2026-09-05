import Image from "next/image";
import { ColorBoundary } from "@/components/color-boundary";
import "./dither.css";

const moments = [
  { name: "off-the-clock", width: 1080, height: 810, alt: "Friends striking improbable poses together on a sunny beach", caption: "Off the clock. August 2026." },
  { name: "hills", width: 1080, height: 720, alt: "Two friends on a trail between green mountains beneath a cloudy sky", caption: "Somewhere in the hills. June 2023." },
  { name: "window", width: 1080, height: 1440, alt: "A window framing a turquoise waterfront and mountains between yellow walls", caption: "The better window. April 2024." },
  { name: "a-short-break", width: 1080, height: 1440, alt: "A person lying on bright green grass beside a pool with arms outstretched", caption: "A short break. July 2024." },
];

export default function Home() {
  const bookingUrl = process.env.NEXT_PUBLIC_CAL_COM_URL || "https://cal.com";
  return <main className="dither-page">
    <section className="dither-intro" aria-labelledby="name">
      <div className="dither-intro-copy">
        <h1 id="name">Kuan Yi Wang</h1>
        <p>I’m a computer science student at the <a href="https://uwaterloo.ca/">University of Waterloo</a>. I’ve worked on agentic systems at Morgan Stanley and medical imaging at <a href="https://neuro.polymtl.ca/">NeuroPoly</a> (Mila).</p>
        <p>I also co-founded <a href="https://www.pinatapitch.tech">Piñata Pitch</a>, bringing people together to build things.</p>
        <p>Outside of that: a little German every day, the gym, and whatever my camera roll is turning into.</p>
        <nav className="dither-links" aria-label="Find me">
          <a href="/resume/kuan-yi-wang-resume.pdf">résumé</a>
          <a href="https://www.linkedin.com/in/kuan-yi-wang-443871319/">linkedin</a>
          <a href="mailto:ky7wang@uwaterloo.ca">email</a>
        </nav>
      </div>
      <figure className="dither-hero">
        <picture><source media="(max-width: 48rem)" srcSet="/photos/after-rain-small.webp" /><Image src="/photos/after-rain.webp" alt="A rainy city street at dusk, with buildings catching the last pink and orange light" width={1080} height={1440} loading="eager" fetchPriority="high" unoptimized /></picture>
        <figcaption>After the rain. September 2026.</figcaption>
      </figure>
    </section>

    <section className="dither-work" aria-labelledby="work">
      <div>
        <h2 id="work">A few things I’ve built.</h2>
        <ul>
          <li><a href="https://isef.net/project/phys061t-sparse-gnn-decoders-for-quantum-error-correction">GNN Quantum Error Decoder</a><span>Quantum error correction. ISEF Silver Award.</span></li>
          <li>Cortesol<span>Critical thinking over a knowledge graph. Hackthe6ix finalist.</span></li>
          <li>Multimodal Conversational Agent<span>A V-JEPA-inspired world model for conversation.</span></li>
        </ul>
      </div>
      <figure><picture><source media="(max-width: 48rem)" srcSet="/photos/circa-2026-small.webp" /><Image src="/photos/circa-2026.webp" alt="Four LEGO figures lined up on a boardwalk at the beach" width={1080} height={1440} loading="lazy" unoptimized /></picture><figcaption>Circa 2026. Trolling with friends.</figcaption></figure>
    </section>

    <section className="dither-gallery" aria-labelledby="elsewhere">
      <div className="dither-gallery-header"><h2 id="elsewhere">Elsewhere.</h2></div>
      <div className="dither-gallery-grid">{moments.map((photo) => <figure key={photo.name}>
        <picture><source media="(max-width: 48rem)" srcSet={`/photos/${photo.name}-small.webp`} /><img src={`/photos/${photo.name}.webp`} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" /></picture>
        <figcaption>{photo.caption}</figcaption>
      </figure>)}</div>
    </section>
    <footer className="dither-footer"><p><a href={bookingUrl} target="_blank" rel="noreferrer">join me for a workout. or a coffee.</a></p><small>Photos, reduced to dots.</small></footer>
    <ColorBoundary />
  </main>;
}
