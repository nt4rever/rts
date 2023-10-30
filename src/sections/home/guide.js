import styles from "./guide.module.scss";

export const GuideItem = ({ index, content }) => {
  return (
    <div className={styles.item}>
      <div className={styles.index}>{index}</div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};

export default function Guide() {
  return (
    <div>
      <h2 className={styles.title}>How to report a problem</h2>
      <GuideItem
        index={1}
        content={"Enter a nearby UK postcode, or street name and area"}
      />
      <GuideItem
        index={2}
        content={"Locate the problem on a map of the area"}
      />
      <GuideItem index={3} content={"Enter details of the problem"} />
      <GuideItem
        index={4}
        content={"We send it to the council on your behalf"}
      />
      <div className={styles.divider}></div>
      <div className={styles.number}>
        <div className={styles.itemStats}>
          <h1>18,348</h1>
          <p>reports in past week</p>
        </div>
        <div className={styles.itemStats}>
          <h1>29,540</h1>
          <p>fixed in past month</p>
        </div>
        <div className={styles.itemStats}>
          <h1>7,855,178</h1>
          <p>updates on reports</p>
        </div>
      </div>
    </div>
  );
}
