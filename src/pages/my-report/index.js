import { ticketService } from "@/apis/ticket";
import { ReportCard } from "@/sections/report/report-card";
import { ReportSearch } from "@/sections/report/report-search";
import useAuthStore from "@/store/useAuthStore";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Unstable_Grid2 as Grid,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMemo, useState } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { user } = useAuthStore();
  const { data } = useQuery({
    queryKey: ["my-report", { page, created_by: user?.id }],
    queryFn: () => ticketService.createByMe({ page, created_by: user?.id }),
    keepPreviousData: true,
  });

  useEffect(() => {
    setPage(+searchParams.get("page") || 1);
  }, [searchParams]);

  useEffect(() => {
    router.push(`?page=${page}`, undefined, {
      scroll: false,
      shallow: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const count = useMemo(() => data?.meta?.page_count || 0, [data]);

  return (
    <>
      <Head>
        <title>Reports | RTS</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography sx={{ typography: { sm: "h4", xs: "h5" } }}>
                  {t("dashboard.report.your-report")}
                </Typography>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  LinkComponent={NextLink}
                  href="/create-report"
                >
                  {t("dashboard.report.create")}
                </Button>
              </div>
            </Stack>
            <ReportSearch />
            <Grid container spacing={3}>
              {data?.items?.map((report) => (
                <Grid xs={12} md={6} lg={4} key={report.id}>
                  <ReportCard report={report} />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                count={count}
                page={page}
                onChange={(e, p) => {
                  setPage(p);
                }}
                size="small"
              />
            </Box>
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
