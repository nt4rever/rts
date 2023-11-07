import Head from "next/head";
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import {
  AccountProfile,
  AccountProfileSkeleton,
} from "src/sections/account/account-profile";
import { AccountProfileDetails } from "src/sections/account/account-profile-details";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useGetMe } from "@/hooks/queries/user";

const Page = () => {
  const { data } = useGetMe();
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Account | Admin RTS</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">{t("common.account")}</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  {data ? (
                    <AccountProfile user={data} />
                  ) : (
                    <AccountProfileSkeleton />
                  )}
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  {data ? (
                    <AccountProfileDetails user={data} />
                  ) : (
                    <AccountProfileSkeleton />
                  )}
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export const getStaticProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || "vi")),
    },
  };
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
