/* eslint-disable react-hooks/exhaustive-deps */
import { EVIDENCE_TYPE } from "@/constants/task-status";
import useGeoLocation from "@/hooks/use-geo-location";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  capitalize,
} from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Image, X as XIcon } from "react-feather";
import * as Yup from "yup";
import styles from "../report/create-report.module.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/apis/task";
import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { isAxiosError } from "axios";
import { getDistance } from "geolib";
import { VOLUNTEER_VERIFY_MAX_DISTANCE } from "@/constants/shared";

const checkLocation = (reportLocation, location) => {
  const distance = getDistance(
    {
      latitude: reportLocation.lat,
      longitude: reportLocation.lng,
    },
    {
      latitude: location.lat,
      longitude: location.lng,
    }
  );
  console.log(distance);
  return distance <= VOLUNTEER_VERIFY_MAX_DISTANCE;
};

const TaskVerify = (props) => {
  const { taskId, reportLocation, hide } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const taskMutation = useMutation({
    mutationKey: ["task-update", taskId],
    mutationFn: taskService.update,
  });

  const cancelMutate = useMutation({
    mutationKey: ["task-cancel", taskId],
    mutationFn: () => taskService.cancel(taskId),
  });

  const mutationSuccess = () => {
    queryClient.invalidateQueries(["tasks", taskId]);
    queryClient.invalidateQueries(["tasks"]);
    notifications.show({
      title: t("message.update-task-success"),
      color: "green",
      autoClose: 2000,
    });
  };

  const mutationFail = () => {
    notifications.show({
      title: t("message.update-task-fail"),
      color: "red",
    });
    queryClient.invalidateQueries(["tasks", taskId]);
    queryClient.invalidateQueries(["tasks"]);
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      lat: "",
      lng: "",
      images: [],
      type: EVIDENCE_TYPE[0],
    },
    validationSchema: Yup.object({
      content: Yup.string()
        .max(500, t("validation.common.max-length", { max: 500 }))
        .required(t("validation.common.content-required")),
      lat: Yup.number()
        .min(-90, t("validation.common.latitude-invalid"))
        .max(90, t("validation.common.latitude-invalid"))
        .required(t("validation.common.latitude-required")),
      lng: Yup.number()
        .min(-180, t("validation.common.longitude-invalid"))
        .max(180, t("validation.common.longitude-invalid"))
        .required(t("validation.common.longitude-required")),
      images: Yup.array()
        .required(t("validation.common.image-required"))
        .max(
          5,
          t("validation.common.max-length-image", {
            max: 5,
          })
        )
        .min(
          1,
          t("validation.common.min-length-image", {
            min: 1,
          })
        ),
      type: Yup.mixed()
        .oneOf(EVIDENCE_TYPE)
        .required(t("validation.common.evidence-type-required")),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (!checkLocation(reportLocation, values)) {
          modals.openConfirmModal({
            title: t("common.confirm-location"),
            centered: true,
            children: (
              <Text size="sm">{t("report.location-so-far-report")}</Text>
            ),
            labels: {
              confirm: t("common.confirm"),
              cancel: t("common.dont-submit"),
            },
            confirmProps: { color: "red" },
            onConfirm: async () => {
              await taskMutation.mutateAsync({ ...values, id: taskId });
              mutationSuccess();
            },
          });
          return;
        }
        await taskMutation.mutateAsync({ ...values, id: taskId });
        mutationSuccess();
      } catch (error) {
        mutationFail();
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

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      accept: { "image/jpeg": [], "image/png": [] },
      maxSize: 1000 * 5000,
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length === 0) {
          return;
        }
        formik.setFieldValue(
          "images",
          formik.values.images.concat(acceptedFiles)
        );
      },
    });

  const handleRemoveFile = (index) => {
    formik.setFieldValue(
      "images",
      formik.values.images.filter((v, i) => i !== index)
    );
  };

  const listFileSelected = useMemo(
    () =>
      formik.values.images.map((file, index) => (
        <div key={index} className={styles.container}>
          <div className={styles.text}>
            <span>
              <Image size={20} />
            </span>
            {file.name}
          </div>
          <div
            className={styles.remove_btn}
            onClick={() => handleRemoveFile(index)}
          >
            <XIcon size={20} />
          </div>
        </div>
      )),
    [formik.values.images]
  );

  const location = useGeoLocation();

  useEffect(() => {
    if (location.loaded) {
      formik.setFieldValue("lat", location.coordinates.lat);
      formik.setFieldValue("lng", location.coordinates.lng);
    }
  }, [location.loaded]);

  const handelCancelTask = () => {
    modals.openConfirmModal({
      title: t("common.confirm-cancel-task"),
      centered: true,
      labels: { confirm: t("common.confirm"), cancel: t("common.cancel") },
      confirmProps: { color: "red" },
      onConfirm: () => {
        cancelMutate.mutate(null, {
          onSuccess: () => {
            mutationSuccess();
          },
          onError: () => {
            mutationFail();
          },
        });
      },
    });
  };

  if (hide) return null;

  return (
    <Card>
      <CardHeader title={t("common.verify")} />
      <Divider />
      <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
        <Grid container sx={{ px: 3, py: 2, gap: 2 }}>
          <Grid xs={12} item>
            <TextField
              fullWidth
              label={t("common.content")}
              name="content"
              multiline
              minRows={3}
              required
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.content}
              error={!!(formik.touched.content && formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              fullWidth
              type="number"
              label={t("common.latitude")}
              name="lat"
              required
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lat}
              error={!!(formik.touched.lat && formik.errors.lat)}
              helperText={formik.touched.lat && formik.errors.lat}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              fullWidth
              type="number"
              label={t("common.longitude")}
              name="lng"
              required
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lng}
              error={!!(formik.touched.lng && formik.errors.lng)}
              helperText={formik.touched.lng && formik.errors.lng}
            />
          </Grid>
          <Grid xs={12} item>
            <FormControl fullWidth variant="filled">
              <InputLabel id="type">{t("common.type")}</InputLabel>
              <Select
                label={t("common.type")}
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                error={!!(formik.touched.type && formik.errors.type)}
              >
                {EVIDENCE_TYPE.map((et, index) => (
                  <MenuItem key={index} value={et}>
                    {capitalize(t(`dashboard.report.status.${et}`))}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error>
                {formik.touched.type && formik.errors.type}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid lg={12} item>
            <div {...getRootProps()} className={styles.file_upload_wrapper}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>{t("common.drop-file-here")}</p>
              ) : (
                <p>{t("common.upload-file-here")}</p>
              )}
            </div>
            <div className={styles.list_upload_file}>{listFileSelected}</div>
            <FormHelperText sx={{ marginTop: 1 }} error>
              {fileRejections.length > 0 && t("common.unacceptable-file")}
              {formik.touched.images && formik.errors.images}
              {formik.errors.submit}
            </FormHelperText>
          </Grid>
          <Box sx={{ width: "100%" }} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained">
              {t("common.submit")}
            </Button>
          </Box>
        </Grid>
      </form>
      <Divider />
      <Stack
        direction="row"
        m={3}
        alignItems="center"
        sx={{
          justifyContent: {
            xs: "space-between",
            md: "flex-start",
          },
          gap: {
            xs: 0,
            md: 5,
          },
        }}
      >
        <Typography variant="subtitle2">{t("common.cannot-verify")}</Typography>
        <Button variant="outlined" color="error" onClick={handelCancelTask}>
          {t("common.cancel-task")}
        </Button>
      </Stack>
    </Card>
  );
};

export default TaskVerify;
