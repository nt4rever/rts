import ComponentLoading from "@/components/Loading/ComponentLoading";
import { TransitionPage } from "@/components/transition";
import MainLayout from "@/layouts/main/layout";
import { Box, Container } from "@mui/material";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import Head from "next/head";

const ReportMap = dynamic(() => import("@/sections/map"), {
  loading: () => <ComponentLoading />,
  ssr: false,
});

const Page = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Map | RTS</title>
      </Head>
      <TransitionPage>
        <Box
          sx={{
            height: "calc(100vh - 96px)",
          }}
        >
          <ReportMap />
        </Box>
      </TransitionPage>
    </>
  );
};

export const getStaticProps = async (ctx) => ({
  props: {
    ...(await serverSideTranslations(ctx.locale || "vi")),
  },
});

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
