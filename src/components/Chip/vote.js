import useAuthStore from "@/store/useAuthStore";
import { Tooltip, Typography } from "@mui/material";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import { ArrowDownCircle, ArrowUpCircle } from "react-feather";
import styles from "./vote.module.scss";
import { useRouter } from "next/router";
import { modals } from "@mantine/modals";

const Vote = (props) => {
  const { isUpVote, score, votedByMe } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const { isLoggedIn } = useAuthStore();

  const handleVote = (e, type) => {
    e.preventDefault();
    if (!isLoggedIn) {
      modals.openConfirmModal({
        centered: true,
        title: "Please login to vote this report",
        labels: { confirm: "Go to login page", cancel: "Cancel" },
        onCancel: () => {},
        onConfirm: () => {
          router.push(`/auth/login?continueUrl=${router.pathname}`);
        },
      });
      return;
    }
    if (votedByMe && isUpVote === type) {
      return;
    }
    console.log({vote: type});
  };

  return (
    <div className={styles.wrapper}>
      <Tooltip title={t("common.this-is-useful")}>
        <button
          className={classNames(styles.btn, styles.up, {
            [styles.active]: votedByMe ? isUpVote : undefined,
          })}
          vote-type="up"
          onClick={(e) => handleVote(e, true)}
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
          onClick={(e) => handleVote(e, false)}
        >
          <ArrowDownCircle size={24} />
        </button>
      </Tooltip>
    </div>
  );
};

export default Vote;
