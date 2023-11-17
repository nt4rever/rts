import CommentChip from "@/components/Chip/comment";
import ViewChip from "@/components/Chip/view";
import Vote from "@/components/Chip/vote";
import { SeverityPill } from "@/components/severity-pill";
import { reportStatusMap } from "@/constants/report-status";
import { dateLocales } from "@/utils/date-locale";
import { getFullName } from "@/utils/string";
import { baseFormatDateTime } from "@/utils/time";
import {
  Avatar,
  Box,
  Card,
  NoSsr,
  Stack,
  Tooltip,
  Typography,
  capitalize,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";

const ForumReportItem = (props) => {
  const { report } = props;
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <Card
      component={NextLink}
      href={`/forum/${report.id}`}
      style={{
        textDecoration: "none",
      }}
      sx={{
        border: "2px solid transparent",
        transition: "100ms",
        ":hover": {
          border: "2px solid rgb(99, 102, 241)", // theme.shadows[20]
        },
      }}
    >
      <Stack p={2} spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar src={report.created_by.avatar} />
            <Stack direction="row" flexWrap="wrap" columnGap={1}>
              <Typography variant="subtitle2" fontWeight={700}>
                {getFullName(
                  report.created_by.first_name,
                  report.created_by.last_name
                )}
              </Typography>
              <NoSsr>
                <Tooltip title={baseFormatDateTime(report.updated_at)}>
                  <Typography variant="body2" color="#6C737F">
                    {`${formatDistanceToNow(new Date(report.updated_at), {
                      locale: dateLocales[locale || "vi"],
                    })} ${t("dashboard.report.ago")}`}
                  </Typography>
                </Tooltip>
              </NoSsr>
            </Stack>
          </Stack>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <SeverityPill color={reportStatusMap[report.status]}>
              {t(`dashboard.report.status.${report.status}`)}
            </SeverityPill>
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="space-between" spacing={1}>
          <Stack spacing={2}>
            <Typography
              variant="body1"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
                fontWeight: 500,
                fontSize: {
                  xs: 16,
                  md: 18,
                },
              }}
            >
              {report.title}
            </Typography>
            <Stack direction="row" gap={1} flexWrap="wrap">
              <Vote
                reportId={report.id}
                score={report.score}
                votedByMe={report.voted_by_me}
                isUpVote={report.voted_by_me?.is_up_vote}
              />
              <CommentChip />
              <ViewChip viewCount={report.view_count || 1000} />
            </Stack>
          </Stack>
          <Box
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <Image src={report.images[0]} width={90} height={60} alt="sample" />
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ForumReportItem;
