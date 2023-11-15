import MainLayout from "@/layouts/main/layout";
import ForumContainer from "@/sections/forum/forum-container";
import ForumHeader from "@/sections/forum/forum-header";
import { Box, Container, Stack } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

const Page = (props) => {
  return (
    <>
      <Head>
        <title>Forum | RTS</title>
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
            <ForumHeader />
            <ForumContainer />
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

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;
export default Page;
