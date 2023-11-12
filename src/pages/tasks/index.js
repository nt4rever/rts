import { taskService } from "@/apis/task";
import { TasksTable } from "@/sections/tasks/tasks-table";
import { Box, Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParam = useSearchParams();
  const [page, setPage] = useState(1);
  const [value, setValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data } = useQuery({
    queryKey: ["tasks", { page, rowsPerPage, status: value }],
    queryFn: () =>
      taskService.all({
        page,
        per_page: rowsPerPage,
        status: value || undefined,
        order: "expires_at|desc",
      }),
    keepPreviousData: true,
  });

  useEffect(() => {
    router.push(`?page=${page}&per_page=${rowsPerPage}&status=${value}`, null, {
      scroll: false,
      shallow: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, value]);

  useEffect(() => {
    setPage(+searchParam.get("page") || 1);
    setRowsPerPage(+searchParam.get("per_page") || 5);
    setValue(searchParam.get("status") || "");
  }, [searchParam]);

  const handlePageChange = useCallback((event, value) => {
    setPage(value + 1);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Head>
        <title>Tasks | RTS</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">{t("dashboard.nav.tasks")}</Typography>
              </Stack>
            </Stack>
            <Box>
              <Tabs value={value} onChange={handleChange}>
                <Tab value={""} label={t("dashboard.task.status.ALL")} />
                <Tab
                  value={"PENDING"}
                  label={t("dashboard.task.status.PENDING")}
                />
                <Tab value={"DONE"} label={t("dashboard.task.status.DONE")} />
                <Tab
                  value={"CANCELED"}
                  label={t("dashboard.task.status.CANCELED")}
                />
              </Tabs>
            </Box>
            {data && (
              <TasksTable
                count={data.meta.item_count}
                items={data.items}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={page - 1}
                rowsPerPage={rowsPerPage}
              />
            )}
          </Stack>
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
