import { ticketService } from "@/apis/ticket";
import { Layout as DashboardLayout } from "@/layouts/dashboard/layout";
import { ForumSkeleton } from "@/sections/forum/forum-skeleton";
import ReportInformation from "@/sections/report/report-information";
import { Box, ButtonBase, Container, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { ArrowLeft } from "react-feather";

const Page = () => {
  const {
    query: { id },
    back,
    push,
  } = useRouter();
  const { t } = useTranslation();
  const {
    data: reportData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["report", id],
    queryFn: () => ticketService.get(id),
  });

  if (isError) {
    push("/404");
  }

  return (
    <>
      <Head>Report Detail | RTS</Head>
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
              <ButtonBase onClick={() => back()} sx={{ gap: 1 }}>
                <ArrowLeft />
                <Typography variant="body1">
                  {t("dashboard.nav.reports")}
                </Typography>
              </ButtonBase>
            </Stack>
            {isLoading && <ForumSkeleton />}
            {reportData && (
              <>
                <ReportInformation data={reportData} />
              </>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || "vi")),
    },
  };
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
