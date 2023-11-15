import { ArrowDownCircle, ArrowUpCircle } from "react-feather";
import styles from "./index.module.scss";
import classNames from "classnames";

const Vote = (props) => {
  return (
    <div className={styles.wrapper}>
      <button className={classNames(styles.btn, styles.up)}>
        <ArrowUpCircle size={24} />
      </button>
      <button className={classNames(styles.btn, styles.down)}>
        <ArrowDownCircle size={24} />
      </button>
    </div>
  );
};

export default Vote;
