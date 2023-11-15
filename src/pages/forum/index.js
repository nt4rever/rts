import { areaService } from "@/apis/area";
import { ticketService } from "@/apis/ticket";
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
  const [page, setPage] = useState(props.page || 1);
  const [area, setArea] = useState(props.area || "ALL");

  const { data } = useQuery({
    queryKey: [
      "tickets",
      {
        page,
        user: user?.id || undefined,
        area,
      },
    ],
    queryFn: () =>
      ticketService.all({
        user: user?.id || undefined,
        per_page: 10,
        page,
        area: area === "ALL" ? undefined : area,
      }),
    keepPreviousData: true,
  });

  useEffect(() => {
    router.push(`?page=${page}&area=${area}`, null, {
      scroll: true,
      shallow: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, area]);

  const count = useMemo(() => data?.meta?.page_count || 0, [data]);

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
            <ForumHeader area={area} setArea={setArea} />
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
                page={page}
                onChange={(e, p) => {
                  setPage(p);
                }}
                size="medium"
              />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps = withCSR(async (ctx) => {
  const page = +ctx.query?.page || 1;
  const area = ctx.query?.area || "ALL";
  const queryClient = new QueryClient();

  try {
    const params = { per_page: 10, page };
    await Promise.all([
      queryClient.fetchQuery(["tickets", { page, area }], () =>
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
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale || "vi")),
    },
  };
});

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
