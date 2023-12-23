import { ticketService } from "@/apis/ticket";
import { NoSsr } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import styles from "./statistical.module.scss";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { formatDistanceToNow, isEqual } from "date-fns";
import { dateLocales } from "@/utils/date-locale";
import ComponentLoading from "@/components/Loading/ComponentLoading";

export default function RecentReport() {
  const params = { per_page: 4, order: "created_at|desc" };
  const { data, isLoading } = useQuery({
    queryKey: ["tickets", params],
    queryFn: () => ticketService.all(params),
  });
  const { t } = useTranslation();

  return (
    <div>
      <h2 className={styles.title}>{t("home.recent-report-problem")}</h2>
      <div className={styles.recent_report_wrapper}>
        {isLoading && <ComponentLoading />}
        {data?.items?.map((report) => (
          <ReportItem key={report.id} data={report} />
        ))}
      </div>
    </div>
  );
}

const timestampFormat = (createdAt, text = "ago", locale = "vi") => {
  const d1 = new Date(createdAt);
  return `${formatDistanceToNow(d1, {
    locale: dateLocales[locale],
  })} ${text}`;
};

export const ReportItem = ({ data }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleClick = () => {
    router.push(`/forum/${data.id}`);
  };

  return (
    <div className={styles.report_item_container} onClick={handleClick}>
      <div>
        <h4>{data.title}</h4>
        <NoSsr>
          <p>
            {timestampFormat(
              data.created_at,
              t("dashboard.report.ago"),
              router.locale
            )}
          </p>
        </NoSsr>
      </div>
      <div>
        <Image
          src={data.images[0]}
          width={90}
          height={60}
          style={{
            objectFit: "cover",
          }}
          alt="sample"
        />
      </div>
    </div>
  );
};
