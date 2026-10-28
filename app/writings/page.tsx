import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./writings.module.css";

export const metadata: Metadata = {
  title: "Writings — Kuan Yi Wang",
  description: "A few thoughts on movies, world models, and whatever comes next.",
};

export default function WritingsPage() {
  return (
    <main className={styles.index}>
      <nav className={styles.nav} aria-label="Back to portfolio">
        <Link href="/">← Kuan Yi Wang</Link>
      </nav>
      <header className={styles.indexHeader}>
        <h1>Writings.</h1>
        <div className={styles.quoteBanner}>
          <Image
            className={styles.quoteImage}
            src="/writings/quoting-you.png"
            alt="once you start the blog posts people can start quoting you"
            width={750}
            height={64}
            priority
            unoptimized
          />
          <blockquote className={styles.mobileQuote}>
            once you start the blog posts people can start quoting you
          </blockquote>
        </div>
      </header>

      <ul className={styles.writingList} aria-label="Writings">
        <li>
          <a className={styles.writingLink} href="/kuangrad/">
            <div>
              <time className={styles.writingDate} dateTime="2026-10-28">Oct 28, 2026</time>
              <h2>kuangrad: an autograd engine</h2>
              <p>Backprop from scratch, one Python object per number, trained on 1,000 digits I drew by hand.</p>
            </div>
            <span className={styles.linkArrow} aria-hidden="true">↗</span>
          </a>
        </li>
        <li>
          <a className={styles.writingLink} href="/pi/">
            <div>
              <time className={styles.writingDate} dateTime="2026-10-18">Oct 18, 2026</time>
              <h2>Physical Intelligence’s π0.7</h2>
              <p>π0.7 at runtime: two SO-101 arms, three models, and one inference timeline, block by block.</p>
            </div>
            <span className={styles.linkArrow} aria-hidden="true">↗</span>
          </a>
        </li>
        <li>
          <Link className={styles.writingLink} href="/writings/everything-everywhere-all-at-once">
            <div>
              <time className={styles.writingDate} dateTime="2026-10-10">Oct 10, 2026</time>
              <h2>Everything Everywhere all at Once</h2>
              <p>A short interpretation + some thoughts, one day after watching.</p>
            </div>
            <span className={styles.linkArrow} aria-hidden="true">↗</span>
          </Link>
        </li>
        <li>
          <a className={styles.writingLink} href="/genie/">
            <div>
              <time className={styles.writingDate} dateTime="2026-09-24">Sep 24, 2026</time>
              <h2>Genie Doom World Model</h2>
              <p>Playable, action-conditioned Doom video from unlabeled footage.</p>
            </div>
            <span className={styles.linkArrow} aria-hidden="true">↗</span>
          </a>
        </li>
      </ul>
    </main>
  );
}
