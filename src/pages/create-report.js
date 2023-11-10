import MainLayout from "@/layouts/main/layout";
import { CreateReportForm } from "@/sections/report/create-report";
import useAuthStore from "@/store/useAuthStore";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Container,
  Grid,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import NextLink from "next/link";

const Page = () => {
  const { isLoggedIn } = useAuthStore();
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Create a new report | RTS</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="lg">
          <Grid container justifyContent="center">
            <Grid xs={12} md={6} lg={8} item>
              {isLoggedIn ? (
                <CreateReportForm />
              ) : (
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      mb: 3,
                      textAlign: "center",
                    }}
                  >
                    <img
                      alt="Under development"
                      src="/assets/errors/error-401.png"
                      style={{
                        display: "inline-block",
                        maxWidth: "100%",
                        width: 200,
                      }}
                    />
                  </Box>
                  <Typography align="center" sx={{ mb: 3 }} variant="h4">
                    {t("report.login-required")}
                  </Typography>
                  <Button
                    component={NextLink}
                    href="/auth/login?continueUrl=/create-report"
                    endIcon={
                      <SvgIcon fontSize="small">
                        <ArrowRightIcon />
                      </SvgIcon>
                    }
                    sx={{ mt: 3 }}
                    variant="contained"
                  >
                    {t("report.go-to-login-page")}
                  </Button>
                </Box>
              )}
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
