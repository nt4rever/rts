import { commentService } from "@/apis/comment";
import Vote from "@/components/Chip/vote";
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
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { Send } from "react-feather";
import * as Yup from "yup";

export const ForumComment = (props) => {
  const { data } = props;
  const { t } = useTranslation();
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
        await mutation.mutateAsync({ id: data.id, content: values.content });
        resetForm();
        notifications.show({
          title: t("message.comment-success"),
          color: "green",
          autoClose: 2000,
        });
      } catch (error) {
        notifications.show({
          title: t("message.error"),
          color: "red",
        });
      }
    },
  });

  return (
    <Card>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 3, py: 4 }}
      >
        <Typography variant="h6">{capitalize(t("common.comment"))}</Typography>

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
          <Grid item xs={2} display="flex" ml={2}>
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
    </Card>
  );
};
