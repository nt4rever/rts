import Head from "next/head";
import NextLink from "next/link";
import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import { Box, Button, Container, SvgIcon, Typography } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Image from "next/image";

const Page = () => {
  return (
    <>
      <Head>
        <title>404 | RTS</title>
      </Head>
      <NotFoundComponent />
    </>
  );
};

export const NotFoundComponent = () => {
  const { t } = useTranslation();

  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
        pb: 4,
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
            <Image
              alt="Under development"
              src="/assets/errors/error-404.png"
              style={{
                display: "inline-block",
                maxWidth: "100%",
                width: 300,
              }}
              width={300}
              height={300}
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
  );
};

export const getStaticProps = async (ctx) => ({
  props: {
    ...(await serverSideTranslations(ctx.locale || "vi")),
  },
});

export default Page;
