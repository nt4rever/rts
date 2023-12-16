import { Box, Container, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { PostItem } from "../posts/post-item";

export const HomePost = () => {
  const { data } = useQuery({
    queryKey: ["home-post"],
    queryFn: () =>
      postService.all({
        page: 1,
        per_page: 3,
        order: "created_at|desc",
      }),
  });

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {data.items?.map((post) => (
            <PostItem key={post.id} data={post} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
