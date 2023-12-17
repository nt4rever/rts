import { commentService } from "@/apis/comment";
import Vote from "@/components/Chip/vote";
import useAuthStore from "@/store/useAuthStore";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  capitalize,
} from "@mui/material";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Send } from "react-feather";
import * as Yup from "yup";
import ForumCommentFilter from "./forum-comment-filter";
import { ForumCommentItem } from "./forum-comment-item";
import { Fragment } from "react";
import { useState } from "react";

export const ForumComment = (props) => {
  const { data } = props;
  const { isLoggedIn } = useAuthStore();
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuthStore();
  const [order, setOrder] = useState("created_at|desc");
  const queryClient = useQueryClient();

  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", { id: data.id, order, user: user?.id || undefined }],
    queryFn: ({ pageParam = 1 }) =>
      commentService.all({
        id: data.id,
        page: pageParam,
        per_page: 10,
        order,
        user: user?.id || undefined,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta?.has_next) return lastPage.meta?.page + 1;
      return undefined;
    },
  });

  const mutation = useMutation({
    mutationKey: ["create-comment", data.id],
    mutationFn: commentService.create,
  });

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: Yup.object({
      content: new Yup.string().required(t("validation.comment.required")).max(
        500,
        t("validation.common.max-length", {
          max: 500,
        })
      ),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (!isLoggedIn) {
          modals.openConfirmModal({
            centered: true,
            title: t("common.hint-login-to-comment"),
            labels: {
              confirm: t("report.go-to-login-page"),
              cancel: t("common.cancel"),
            },
            zIndex: 3000,
            onCancel: () => {},
            onConfirm: () => {
              router.push(
                `/auth/login?continueUrl=${encodeURIComponent(router.asPath)}`
              );
            },
          });
          return;
        }
        await mutation.mutateAsync({ id: data.id, content: values.content });
        resetForm();
        notifications.show({
          title: t("message.comment-success"),
          color: "green",
          autoClose: 2000,
        });
        queryClient.invalidateQueries(["comments"]);
      } catch (error) {
        notifications.show({
          title: t("message.error"),
          color: "red",
        });
      }
    },
  });

  return (
    <>
      <Card>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 3, py: 4 }}
        >
          <Typography variant="h6">
            {capitalize(t("common.comment"))}
          </Typography>

          <Vote
            reportId={data.id}
            score={data.score}
            votedByMe={data.voted_by_me}
            isUpVote={data.voted_by_me?.is_up_vote}
          />
        </Stack>
        <Divider />
        <form onSubmit={formik.handleSubmit}>
          <Grid container sx={{ px: 3, py: 2, gap: 1 }}>
            <Grid item xs={9}>
              <TextField
                fullWidth
                label={t("common.your-comment")}
                name="content"
                multiline
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.content}
                error={!!(formik.touched.content && formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
              />
            </Grid>
            <Grid item xs={2} display="flex">
              <Box>
                <Button
                  size="large"
                  sx={{
                    height: 58.455,
                  }}
                  variant="outlined"
                  title={t("common.submit")}
                  type="submit"
                >
                  <Send size={20} />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
        <Stack sx={{ px: 3, py: 2 }}>
          <ForumCommentFilter order={order} setOrder={setOrder} />
        </Stack>
      </Card>
      <Stack spacing={1.5}>
        {comments?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.items?.map((cm) => (
              <ForumCommentItem key={cm.id} data={cm} />
            ))}
          </Fragment>
        ))}
        {hasNextPage && (
          <Stack direction="row" justifyContent="center">
            <Button variant="contained" size="small" onClick={fetchNextPage}>
              {t("common.load-more")}
            </Button>
          </Stack>
        )}
      </Stack>
    </>
  );
};
