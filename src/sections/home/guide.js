import { useTranslation } from "next-i18next";
import styles from "./guide.module.scss";
import { capitalize } from "@mui/material";

export const GuideItem = ({ index, content }) => {
  return (
    <div className={styles.item}>
      <div className={styles.index}>{index}</div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};

export default function Guide() {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className={styles.title}>{t("home.how-to-report")}</h2>
      <div>
        <GuideItem index={1} content={t("home.step-1")} />
        <GuideItem index={2} content={t("home.step-2")} />
        <GuideItem index={3} content={t("home.step-3")} />
        <GuideItem index={4} content={t("home.step-4")} />
      </div>
      <div className={styles.divider}></div>
      <div className={styles.number}>
        <div className={styles.itemStats}>
          <h1>18,348</h1>
          <p>{capitalize(t("home.report-in-past-week"))}</p>
        </div>
        <div className={styles.itemStats}>
          <h1>29,540</h1>
          <p>{capitalize(t("home.fixed-in-past-month"))}</p>
        </div>
        <div className={styles.itemStats}>
          <h1>7,855,178</h1>
          <p>{capitalize(t("home.updates-on-reports"))}</p>
        </div>
      </div>
    </div>
  );
}
