import { taskService } from "@/apis/task";
import { TASK_STATUS } from "@/constants/task-status";
import { withCSR } from "@/hocs/with-csr";
import TaskInformation from "@/sections/tasks/task-information";
import TaskVerify from "@/sections/tasks/task-verify";
import { Box, ButtonBase, Container, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { ArrowLeft } from "react-feather";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const notVerify = (status) => {
  return status !== TASK_STATUS[0]; //PENDING
};

const Page = () => {
  const router = useRouter();
  const id = router.query.id;
  const { data: taskData, isError } = useQuery({
    queryKey: ["tasks", id],
    queryFn: () => taskService.get(id),
  });
  const { t } = useTranslation();

  if (isError) {
    router.push("/404");
  }

  return (
    <>
      <Head>
        <title>Task Detail | RTS</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 3,
          pb: 5,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row">
              <ButtonBase onClick={() => router.back()} sx={{ gap: 1 }}>
                <ArrowLeft />
                <Typography variant="body1">
                  {t("dashboard.nav.tasks")}
                </Typography>
              </ButtonBase>
            </Stack>
            {taskData && (
              <>
                <TaskInformation data={taskData} />
                <TaskVerify
                  taskId={taskData.id}
                  reportLocation={{
                    lat: taskData.ticket.lat,
                    lng: taskData.ticket.lng,
                  }}
                  hide={notVerify(taskData.status)}
                />
              </>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps = withCSR(async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || "vi")),
    },
  };
});

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
