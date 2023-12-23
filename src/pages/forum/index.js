import { areaService } from "@/apis/area";
import { ticketService } from "@/apis/ticket";
import EmptyData from "@/components/emty-data";
import { TransitionPage } from "@/components/transition";
import { ForumContext } from "@/contexts/forum-context";
import { withCSR } from "@/hocs/with-csr";
import MainLayout from "@/layouts/main/layout";
import ForumContainer from "@/sections/forum/forum-container";
import ForumHeader from "@/sections/forum/forum-header";
import { ForumSkeleton } from "@/sections/forum/forum-skeleton";
import useAuthStore from "@/store/useAuthStore";
import { getQueryUrlParams } from "@/utils/url-query";
import { Box, Container, Pagination, Stack } from "@mui/material";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const Page = (props) => {
  const { query, beforePopState, push } = useRouter();
  const { user } = useAuthStore();
  const [forumParams, setForumParams] = useState({
    page: +props.page || +query.page || undefined,
    area: props.area || query.area || "ALL",
    order: props.order || query.order || "created_at|desc",
    status: props.status || query.status || "ALL",
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "tickets",
      {
        page: forumParams.page,
        user: user?.id || undefined,
        area: forumParams.area,
        status: forumParams.status,
        order: forumParams.order,
      },
    ],
    queryFn: () =>
      ticketService.all({
        user: user?.id || undefined,
        per_page: 10,
        page: forumParams.page || 1,
        area: forumParams.area === "ALL" ? undefined : forumParams.area,
        status: forumParams.status === "ALL" ? undefined : forumParams.status,
        order: forumParams.order,
      }),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (forumParams.page) {
      push(
        `?page=${forumParams.page}&area=${forumParams.area}&status=${forumParams.status}&order=${forumParams.order}`,
        null,
        {
          scroll: false,
          shallow: true,
        }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forumParams]);

  useEffect(() => {
    beforePopState(({ url }) => {
      const params = getQueryUrlParams(url);
      setForumParams((prev) => ({
        ...prev,
        page: +params.page || 1,
        area: params.area || "ALL",
        status: params.status || "created_at|desc",
        order: params.order || "ALL",
      }));
      return true;
    });
  }, [beforePopState]);

  const count = useMemo(() => data?.meta?.page_count || 0, [data]);

  if (isError) {
    push("/500");
  }

  return (
    <>
      <Head>
        <title>Forum | RTS</title>
      </Head>
      <TransitionPage>
        <ForumContext.Provider
          value={{
            forumParams,
            setForumParams,
          }}
        >
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
                {isLoading && <ForumSkeleton />}
                {data && (
                  <>
                    <ForumContainer data={data} />
                    {data.items.length > 0 ? (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          pb: 3,
                        }}
                      >
                        <Pagination
                          count={count}
                          page={forumParams.page}
                          onChange={(e, p) => {
                            setForumParams((prev) => ({
                              ...prev,
                              page: p,
                            }));
                          }}
                          size="medium"
                        />
                      </Box>
                    ) : (
                      <EmptyData />
                    )}
                  </>
                )}
              </Stack>
            </Container>
          </Box>
        </ForumContext.Provider>
      </TransitionPage>
    </>
  );
};

export const getServerSideProps = withCSR(async (ctx) => {
  const page = +ctx.query?.page || 1;
  const area = ctx.query?.area || "ALL";
  const status = ctx.query?.status || "ALL";
  const order = ctx.query?.order || "created_at|desc";
  const queryClient = new QueryClient();

  try {
    const objKey = { page, area, status, order };
    const params = {
      ...objKey,
      per_page: 10,
      area: area === "ALL" ? undefined : area,
      status: status === "ALL" ? undefined : status,
      order,
    };
    await Promise.all([
      queryClient.fetchQuery(["tickets", objKey], () =>
        ticketService.all(params)
      ),
      queryClient.fetchQuery({
        queryKey: ["area"],
        queryFn: () =>
          areaService.all({
            order: "name|asc",
          }),
      }),
    ]);
  } catch (error) {}

  return {
    props: {
      page,
      area,
      order,
      status,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale || "vi")),
    },
  };
});

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
