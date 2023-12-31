import { dateLocales } from "@/utils/date-locale";
import EyeIcon from "@heroicons/react/24/solid/EyeIcon";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
  capitalize,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { SeverityPill } from "@/components/severity-pill";
import { reportStatusMap } from "@/constants/report-status";

export const ReportCard = (props) => {
  const { t } = useTranslation();
  const { locale, push } = useRouter();
  const { report } = props;

  const handleClick = () => {
    push(`/my-report/${report.id}`);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <CardContent>
        <Box
          sx={{
            pb: 1,
          }}
        >
          <SeverityPill color={reportStatusMap[report.status]}>
            {t(`dashboard.report.status.${report.status}`)}
          </SeverityPill>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Image
            src={report.images[0]}
            width={150}
            height={120}
            style={{
              objectFit: "cover",
            }}
            alt="img-report"
          />
        </Box>
        <Tooltip title={report.title}>
          <Typography
            align="center"
            gutterBottom
            variant="h5"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {report.title}
          </Typography>
        </Tooltip>
        <Typography
          align="center"
          variant="body1"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
          }}
        >
          {report.description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <ClockIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="caption">
            {capitalize(`${formatDistanceToNow(new Date(report.created_at), {
              locale: dateLocales[locale || "vi"],
            })}
            ${t("dashboard.report.ago")}`)}
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <EyeIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="caption">
            {report.view_count} {t("common.views")}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

ReportCard.propTypes = {
  report: PropTypes.object.isRequired,
};
