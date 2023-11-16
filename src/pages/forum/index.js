import { areaService } from "@/apis/area";
import { ticketService } from "@/apis/ticket";
import { ForumContext } from "@/contexts/forum-context";
import { withCSR } from "@/hocs/with-csr";
import MainLayout from "@/layouts/main/layout";
import ForumContainer from "@/sections/forum/forum-container";
import ForumHeader from "@/sections/forum/forum-header";
import useAuthStore from "@/store/useAuthStore";
import { Box, Container, Pagination, Stack } from "@mui/material";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const Page = (props) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [forumParams, setForumParams] = useState({
    page: props.page || 1,
    area: props.area || "ALL",
    order: props.order || "created_at|desc",
    status: props.status || "ALL",
  });

  const { data } = useQuery({
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
        page: forumParams.page,
        area: forumParams.area === "ALL" ? undefined : forumParams.area,
        status: forumParams.status === "ALL" ? undefined : forumParams.status,
        order: forumParams.order,
      }),
    keepPreviousData: true,
  });

  useEffect(() => {
    router.push(
      `?page=${forumParams.page}&area=${forumParams.area}&status=${forumParams.status}&order=${forumParams.order}`,
      null,
      {
        scroll: true,
        shallow: true,
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forumParams]);

  const count = useMemo(() => data?.meta?.page_count || 0, [data]);

  return (
    <>
      <Head>
        <title>Forum | RTS</title>
      </Head>
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
              <ForumContainer data={data} />
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
            </Stack>
          </Container>
        </Box>
      </ForumContext.Provider>
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
