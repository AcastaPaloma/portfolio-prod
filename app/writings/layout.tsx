import { GradientBackground } from "@/components/gradient-background";
import "../dither.css";
import styles from "./writings.module.css";

export default function WritingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`dither-page ${styles.page}`}>
      <GradientBackground />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
