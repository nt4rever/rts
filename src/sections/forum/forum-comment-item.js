import VoteComment from "@/components/Chip/vote-comment";
import { dateLocales } from "@/utils/date-locale";
import { getFullName } from "@/utils/string";
import { baseFormatDateTime } from "@/utils/time";
import { Avatar, Card, NoSsr, Stack, Tooltip, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
export const ForumCommentItem = (props) => {
  const { data: comment } = props;
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <Card>
      <Stack p={2} spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar src={comment.created_by.avatar} />
            <Stack direction="row" flexWrap="wrap" columnGap={1}>
              <Typography variant="subtitle2" fontWeight={700}>
                {getFullName(
                  comment.created_by.first_name,
                  comment.created_by.last_name
                )}
              </Typography>
              <NoSsr>
                <Tooltip title={baseFormatDateTime(comment.created_at)}>
                  <Typography variant="body2" color="#6C737F">
                    {`${formatDistanceToNow(new Date(comment.created_at), {
                      locale: dateLocales[locale || "vi"],
                    })} ${t("dashboard.report.ago")}`}
                  </Typography>
                </Tooltip>
              </NoSsr>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          gap={1}
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Typography variant="subtitle2">{comment.content}</Typography>
          <VoteComment
            commentId={comment.id}
            score={comment.score}
            votedByMe={comment.voted_by_me}
            isUpVote={comment.voted_by_me?.is_up_vote}
          />
        </Stack>
      </Stack>
    </Card>
  );
};
