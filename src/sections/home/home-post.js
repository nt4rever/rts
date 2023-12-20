import { Box, Container, Grid, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { PostItem } from "../posts/post-item";
import { postService } from "@/apis/post";
import styles from "@/sections/posts/post.module.scss";
import { useTranslation } from "next-i18next";

export const HomePost = () => {
  const { t } = useTranslation();
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
        <Stack direction="row" justifyContent="center">
          <h2 className={styles.sectionTitle}>{t("common.news")}</h2>
        </Stack>
        <Grid container spacing={3}>
          {data?.items?.map((post) => (
            <PostItem key={post.id} data={post} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
