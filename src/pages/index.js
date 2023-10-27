const { MainLayout } = require("@/layouts/main/layout");

const Page = () => {
  return <div>hello</div>;
};

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
