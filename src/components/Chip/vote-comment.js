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
import { useState } from "react";
import { useEffect } from "react";

const VoteComment = (props) => {
  const { commentId } = props;
  const [data, setData] = useState({
    isUpVote: props.isUpVote,
    score: props.score,
    votedByMe: props.votedByMe,
  });
  const router = useRouter();
  const { t } = useTranslation();
  const { isLoggedIn } = useAuthStore();
  const voteMutation = useMutation({
    mutationKey: ["vote-comment", commentId],
    mutationFn: commentService.voteComment,
  });
  const unVoteMutation = useMutation({
    mutationFn: commentService.unVote,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    setData({
      isUpVote: props.isUpVote,
      score: props.score,
      votedByMe: props.votedByMe,
    });
  }, [props]);

  const handleVote = (e, type) => {
    let ins = 0;
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
    if (data.votedByMe && data.isUpVote === type) {
      unVoteMutation.mutate(
        {
          id: commentId,
          type: "COMMENT",
        },
        {
          onSuccess: () => {
            setData((prev) => ({
              ...prev,
              score: prev.score + (prev.isUpVote ? -1 : 1),
              votedByMe: false,
              isUpVote: type,
            }));
          },
          onError: (error) => {
            if (isAxiosError(error))
              notifications.show({
                title: t(`message.${error.response.data.message}`),
                color: "red",
              });
            queryClient.invalidateQueries(["comments"]);
          },
        }
      );
      return;
    }

    if (!data.votedByMe) {
      ins = type ? 1 : -1;
    } else {
      ins = type ? 2 : -2;
    }

    voteMutation.mutate(
      {
        id: commentId,
        upVote: type,
      },
      {
        onSuccess: () => {
          notifications.show({
            title: t("message.vote-successfully"),
            color: "green",
            autoClose: 2000,
          });
          setData((prev) => ({
            ...prev,
            score: prev.score + ins,
            votedByMe: true,
            isUpVote: type,
          }));
        },
        onError: (error) => {
          if (isAxiosError(error))
            notifications.show({
              title: t(`message.${error.response.data.message}`),
              color: "red",
            });
          queryClient.invalidateQueries(["comments"]);
        },
      }
    );
  };

  return (
    <div className={styles.wrapper}>
      <Tooltip title={t("common.this-is-useful")}>
        <button
          className={classNames(styles.btn, styles.up, {
            [styles.active]: data.votedByMe ? data.isUpVote : undefined,
          })}
          vote-type="up"
          onClick={(e) => handleVote(e, true)}
        >
          <ArrowUpCircle size={24} />
        </button>
      </Tooltip>
      <Typography variant="subtitle1">{data.score}</Typography>
      <Tooltip title={t("common.this-is-not-useful")}>
        <button
          className={classNames(styles.btn, styles.down, {
            [styles.active]: data.votedByMe ? !data.isUpVote : undefined,
          })}
          onClick={(e) => handleVote(e, false)}
        >
          <ArrowDownCircle size={24} />
        </button>
      </Tooltip>
    </div>
  );
};

export default VoteComment;
