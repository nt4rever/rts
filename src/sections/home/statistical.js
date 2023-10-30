import { RightBanner } from "@/assets/blob/right-banner";
import Guide from "./guide";
import RecentReport from "./recent-report";
import styles from "./statistical.module.scss";

export default function Statistical() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.skeleton}>
        <div className={styles.container}>
          <Guide />
          <RecentReport />
        </div>
        <div className={styles.rightBanner}>
          <RightBanner />
        </div>
      </div>
    </div>
  );
}
