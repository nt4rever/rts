import { postService } from "@/apis/post";
import { TransitionPage } from "@/components/transition";
import { withCSR } from "@/hocs/with-csr";
import { usePost } from "@/hooks/queries/post";
import MainLayout from "@/layouts/main/layout";
import { ForumSkeleton } from "@/sections/forum/forum-skeleton";
import styles from "@/sections/posts/post.module.scss";
import { baseFormatDateTime } from "@/utils/time";
import { Box, Chip, Container, NoSsr, Stack, Typography } from "@mui/material";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { NotFoundComponent } from "../404";

const Page = ({ isError }) => {
  const router = useRouter();
  const slug = router.query?.slug;

  const { data, isLoading } = usePost(slug);

  if (isError) {
    return <NotFoundComponent />;
  }

  return (
    <>
      <Head>
        <title>{data?.title || "Posts | RTS"}</title>
        <meta name="description" content={data?.brief_content} />
        <meta property="og:title" content={data?.title} />
        <meta property="og:description" content={data?.description_SEO} />
        <meta property="og:image" content={data?.picture} />
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
            {isLoading && <ForumSkeleton />}
            {data && (
              <Stack spacing={2}>
                <NoSsr>
                  <Typography className={styles.time}>
                    {baseFormatDateTime(data.created_at)}
                  </Typography>
                </NoSsr>
                <Typography variant="h5">{data.title}</Typography>
                {data.category && (
                  <div>
                    <Chip label={data.category?.name} />
                  </div>
                )}
                <div
                  className={styles.postContent}
                  dangerouslySetInnerHTML={{
                    __html: data.content,
                  }}
                ></div>
              </Stack>
            )}
          </Container>
        </Box>
      </TransitionPage>
    </>
  );
};

export const getServerSideProps = withCSR(async (ctx) => {
  const { slug } = ctx.params;

  const queryClient = new QueryClient();

  let isError = false;

  try {
    await queryClient.fetchQuery(["post", slug], () => postService.get(slug));
  } catch (error) {
    isError = true;
    ctx.res.statusCode = error.response.status;
  }

  return {
    props: {
      isError,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale || "vi")),
    },
  };
});

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
