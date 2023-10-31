import MainLayout from "@/layouts/main/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Banner from "@/sections/home/banner";
import Statistical from "@/sections/home/statistical";

const Page = () => {
  return (
    <div>
      <Banner />
      <Statistical />
    </div>
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
