import { getPost } from "@/apis/post";
import { withCSR } from "@/hocs/with-csr";
import { usePost } from "@/hooks/queries/post";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { useRouter } from "next/router";

const PostPage = ({ isError }) => {
  const {
    query: { id },
  } = useRouter();

  const { data, isLoading } = usePost(id);

  if (isError) return <div>Error</div>;

  if (isLoading) return <div>Loading...</div>;

  return <div>{JSON.stringify(data)}</div>;
};

export const getServerSideProps = withCSR(async (ctx) => {
  const { id } = ctx.params;

  const queryClient = new QueryClient();

  let isError = false;

  try {
    await queryClient.fetchQuery(["post", id], () => getPost(id));
  } catch (error) {
    isError = true;
    ctx.res.statusCode = error.response.status;
  }

  return {
    props: {
      isError,
      dehydratedState: dehydrate(queryClient),
    },
  };
});

export default PostPage;
