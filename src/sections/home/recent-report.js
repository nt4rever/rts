import Image from "next/image";
import styles from "./statistical.module.scss";

export default function RecentReport() {
  return (
    <div>
      <h2 className={styles.title}>Recently reported problems</h2>
      <div className={styles.recent_report_wrapper}>
        <ReportItem />
        <ReportItem />
        <ReportItem />
        <ReportItem />
      </div>
    </div>
  );
}

export const ReportItem = () => {
  return (
    <div className={styles.report_item_container}>
      <div>
        <h4>Three white bags and one black bag outside 83 duke st</h4>
        <p>01:29 today</p>
      </div>
      <div>
        <Image
          src="https://www.fixmystreet.com/photo/5155737.0.fp.jpeg?deb095c8"
          width={90}
          height={60}
          alt="sample"
        />
      </div>
    </div>
  );
};
