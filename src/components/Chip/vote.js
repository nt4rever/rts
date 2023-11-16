import { commentService } from "@/apis/comment";
import useAuthStore from "@/store/useAuthStore";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { Tooltip, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ArrowDownCircle, ArrowUpCircle } from "react-feather";
import styles from "./vote.module.scss";

const Vote = (props) => {
  const { reportId, isUpVote, score, votedByMe } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const { isLoggedIn } = useAuthStore();
  const voteMutation = useMutation({
    mutationKey: ["vote-ticket", reportId],
    mutationFn: commentService.voteTicket,
  });
  const queryClient = useQueryClient();

  const handleVote = (e, type) => {
    e.preventDefault();
    if (!isLoggedIn) {
      modals.openConfirmModal({
        centered: true,
        title: t("common.hint-login-to-vote"),
        labels: {
          confirm: t("report.go-to-login-page"),
          cancel: t("common.cancel"),
        },
        onCancel: () => {},
        onConfirm: () => {
          router.push(
            `/auth/login?continueUrl=${encodeURIComponent(router.asPath)}`
          );
        },
      });
      return;
    }
    if (votedByMe && isUpVote === type) {
      return;
    }
    voteMutation.mutate(
      {
        id: reportId,
        upVote: type,
      },
      {
        onSuccess: () => {
          notifications.show({
            title: t("message.vote-successfully"),
            color: "green",
            autoClose: 2000,
          });
        },
        onError: (error) => {
          if (isAxiosError(error))
            notifications.show({
              title: t(`message.${error.response.data.message}`),
              color: "red",
            });
        },
        onSettled: () => {
          queryClient.invalidateQueries(["tickets"]);
        },
      }
    );
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
