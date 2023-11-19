import { genders } from "@/constants/gender";
import { useProfileMutation } from "@/hooks/mutations/user";
import { notifications } from "@mantine/notifications";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Unstable_Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import * as Yup from "yup";
import { isValid } from "date-fns";

export const AccountProfileDetails = ({ user }) => {
  const profileMutation = useProfileMutation();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const genderItems = genders.map((gender, index) => (
    <MenuItem key={index} value={gender}>
      {t(`constraint.gender.${gender}`)}
    </MenuItem>
  ));

  const formik = useFormik({
    initialValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      date_of_birth: user.date_of_birth,
      gender: user.gender || "",
      address: user.address,
      submit: null,
    },
    validationSchema: new Yup.object({
      first_name: Yup.string()
        .optional()
        .max(50, t("validation.common.max-length", { max: 50 })),
      last_name: Yup.string()
        .required(t("validation.account.last-name-required"))
        .max(50, t("validation.common.max-length", { max: 50 })),
      phone_number: Yup.string()
        .optional()
        .max(15, t("validation.common.max-length", { max: 15 })),
      date_of_birth: Yup.date().optional().nullable(),
      gender: Yup.mixed().oneOf(["MALE", "FEMALE", "OTHER"]).optional(),
      address: Yup.string()
        .optional()
        .max(200, t("validation.common.max-length", { max: 200 })),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await profileMutation.mutateAsync(values);
        queryClient.invalidateQueries(["me"]);
        notifications.show({
          title: t("message.update-profile-success"),
          color: "green",
          autoClose: 2000,
        });
      } catch (err) {
        if (isAxiosError(err)) {
          helpers.setStatus({ success: false });
          helpers.setSubmitting(false);
        }
        notifications.show({
          title: t("message.update-profile-fail"),
          color: "red",
        });
      }
    },
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader
          subheader={t("common.can-edit")}
          title={t("common.profile")}
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  error={
                    !!(formik.touched.first_name && formik.errors.first_name)
                  }
                  helperText={
                    formik.touched.first_name && formik.errors.first_name
                  }
                  label={t("common.first-name")}
                  name="first_name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.first_name}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  error={
                    !!(formik.touched.last_name && formik.errors.last_name)
                  }
                  helperText={
                    formik.touched.last_name && formik.errors.last_name
                  }
                  label={t("common.last-name")}
                  name="last_name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.last_name}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  error={
                    !!(
                      formik.touched.phone_number && formik.errors.phone_number
                    )
                  }
                  helperText={
                    formik.touched.phone_number && formik.errors.phone_number
                  }
                  label={t("common.phone-number")}
                  name="phone_number"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone_number}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <DatePicker
                  componentsProps={{
                    actionBar: {
                      actions: ["clear"],
                    },
                  }}
                  label={t("common.date-of-birth")}
                  name="date_of_birth"
                  inputFormat="dd/MM/yyyy"
                  value={formik.values.date_of_birth}
                  onChange={(value) => {
                    if (isValid(value))
                      formik.setFieldValue(
                        "date_of_birth",
                        value.toISOString(),
                        true
                      );
                    else formik.setFieldValue("date_of_birth", null, true);
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  error={!!(formik.touched.address && formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                  label={t("common.address")}
                  name="address"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl fullWidth variant="filled">
                  <InputLabel id="gender">{t("common.gender")}</InputLabel>
                  <Select
                    label="Age"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    name="gender"
                  >
                    {genderItems}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {formik.errors.submit && (
            <Typography color="error" sx={{ mt: 3 }} variant="body2">
              {formik.errors.submit}
            </Typography>
          )}
          <Button variant="contained" type="submit">
            {t("common.submit")}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
