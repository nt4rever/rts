import Image from "next/image";
import styles from "./statistical.module.scss";
import { useQuery } from "@tanstack/react-query";
import { ticketService } from "@/apis/ticket";
import { format } from "date-fns";

export default function RecentReport() {
  const params = { per_page: 4, order: "created_at|desc" };
  const { data } = useQuery({
    queryKey: ["tickets", params],
    queryFn: () => ticketService.all(params),
  });

  return (
    <div>
      <h2 className={styles.title}>Recently reported problems</h2>
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
        <p>{format(new Date(data.created_at), "hh:mm dd-MM-yyyy")}</p>
      </div>
      <div>
        <Image src={data.images[0]} width={90} height={60} alt="sample" />
      </div>
    </div>
  );
};
