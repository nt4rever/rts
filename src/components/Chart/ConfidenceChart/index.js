import styles from "./index.module.scss";

const ConfidenceChart = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      {data.sort((a,b) => b.score - a.score).map((item) => (
        <ConfidenceChartRow key={item.label} {...item} />
      ))}
    </div>
  );
};

const ConfidenceChartRow = ({ label, score }) => {
  return (
    <div className={styles.row}>
      <div className={styles.illustration}>
        <div className={styles.bar} style={{ width: `${score * 100}%` }}></div>
        <span>{label}</span>
      </div>
      <span>{Number(score).toFixed(4)}</span>
    </div>
  );
};

export default ConfidenceChart;
