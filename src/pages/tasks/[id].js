import { withCSR } from "@/hocs/with-csr";
import {
  Box,
  ButtonBase,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import NextLink from "next/link";
import { ArrowLeft, Calendar } from "react-feather";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const taskData = {
  ticket: {
    area: {
      name: "Khu đô thị FPT Đà Nẵng",
      address: "Hoà Hải, Ngũ Hành Sơn, Đà Nẵng 550000, Việt Nam",
      lat: 15.978698377041912,
      lng: 108.26223858870814,
      radius: 8000,
      is_active: true,
      created_at: "2023-11-06T13:20:58.683Z",
      updated_at: "2023-11-06T13:20:58.683Z",
      id: "6548e83a569141022a88bd91",
    },
    created_by: {
      first_name: "Lê Văn",
      last_name: "Tân",
    },
    title: "Mặt đường sỏi đá rất khó đi lại",
    description:
      "Tôi là cư dân ở khu vực này, gần đây tôi có đi qua địa điểm này, sỏi đá vương vãi nhiều trên đường gây khó khăn khi giao thông, mong hệ thống giải quyết.",
    images: [
      "https://minio.hmmmm.tech/hmmmm/tickets/6548eb65569141022a88bdd9/88bb1d9d-b53a-4c4a-9841-e684a5ad7a0e.jpg",
    ],
    status: "CONFIRMED",
    lat: 15.982740139715373,
    lng: 108.26090402637784,
    score: 0,
    view_count: 0,
    created_at: "2023-11-06T13:34:29.686Z",
    updated_at: "2023-11-05T13:41:24.392Z",
    id: "6548eb65569141022a88bdd9",
  },
  status: "DONE",
  expires_at: "2023-11-06T19:34:30.035Z",
  created_at: "2023-11-06T13:34:30.039Z",
  updated_at: "2023-11-06T13:41:24.389Z",
  id: "6548eb66569141022a88bde2",
};

const Page = () => {
  return (
    <>
      <Head>
        <title>Task Detail | RTS</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row">
              <ButtonBase href="/tasks" component={NextLink} sx={{ gap: 1 }}>
                <ArrowLeft />
                <Typography variant="body1">Tasks</Typography>
              </ButtonBase>
            </Stack>
            <Stack spacing={1}>
              <Typography variant="h4">{taskData.ticket.title}</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2">Created at</Typography>
                <Calendar size={20} color="rgb(108, 115, 127)" />
                <Typography variant="subtitle2">
                  {format(
                    new Date(taskData.ticket.created_at),
                    "dd/MM/yyyy HH:mm"
                  )}
                </Typography>
              </Stack>
            </Stack>
            <Box>
              <Card>
                <CardHeader title="Report information" />
                <Divider />
                <CardContent sx={{ pt: 1 }}>
                  <Box>
                    <Grid container spacing={3}>
                      <Grid xs={12} md={2} item>
                        <Typography variant="subtitle2">Description</Typography>
                      </Grid>
                      <Grid xs={12} md={10} item>
                        <Typography variant="body2">
                          {taskData.ticket.description}
                        </Typography>
                      </Grid>
                      <Grid xs={12} md={2} item>
                        <Typography variant="subtitle2">Description</Typography>
                      </Grid>
                      <Grid xs={12} md={10} item>
                        <Typography variant="body2">
                          {taskData.ticket.description}
                        </Typography>
                      </Grid>
                      <Grid xs={12} md={2} item>
                        <Typography variant="subtitle2">Description</Typography>
                      </Grid>
                      <Grid xs={12} md={10} item>
                        <Typography variant="body2">
                          {taskData.ticket.description}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider />
                </CardContent>
              </Card>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps = withCSR(async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || "vi")),
    },
  };
});

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
