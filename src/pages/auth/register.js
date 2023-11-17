import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { osName } from "react-device-detect";
import { useTranslation } from "next-i18next";
import useAuthStore from "@/store/useAuthStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "@/apis/auth";
import { userService } from "@/apis/user";
import { isAxiosError } from "axios";
import { setTokens } from "@/utils/storage";
import { TransitionPage } from "@/components/transition";

const Page = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { login } = useAuthStore();

  const registerMutation = useMutation({
    mutationFn: authService.register,
  });
  const getMeQuery = useQuery({
    queryKey: ["me"],
    queryFn: userService.me,
    enabled: false,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      device_name: osName,
      submit: null,
    },
    validationSchema: Yup.object({
      first_name: Yup.string().optional().max(50),
      last_name: Yup.string()
        .required(t("validation.account.last-name-required"))
        .max(50),
      email: Yup.string()
        .email(t("validation.login.email-valid"))
        .max(255)
        .required(t("validation.login.email-required")),
      password: Yup.string()
        .min(6, t("validation.login.password-min-length"))
        .max(20, t("validation.login.password-max-length"))
        .required(t("validation.login.password-required")),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const data = await registerMutation.mutateAsync(values);
        setTokens(data);
        const { data: user } = await getMeQuery.refetch({ throwOnError: true });
        login(user);
        router.push("/");
      } catch (err) {
        if (isAxiosError(err)) {
          const data = err.response.data;
          const { message } = data;
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
        <title>Register | RTS</title>
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
                <Typography variant="h4">{t("common.register")}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {t("common.hint-login")} &nbsp;
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
                  <TextField
                    error={
                      !!(formik.touched.first_name && formik.errors.first_name)
                    }
                    fullWidth
                    helperText={
                      formik.touched.first_name && formik.errors.first_name
                    }
                    label={t("common.first-name")}
                    name="first_name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                  />
                  <TextField
                    error={
                      !!(formik.touched.last_name && formik.errors.last_name)
                    }
                    fullWidth
                    helperText={
                      formik.touched.last_name && formik.errors.last_name
                    }
                    label={t("common.last-name")}
                    name="last_name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.last_name}
                  />
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label={t("common.email")}
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
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
                  {t("common.register")}
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
