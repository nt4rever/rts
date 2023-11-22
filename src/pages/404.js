import Head from "next/head";
import NextLink from "next/link";
import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import { Box, Button, Container, SvgIcon, Typography } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Page = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>404 | RTS</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="md">
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
                src="/assets/errors/error-404.png"
                style={{
                  display: "inline-block",
                  maxWidth: "100%",
                  width: 400,
                }}
              />
            </Box>
            <Typography align="center" sx={{ mb: 3 }} variant="h3">
              {t("common.page_not_found")}
            </Typography>
            <Button
              component={NextLink}
              href="/"
              startIcon={
                <SvgIcon fontSize="small">
                  <ArrowLeftIcon />
                </SvgIcon>
              }
              sx={{ mt: 3 }}
              variant="contained"
            >
              {t("message.go-back-to-home-page")}
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export const getStaticProps = async (ctx) => ({
  props: {
    ...(await serverSideTranslations(ctx.locale || "vi")),
  },
});

export default Page;
