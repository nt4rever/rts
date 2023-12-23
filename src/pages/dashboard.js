import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useQuery } from "@tanstack/react-query";
import { statsService } from "@/apis/stats";
import ComponentLoading from "@/components/Loading/ComponentLoading";
import { ForumSkeleton } from "@/sections/forum/forum-skeleton";
import { OverviewReport } from "@/sections/overview/report/overview-report";
import { OverviewInteractive } from "@/sections/overview/report/overview-interactive";
import { OverviewTaskSuccess } from "@/sections/overview/task/overview-task-success";
import { TASK_STATUS } from "@/constants/task-status";
import { OverviewTotalTask } from "@/sections/overview/task/overview-total-task";
import { OverviewReportPie } from "@/sections/overview/report/overview-report-pie";
import { OverviewLatestReports } from "@/sections/overview/report/overview-latest-report";
import useAuthStore from "@/store/useAuthStore";
import { ticketService } from "@/apis/ticket";

const taskSuccess = (totalTask, summaryTask) => {
  if (!totalTask) return undefined;
  const totalSuccess = summaryTask.reduce(
    (acc, value) =>
      value._id.status === TASK_STATUS[2] ? acc + value.count : acc,
    0
  );
  return ((totalSuccess * 100) / totalTask).toFixed(0);
};

const reportChartData = (summaryReport) => {
  const label = [];
  const data = [];
  summaryReport.forEach((value) => {
    label.push(value._id.status);
    data.push(value.count);
  });
  return {
    label,
    data,
  };
};

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["personal-stats"],
    queryFn: statsService.personal,
  });

  const { user } = useAuthStore();
  const { data: reports } = useQuery({
    queryKey: ["my-report", { created_by: user?.id }],
    queryFn: () =>
      ticketService.createByMe({
        created_by: user?.id,
        order: "created_at|desc",
      }),
    enabled: !!user?.id,
  });

  return (
    <>
      <Head>
        <title>Dashboard | RTS</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          {isLoading && <ForumSkeleton />}
          {data && (
            <Grid container spacing={3}>
              <Grid xs={12} sm={6} lg={3}>
                <OverviewReport
                  difference={12}
                  positive
                  sx={{ height: "100%" }}
                  value={data?.total_report}
                />
              </Grid>
              <Grid xs={12} sm={6} lg={3}>
                <OverviewInteractive
                  difference={16}
                  positive={false}
                  sx={{ height: "100%" }}
                  value={data?.total_comment + data?.total_vote}
                />
              </Grid>

              <Grid xs={12} sm={6} lg={3}>
                <OverviewTaskSuccess
                  sx={{ height: "100%" }}
                  value={taskSuccess(data?.total_task, data?.summary_task)}
                />
              </Grid>
              <Grid xs={12} sm={6} lg={3}>
                <OverviewTotalTask
                  sx={{ height: "100%" }}
                  value={data?.total_task}
                />
              </Grid>

              {/* <Grid xs={12} lg={8}>
                <OverviewSales
                  chartSeries={[
                    {
                      name: "This year",
                      data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                    },
                    {
                      name: "Last year",
                      data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                    },
                  ]}
                  sx={{ height: "100%" }}
                />
              </Grid> */}
              {data?.total_report > 0 && (
                <Grid xs={12} md={6} lg={4}>
                  <OverviewReportPie
                    chartSeries={reportChartData(data?.summary_report).data}
                    labels={reportChartData(data?.summary_report).label}
                    sx={{ height: "100%" }}
                  />
                </Grid>
              )}

              {/* <Grid xs={12} md={6} lg={4}>
                <OverviewLatestProducts
                  products={[
                    {
                      id: "5ece2c077e39da27658aa8a9",
                      image: "/assets/products/product-1.png",
                      name: "Healthcare Erbology",
                      updatedAt: subHours(now, 6).getTime(),
                    },
                    {
                      id: "5ece2c0d16f70bff2cf86cd8",
                      image: "/assets/products/product-2.png",
                      name: "Makeup Lancome Rouge",
                      updatedAt: subDays(subHours(now, 8), 2).getTime(),
                    },
                    {
                      id: "b393ce1b09c1254c3a92c827",
                      image: "/assets/products/product-5.png",
                      name: "Skincare Soja CO",
                      updatedAt: subDays(subHours(now, 1), 1).getTime(),
                    },
                    {
                      id: "a6ede15670da63f49f752c89",
                      image: "/assets/products/product-6.png",
                      name: "Makeup Lipstick",
                      updatedAt: subDays(subHours(now, 3), 3).getTime(),
                    },
                    {
                      id: "bcad5524fe3a2f8f8620ceda",
                      image: "/assets/products/product-7.png",
                      name: "Healthcare Ritual",
                      updatedAt: subDays(subHours(now, 5), 6).getTime(),
                    },
                  ]}
                  sx={{ height: "100%" }}
                />
              </Grid> */}
              {reports && (
                <Grid xs={12} md={12} lg={8}>
                  <OverviewLatestReports
                    reports={reports.items}
                    sx={{ height: "100%" }}
                  />
                </Grid>
              )}
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
};

export const getStaticProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || "vi")),
    },
  };
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
