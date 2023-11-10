import { ticketService } from "@/apis/ticket";
import { baseFormatDateTime } from "@/utils/time";
import { NoSsr } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import styles from "./statistical.module.scss";
import { useTranslation } from "next-i18next";

export default function RecentReport() {
  const params = { per_page: 4, order: "created_at|desc" };
  const { data } = useQuery({
    queryKey: ["tickets", params],
    queryFn: () => ticketService.all(params),
  });
  const { t } = useTranslation();

  return (
    <div>
      <h2 className={styles.title}>{t("home.recent-report-problem")}</h2>
      <div className={styles.recent_report_wrapper}>
        {data?.items?.map((report) => (
          <ReportItem key={report.id} data={report} />
        ))}
      </div>
    </div>
  );
}

export const ReportItem = ({ data }) => {
  return (
    <div className={styles.report_item_container}>
      <div>
        <h4>{data.title}</h4>
        <NoSsr>
          <p>{baseFormatDateTime(data.created_at)}</p>
        </NoSsr>
      </div>
      <div>
        <Image src={data.images[0]} width={90} height={60} alt="sample" />
      </div>
    </div>
  );
};
