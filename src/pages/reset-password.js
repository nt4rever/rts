import { authService } from "@/apis/auth";
import { TransitionPage } from "@/components/transition";
import { notifications } from "@mantine/notifications";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import * as Yup from "yup";

const Page = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: authService.resetPassword,
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, t("validation.login.password-min-length"))
        .max(20, t("validation.login.password-max-length"))
        .required(t("validation.login.password-required")),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const userId = router.query?.userId;
        const token = router.query?.token;
        if (!userId || !token) {
          router.push("/");
          return;
        }
        await mutation.mutateAsync({
          ...values,
          user_id: userId,
          token,
        });
        notifications.show({
          title: t("message.send-request-successfully"),
          color: "green",
          autoClose: 2000,
        });
        formik.resetForm();
        router.push("/auth/login");
      } catch (err) {
        if (isAxiosError(err)) {
          const data = err.response.data;
          const errCode = err.response.status;
          let { message } = data;
          if (errCode === 429) {
            message = "TM_429";
          }
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: t(message, { ns: "message" }) });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  return (
    <>
      <Head>
        <title>Reset password | RTS</title>
      </Head>
      <TransitionPage>
        <Box
          sx={{
            flex: "1 1 auto",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              maxWidth: 550,
              px: 3,
              py: "100px",
              width: "100%",
            }}
          >
            <div>
              <Stack spacing={1} sx={{ mb: 3 }}>
                <Typography variant="h4">
                  {t("common.forgot-password")}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {t("report.go-to-login-page")} &nbsp;
                  <Link
                    component={NextLink}
                    href="/auth/login"
                    underline="hover"
                    variant="subtitle2"
                  >
                    {t("common.login")}
                  </Link>
                </Typography>
              </Stack>
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <Typography>{t("common.reset-password-hint")}</Typography>
                  <TextField
                    error={
                      !!(formik.touched.password && formik.errors.password)
                    }
                    fullWidth
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    label={t("common.password")}
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                {formik.errors.submit && (
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  {t("common.submit")}
                </Button>
              </form>
            </div>
          </Box>
        </Box>
      </TransitionPage>
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

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
