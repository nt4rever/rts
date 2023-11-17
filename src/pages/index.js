import { ticketService } from "@/apis/ticket";
import { TransitionPage } from "@/components/transition";
import { withCSR } from "@/hocs/with-csr";
import MainLayout from "@/layouts/main/layout";
import Banner from "@/sections/home/banner";
import Statistical from "@/sections/home/statistical";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

const Page = () => {
  return (
    <>
      <Head>
        <title>Home | RTS</title>
      </Head>
      <TransitionPage>
        <Banner />
        <Statistical />
      </TransitionPage>
    </>
  );
};

export const getServerSideProps = withCSR(async (ctx) => {
  const queryClient = new QueryClient();

  try {
    const params = { per_page: 4, order: "created_at|desc" };
    await queryClient.fetchQuery(["tickets", params], () =>
      ticketService.all(params)
    );
  } catch (error) {}

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale || "vi")),
    },
  };
});

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
