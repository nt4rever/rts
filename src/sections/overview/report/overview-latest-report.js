import { format } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import { reportStatusMap } from "@/constants/report-status";
import { truncateText } from "@/utils/string";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import EmptyData from "@/components/emty-data";

export const OverviewLatestReports = (props) => {
  const { push } = useRouter();
  const { reports = [], sx } = props;
  const { t } = useTranslation();

  return (
    <Card sx={sx}>
      <CardHeader title={t("dashboard.latest-report")} />
      {reports?.length ? (
        <>
          <Scrollbar sx={{ flexGrow: 1 }}>
            <Box sx={{ minWidth: 500 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t("common.title")}</TableCell>
                    <TableCell sortDirection="desc">
                      {t("common.created_at")}
                    </TableCell>
                    <TableCell>{t("common.status")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reports.map((report) => {
                    const createdAt = format(
                      new Date(report.created_at),
                      "dd/MM/yyyy"
                    );

                    return (
                      <TableRow hover key={report.id}>
                        <TableCell>{truncateText(report.title, 70)}</TableCell>
                        <TableCell>{createdAt}</TableCell>
                        <TableCell>
                          <SeverityPill color={reportStatusMap[report.status]}>
                            {t(`dashboard.report.status.${report.status}`)}
                          </SeverityPill>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Scrollbar>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button
              color="inherit"
              endIcon={
                <SvgIcon fontSize="small">
                  <ArrowRightIcon />
                </SvgIcon>
              }
              size="small"
              variant="text"
              onClick={() => push("/my-report")}
            >
              {t("dashboard.view-all")}
            </Button>
          </CardActions>
        </>
      ) : (
        <CardContent>
          <EmptyData />
        </CardContent>
      )}
    </Card>
  );
};

OverviewLatestReports.prototype = {
  reports: PropTypes.array,
  sx: PropTypes.object,
};
