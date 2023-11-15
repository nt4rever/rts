import CommentChip from "@/components/Chip/comment";
import Vote from "@/components/Chip/vote";
import { getFullName } from "@/utils/string";
import { baseFormatDateTime } from "@/utils/time";
import { Avatar, Box, Button, Card, Stack, Typography } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { MoreHorizontal } from "react-feather";

const ForumReportItem = (props) => {
  const { report } = props;

  return (
    <Card
      component={NextLink}
      href={`/forum/${report.id}`}
      style={{
        textDecoration: "none",
      }}
      sx={{
        border: "2px solid transparent",
        ":hover": {
          border: "2px solid rgb(99, 102, 241)", // theme.shadows[20]
        },
      }}
    >
      <Stack p={2} spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar />
            <Typography variant="subtitle2">
              {getFullName(
                report.created_by.first_name,
                report.created_by.last_name
              )}
            </Typography>
            <Typography variant="subtitle2">
              {baseFormatDateTime(report.updated_at)}
            </Typography>
          </Stack>
          <Button size="small">
            <MoreHorizontal size={14} />
          </Button>
        </Stack>
        <Stack direction="row" justifyContent="space-between" spacing={1}>
          <Stack spacing={1}>
            <Typography
              variant="h6"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
              }}
            >
              {report.title}
            </Typography>
            <Stack direction="row" gap={1}>
              <Vote
                score={report.score}
                votedByMe={report.voted_by_me}
                isUpVote={report.voted_by_me?.is_up_vote}
              />
              <CommentChip />
            </Stack>
          </Stack>
          <Box>
            <Image src={report.images[0]} width={90} height={60} alt="sample" />
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ForumReportItem;
