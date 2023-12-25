import { useTranslation } from "next-i18next";
import styles from "./guide.module.scss";
import { capitalize } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { statsService } from "@/apis/stats";
import CountUp from "react-countup";

export const GuideItem = ({ index, content }) => {
  return (
    <div className={styles.item}>
      <div className={styles.index}>{index}</div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};

const formatter = (value) => <CountUp end={value} duration={3} separator="," />;

export default function Guide() {
  const { data } = useQuery({
    queryKey: ["report-stats"],
    queryFn: statsService.report,
    staleTime: Infinity,
  });
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
          <h1>{formatter(data?.in_past_week ?? 0)}</h1>
          <p>{capitalize(t("home.report-in-past-week"))}</p>
        </div>
        <div className={styles.itemStats}>
          <h1>{formatter(data?.fixed_in_past_month ?? 0)}</h1>
          <p>{capitalize(t("home.fixed-in-past-month"))}</p>
        </div>
        <div className={styles.itemStats}>
          <h1>{formatter(data?.has_been_verified ?? 0)}</h1>
          <p>{capitalize(t("home.updates-on-reports"))}</p>
        </div>
      </div>
    </div>
  );
}
