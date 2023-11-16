import { ArrowDownCircle, ArrowUpCircle } from "react-feather";
import styles from "./vote.module.scss";
import classNames from "classnames";
import { Tooltip, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";

const Vote = (props) => {
  const { isUpVote, score, votedByMe } = props;
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <Tooltip title={t("common.this-is-useful")}>
        <button
          className={classNames(styles.btn, styles.up, {
            [styles.active]: votedByMe ? isUpVote : undefined,
          })}
        >
          <ArrowUpCircle size={24} />
        </button>
      </Tooltip>
      <Typography variant="subtitle1">{score}</Typography>
      <Tooltip title={t("common.this-is-not-useful")}>
        <button
          className={classNames(styles.btn, styles.down, {
            [styles.active]: votedByMe ? !isUpVote : undefined,
          })}
        >
          <ArrowDownCircle size={24} />
        </button>
      </Tooltip>
    </div>
  );
};

export default Vote;
