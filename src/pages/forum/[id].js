import { ticketService } from "@/apis/ticket";
import { withCSR } from "@/hocs/with-csr";
import MainLayout from "@/layouts/main/layout";
import ReportInformation from "@/sections/report/report-information";
import { Box, ButtonBase, Container, Stack, Typography } from "@mui/material";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { ArrowLeft } from "react-feather";

const Page = (props) => {
  const {
    back,
    query: { id },
  } = useRouter();
  const { t } = useTranslation();
  const { data: reportData } = useQuery({
    queryKey: ["tickets", id],
    queryFn: () => ticketService.get(id),
  });

  return (
    <>
      <Head>
        <title>Report | RTS</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Stack direction="row">
              <ButtonBase onClick={() => back()} sx={{ gap: 1 }}>
                <ArrowLeft />
                <Typography variant="body1">
                  {t("common.forum")}
                </Typography>
              </ButtonBase>
            </Stack>
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

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export const getServerSideProps = withCSR(async (ctx) => {
  const id = ctx.params.id;
  const queryClient = new QueryClient();

  try {
    await queryClient.fetchQuery(["tickets", id], () => ticketService.get(id));
  } catch (error) {}

  return {
    props: {
      id,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale || "vi")),
    },
  };
});

export default Page;
