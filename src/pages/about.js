import { pageService } from "@/apis/page";
import { TransitionPage } from "@/components/transition";
import MainLayout from "@/layouts/main/layout";
import HomeSponsor from "@/sections/home/sponsor";
import { Box, Container, Stack } from "@mui/material";
import { QueryClient } from "@tanstack/react-query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { NotFoundComponent } from "./404";

const params = {
  type: "ABOUT",
  slug: undefined,
};

const Page = ({ isError, data }) => {
  if (isError) {
    return <NotFoundComponent />;
  }

  return (
    <>
      <Head>
        <title>About | RTS</title>
        <meta name="description" content={data?.brief_content} />
        <meta property="og:title" content={data?.title} />
        <meta property="og:description" content={data?.description_SEO} />
      </Head>
      <TransitionPage>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 2,
          }}
        >
          <Container maxWidth="lg">
            <div
              className="static-page-content"
              dangerouslySetInnerHTML={{
                __html: data?.content,
              }}
            ></div>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <HomeSponsor />
            </Stack>
          </Container>
        </Box>
      </TransitionPage>
    </>
  );
};

export const getStaticProps = async (ctx) => {
  const queryClient = new QueryClient();

  let isError = false;
  let data = null;
  const locale = ctx.locale || "vi";

  try {
    data = await queryClient.fetchQuery(["static-pages", params], () =>
      pageService.get(params)
    );
    const content = data?.content?.find((ele) => ele?.lang === locale)?.value;
    data.content = content;
  } catch (error) {
    isError = true;
  }

  return {
    props: {
      isError,
      data,
      ...(await serverSideTranslations(locale)),
    },
    revalidate: 3600 * 24,
  };
};

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
