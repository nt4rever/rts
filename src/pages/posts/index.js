import { postService } from "@/apis/post";
import { TransitionPage } from "@/components/transition";
import { withCSR } from "@/hocs/with-csr";
import MainLayout from "@/layouts/main/layout";
import { ForumSkeleton } from "@/sections/forum/forum-skeleton";
import { PostItem } from "@/sections/posts/post-item";
import { Box, Button, Container, Grid, Stack } from "@mui/material";
import {
  QueryClient,
  dehydrate,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

const Page = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam = 1 }) =>
        postService.all({
          page: pageParam,
          per_page: 9,
          order: "created_at|desc",
        }),
      getNextPageParam: (lastPage) => {
        if (lastPage.meta?.has_next) return lastPage.meta?.page + 1;
        return undefined;
      },
    });

  if (isError) {
    router.push("/500");
  }

  return (
    <>
      <Head>
        <title>Posts | RTS</title>
      </Head>
      <>
        <TransitionPage>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 2,
            }}
          >
            <Container maxWidth="lg">
              <Stack direction="row" justifyContent="center">
                <h2 className="section-heading">{t("common.news")}</h2>
              </Stack>
              {isLoading && <ForumSkeleton />}
              <Grid container spacing={3}>
                {data?.pages?.map((group, i) => (
                  <Fragment key={i}>
                    {group.items?.map((post) => (
                      <PostItem key={post.id} data={post} />
                    ))}
                  </Fragment>
                ))}
              </Grid>
              {hasNextPage && (
                <Stack direction="row" justifyContent="center" pt={2}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={fetchNextPage}
                  >
                    {t("common.load-more")}
                  </Button>
                </Stack>
              )}
            </Container>
          </Box>
        </TransitionPage>
      </>
    </>
  );
};

export const getServerSideProps = withCSR(async (ctx) => {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["posts"],
      queryFn: () =>
        postService
          .all({
            page: 1,
            per_page: 9,
            order: "created_at|desc",
          })
          .then((data) => ({ pages: [data] })),
    });
  } catch (error) {
    ctx.res.statusCode = error.response.status;
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale || "vi")),
    },
  };
});

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
