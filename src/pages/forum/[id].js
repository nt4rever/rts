import { ticketService } from "@/apis/ticket";
import { TransitionPage } from "@/components/transition";
import { withCSR } from "@/hocs/with-csr";
import MainLayout from "@/layouts/main/layout";
import { ForumComment } from "@/sections/forum/forum-comment";
import { ForumSkeleton } from "@/sections/forum/forum-skeleton";
import ReportInformation from "@/sections/report/report-information";
import useAuthStore from "@/store/useAuthStore";
import { Box, ButtonBase, Container, Stack, Typography } from "@mui/material";
import {
  QueryClient,
  dehydrate,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ArrowLeft } from "react-feather";

const Page = (props) => {
  const { user } = useAuthStore();
  const {
    push,
    back,
    query: { id },
  } = useRouter();
  const { t } = useTranslation();

  const {
    data: reportData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tickets", { id, user: user?.id || undefined }],
    queryFn: () => ticketService.get(id, { user: user?.id || undefined }),
  });

  const viewMutation = useMutation({
    mutationKey: ["view", id],
    mutationFn: ticketService.view,
  });

  useEffect(() => {
    const timeId = setTimeout(() => {
      viewMutation.mutate(id);
    }, 30 * 1000);
    return () => {
      clearTimeout(timeId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isError) {
    push("/404");
  }

  return (
    <>
      <Head>
        <title>Report | RTS</title>
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
            <Stack spacing={3}>
              <Stack direction="row">
                <ButtonBase
                  onClick={() => back()}
                  sx={{
                    gap: 1,
                    ":hover": {
                      color: "rgb(99, 102, 241)",
                    },
                  }}
                >
                  <ArrowLeft />
                  <Typography variant="body1">{t("common.back")}</Typography>
                </ButtonBase>
              </Stack>
              {isLoading && <ForumSkeleton />}
              {reportData && (
                <>
                  <ReportInformation data={reportData} />
                  <ForumComment data={reportData} />
                </>
              )}
            </Stack>
          </Container>
        </Box>
      </TransitionPage>
    </>
  );
};

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export const getServerSideProps = withCSR(async (ctx) => {
  const id = ctx.params.id;
  const queryClient = new QueryClient();

  try {
    await queryClient.fetchQuery(["tickets", { id }], () =>
      ticketService.get(id)
    );
  } catch (error) {}

  return {
    props: {
      id,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale || "vi")),
    },
  };
});

export default Page;
