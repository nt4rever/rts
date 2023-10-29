import { useCallback, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "@/apis/auth";
import { isAxiosError } from "axios";
import { userService } from "@/apis/user";
import { setTokens } from "@/utils/storage";
import useAuthStore from "@/store/useAuthStore";

const Page = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [method, setMethod] = useState("email");

  const { login } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: authService.login,
  });
  const getMeQuery = useQuery({
    queryKey: ["me"],
    queryFn: userService.me,
    enabled: false,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
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
        const data = await loginMutation.mutateAsync(values);
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

  const handleMethodChange = useCallback((event, value) => {
    setMethod(value);
  }, []);

  return (
    <>
      <Head>
        <title>Login | RTS</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
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
              <Typography variant="h4">{t("common.login")}</Typography>
              <Typography color="text.secondary" variant="body2">
                {t("common.hint-register")} &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  {t("common.register-now")}
                </Link>
              </Typography>
            </Stack>
            <Tabs onChange={handleMethodChange} sx={{ mb: 3 }} value={method}>
              <Tab label="Email" value="email" />
              <Tab label={t("common.phone-number")} value="phoneNumber" />
            </Tabs>
            {method === "email" && (
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
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
                  {t("common.login")}
                </Button>
                <Button fullWidth size="large" sx={{ mt: 3 }}>
                  {t("common.forgot-password")}
                </Button>
                <Alert color="primary" severity="info" sx={{ mt: 3 }}>
                  <div>{t("common.legal-usage")}</div>
                </Alert>
              </form>
            )}
            {method === "phoneNumber" && (
              <div>
                <Typography sx={{ mb: 1 }} variant="h6">
                  {t("common.coming-soon")}
                </Typography>
              </div>
            )}
          </div>
        </Box>
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

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
