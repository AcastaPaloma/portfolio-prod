import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../writings.module.css";

export const metadata: Metadata = {
  title: "Everything Everywhere all at Once — Kuan Yi Wang",
  description: "A short interpretation + some thoughts, one day after watching EEaaO.",
};

export default function FirstBlogPost() {
  return (
    <main className={styles.post}>
      <nav className={styles.nav} aria-label="Back to writings">
        <Link href="/writings">← Writings</Link>
        <Link href="/">Kuan Yi Wang</Link>
      </nav>
      <article>
        <header className={styles.postHeader}>
          <h1>Everything Everywhere all at Once</h1>
          <figure className={styles.filmBanner}>
            <picture>
              <source media="(prefers-reduced-motion: reduce)" srcSet="/writings/eeaao-still.webp" />
              {/* Preserve the supplied GIF's animation without image optimization. */}
              <img src="/writings/eeaao.gif" alt="A shifting close-up of Evelyn in Everything Everywhere all at Once" width={480} height={240} fetchPriority="high" />
            </picture>
          </figure>
        </header>

        <div className={styles.prose}>
          <p>First blog: I am no writer, nor am I good at English—just trying to project the latent of the movie in my head into word tokens.</p>
          <p>This will be a short interpretation + some thoughts, one day after watching EEaaO.</p>
          <p>These words will have much less meaning than the movie, so I suggest watching it, then coming back here, at the very least.</p>
          <p>I believe this movie is fundamental.</p>
          <p>A quick gemini search says Everything Everywhere all at Once won best picture, actress, supporting actor, supporting actress, original screenplay, film editing at the Academy Awards. So, no point in embellishing it with what actual reviewers have already said.</p>

          <hr />

          <p>I’ve known and understood that I am nothing in the universe. Therefore, my attitude to life has always more or less been careless, with little regard to first impressions upon others.</p>
          <p>My current life goal is as follows: learn as much as I can and attain a certain status to make my close ones proud (although I believe this second goal is merely a checkpoint to the first goal).</p>

          <hr />

          <p>The movie does a phenomenal job at capturing the width of the universe—a slice of infinity, of current possibilities.</p>
          <p>I appreciate how there is as much emphasis on Evelyn’s role as a mother, as well as an all-knower. It doesn’t focus at all on a fight against “an evil”, nor some internal turmoil bullshit Hollywood often projects.</p>
          <p>I’d argue it’s even fairly realistic. I’d say pissing yourself or swallowing toads to hop between multiverses is very well written—much more so than entering a 4D-tesseract to sneakily interact behind a bookshelf with your daughter in the past (plz get the ref).</p>
          <p>I’d even go so far as saying that, if I could fit into Evelyn’s shoes, I’d probably be stumped. I’d probably want the bagel (if it tastes better than Fairmount)—hopefully my current life goal justifies this.</p>
          <figure className={styles.articleDiagram}>
            <a href="/writings/joy-multiverse.png" target="_blank" rel="noreferrer" aria-label="Open the Joy multiverse diagram at full size">
              <Image
                src="/writings/joy-multiverse.png"
                alt="A multiverse diagram of Joy: normal Joy branches into versions ranging from normal to infected Joy, with a connection back only through memories."
                width={1967}
                height={1371}
                sizes="(max-width: 768px) calc(100vw - 3rem), 42rem"
              />
            </a>
          </figure>
          <p>I think her debate was whether everything mattered a lot, or everything didn&apos;t matter at all.</p>

          <hr />

          <div className={styles.translationPair}>
            <p lang="fr">En bref, je pense que ce film a raisonné avec moi parce que j’ai déjà eu des réflexions portant sur ma place dans le multivers.</p>
            <p className={styles.translation} lang="en"><em>In short, I think this film resonated with me because I’d already had thoughts about my place in the multiverse.</em></p>
          </div>
          <p>A bit like Atomic Habits lovers—but, really, it’s just people hyping themselves up when they already apply a suggested habit (“I brush my teeth before bed”).</p>
        </div>
      </article>
      <footer className={styles.postFooter}>
        <Link href="/writings">← All writings</Link>
        <a href="https://acastapaloma.github.io/genie/">Genie Doom World Model ↗</a>
      </footer>
    </main>
  );
}
