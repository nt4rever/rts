import { getFullName } from "@/utils/string";
import { baseFormatDateTime } from "@/utils/time";
import { Divider } from "@mui/material";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import styles from "./ticket-popup.module.scss";

const TicketPopup = (props) => {
  const { data } = props;
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.text}>
          <span>{t("common.title")}:</span>&nbsp;
          <NextLink href={`/forum/${data.id}`} target="_blank">
            {data.title}
          </NextLink>
        </p>
      </div>
      <Divider />
      <div className={styles.content}>
        <p className={styles.text}>
          <span>{t("common.created_at")}:</span>&nbsp;
          {baseFormatDateTime(data.created_at)}
        </p>
        <p className={styles.text}>
          <span>{t("common.created_by")}:</span>&nbsp;
          {getFullName(data.created_by.first_name, data.created_by.last_name)}
        </p>
        <p className={styles.text}>
          <span>{t("common.status")}:</span>&nbsp;
          {t(`dashboard.report.status.${data.status}`).toUpperCase()}
        </p>
        <p className={styles.text}>{data.description}</p>
      </div>
    </div>
  );
};

export default TicketPopup;
