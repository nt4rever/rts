import EmptyData from "@/components/emty-data";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  capitalize,
  useTheme,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import { Chart } from "src/components/chart";

const useChartOptions = (labels) => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
    ],
    dataLabels: {
      enabled: false,
    },
    labels,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
};

export const OverviewReportPie = (props) => {
  const { chartSeries, labels, sx } = props;
  const { t } = useTranslation();
  const labelTrans = labels.map((l) =>
    capitalize(t(`dashboard.report.status.${l}`))
  );
  const chartOptions = useChartOptions(labelTrans);

  return (
    <Card sx={sx}>
      <CardHeader title={t("dashboard.chart-report")} />
      <CardContent>
        {labels?.length ? (
          <>
            <Chart
              height={300}
              options={chartOptions}
              series={chartSeries}
              type="donut"
              width="100%"
            />
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="center"
              spacing={2}
              sx={{ mt: 2 }}
            >
              {chartSeries.map((item, index) => {
                const label = labelTrans[index];

                return (
                  <Box
                    key={label}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ my: 1 }} variant="h6">
                      {label}
                    </Typography>
                    <Typography color="text.secondary" variant="subtitle2">
                      {item}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          </>
        ) : (
          <EmptyData />
        )}
      </CardContent>
    </Card>
  );
};

OverviewReportPie.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  sx: PropTypes.object,
};
