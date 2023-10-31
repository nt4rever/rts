import MainLayout from "@/layouts/main/layout";
import { CreateReportForm } from "@/sections/report/create-report";
import { Box, Container, Grid } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

const Page = () => {
  return (
    <>
      <Head>
        <title>Create a new report | RTS</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container justifyContent="center">
            <Grid xs={12} md={6} lg={8} item>
              <CreateReportForm />
            </Grid>
          </Grid>
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

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
