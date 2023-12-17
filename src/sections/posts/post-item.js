import { Grid, NoSsr, Stack, Typography } from "@mui/material";
import Image from "next/image";
import styles from "./post.module.scss";
import { baseFormatDateTime } from "@/utils/time";
import Link from "next/link";

export const PostItem = ({ data }) => {
  return (
    <Grid xs={12} md={6} lg={4} item>
      <div className={styles.postItem}>
        <div className={styles.pictureWrapper}>
          <Link href={`/posts/${data.slug}`}>
            <Image
              src={
                data.picture ||
                "https://static.thiennguyen.app/public/donate-target/photo/2022/9/19/3f2f6e74-f958-41c1-a387-e7bd2e6ebc25.jpg"
              }
              width={400}
              height={225}
              alt={data.slug}
              className={styles.image}
            />
          </Link>
        </div>
        <div className={styles.body}>
          <Stack
            spacing={{
              xs: 1,
              md: 1.5,
            }}
            direction={{
              xs: "column-reverse",
              md: "column",
            }}
          >
            <NoSsr>
              <p className={styles.time}>
                {baseFormatDateTime(data.created_at)}
              </p>
            </NoSsr>
            <Link href={`/posts/${data.slug}`} className={styles.title}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: {
                    xs: 14,
                    md: 16,
                  },
                }}
              >
                {data.title}
              </Typography>
            </Link>
            <Typography variant="body2" className={styles.quote}>
              {data.brief_content}
            </Typography>
          </Stack>
        </div>
      </div>
    </Grid>
  );
};
