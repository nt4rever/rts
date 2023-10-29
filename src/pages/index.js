import MainLayout from "@/layouts/main/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Page = () => {
  return <div></div>;
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
