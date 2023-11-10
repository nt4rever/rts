import { Button } from "@mui/material";
import styles from "./banner.module.scss";
import { ArrowIcon } from "@/assets/icon/arrow";
import NextLink from "next/link";
import { useTranslation } from "next-i18next";

export default function Banner() {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{t("home.report-a-problem")}</h1>
      <h4 className={styles.subTitle}>({t("home.problem-example")})</h4>
      <Button
        variant="contained"
        size="large"
        component={NextLink}
        href="/create-report"
      >
        &nbsp;{t("home.report-your-problem")}&nbsp;
        <ArrowIcon />
      </Button>
    </div>
  );
}
