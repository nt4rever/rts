/* eslint-disable react-hooks/exhaustive-deps */
import { areaService } from "@/apis/area";
import { ticketService } from "@/apis/ticket";
import useGeoLocation from "@/hooks/use-geo-location";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  Unstable_Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  SvgIcon,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useFormik } from "formik";
import { getDistance } from "geolib";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Image, Map, X as XIcon } from "react-feather";
import * as Yup from "yup";
import { ForumSkeleton } from "../forum/forum-skeleton";
import styles from "./create-report.module.scss";

const ModalLocation = dynamic(() => import("@/sections/map/modal-location"), {
  ssr: false,
});

export const CreateReportForm = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openModalLocation, setOpenModalLocation] = useState(false);

  const {
    data: areas,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["area"],
    queryFn: () =>
      areaService.all({
        order: "name|asc",
      }),
  });

  const reportMutation = useMutation({
    mutationFn: ticketService.create,
  });

  const checkLocation = (area, location) => {
    const distance = getDistance(
      {
        latitude: area.lat,
        longitude: area.lng,
      },
      {
        latitude: location.lat,
        longitude: location.lng,
      }
    );
    return distance <= area.radius;
  };

  const formik = useFormik({
    initialValues: {
      area_id: "",
      title: "",
      description: "",
      lat: "",
      lng: "",
      images: [],
    },
    validationSchema: Yup.object({
      area_id: Yup.string().required(t("validation.area.required")),
      title: Yup.string()
        .max(
          200,
          t("validation.common.max-length", {
            max: 200,
          })
        )
        .required(t("validation.common.title-required")),
      description: Yup.string().max(
        500,
        t("validation.common.max-length", {
          max: 500,
        })
      ),
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
    }),
    onSubmit: async (values, helpers) => {
      try {
        const area = areas?.find((item) => item.id === values.area_id);
        if (!checkLocation(area, values)) {
          modals.openConfirmModal({
            title: t("common.confirm-location"),
            centered: true,
            children: <Text size="sm">{t("report.location-so-far")}</Text>,
            labels: {
              confirm: t("common.confirm"),
              cancel: t("common.dont-submit"),
            },
            confirmProps: { color: "red" },
            onConfirm: async () => {
              await reportMutation.mutateAsync(values);
              setIsSubmitted(true);
            },
          });
          return;
        }
        await reportMutation.mutateAsync(values);
        setIsSubmitted(true);
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

  const location = useGeoLocation();

  const handleSetLocation = (loc) => {
    if (loc) {
      formik.setFieldValue("lat", loc.lat);
      formik.setFieldValue("lng", loc.lng);
    }
  };

  useEffect(() => {
    if (location.loaded) {
      handleSetLocation(location.coordinates);
    }
  }, [location.loaded]);

  const areaItems = useMemo(
    () =>
      areas?.map((item) => (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      )),
    [areas]
  );

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

  if (isLoading) {
    return <ForumSkeleton />;
  }

  if (isError) {
    router.push("/500");
  }

  return (
    <>
      {isSubmitted ? (
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography align="center" sx={{ mb: 3 }} variant="h5">
            {t("report.submit-report-success")}
          </Typography>
          <Box
            sx={{
              mb: 3,
              textAlign: "center",
            }}
          >
            <img
              alt="Under development"
              src="/assets/icons/iconly-glass-tick.svg"
              style={{
                display: "inline-block",
                maxWidth: "100%",
                width: 150,
              }}
            />
          </Box>
          <Button
            component={NextLink}
            href="/"
            endIcon={
              <SvgIcon fontSize="small">
                <ArrowRightIcon />
              </SvgIcon>
            }
            sx={{ mt: 3 }}
            variant="contained"
          >
            {t("common.go-to-home-page")}
          </Button>
        </Box>
      ) : (
        <>
          <ModalLocation
            open={openModalLocation}
            onClose={() => setOpenModalLocation(false)}
            handleSetLocation={handleSetLocation}
            location={{
              lat: formik.values.lat,
              lng: formik.values.lng,
            }}
          />
          <Typography variant="h5" mb={4}>
            {t("report.create-a-report")}
          </Typography>
          <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
            <Card>
              <CardHeader subheader={t("report.enter-detail")} />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ m: -1.5 }}>
                  <Grid container spacing={3}>
                    <Grid xs={12} md={12}>
                      <FormControl fullWidth variant="filled">
                        <InputLabel
                          id="area_id"
                          error={
                            !!(formik.touched.area_id && formik.errors.area_id)
                          }
                        >
                          {t("common.area")}
                        </InputLabel>
                        <Select
                          label="Area"
                          MenuProps={{ disableScrollLock: true }}
                          value={formik.values.area_id}
                          onChange={formik.handleChange}
                          name="area_id"
                          error={
                            !!(formik.touched.area_id && formik.errors.area_id)
                          }
                        >
                          {areaItems}
                        </Select>
                        <FormHelperText error>
                          {formik.touched.area_id && formik.errors.area_id}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid xs={12} md={12}>
                      <TextField
                        fullWidth
                        label={t("common.title")}
                        name="title"
                        required
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        error={!!(formik.touched.title && formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                      />
                    </Grid>
                    <Grid xs={12} md={12}>
                      <TextField
                        fullWidth
                        label={t("common.description")}
                        name="description"
                        multiline
                        minRows={3}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={
                          !!(
                            formik.touched.description &&
                            formik.errors.description
                          )
                        }
                        helperText={
                          formik.touched.description &&
                          formik.errors.description
                        }
                      />
                    </Grid>
                    <Grid xs={12} md={5}>
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
                    <Grid xs={12} md={5}>
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
                    <Grid xs={12} md={2}>
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <Tooltip title={t("common.choose-from-map")}>
                          <Button
                            variant="outlined"
                            size="medium"
                            onClick={() => setOpenModalLocation(true)}
                          >
                            <Map />
                          </Button>
                        </Tooltip>
                      </Box>
                    </Grid>
                    <Grid lg={12} sx={{ width: "100%" }}>
                      <div
                        {...getRootProps()}
                        className={styles.file_upload_wrapper}
                      >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                          <p>{t("common.drop-file-here")}</p>
                        ) : (
                          <p>{t("common.upload-file-here")}</p>
                        )}
                      </div>
                      <div className={styles.list_upload_file}>
                        {listFileSelected}
                      </div>
                      <FormHelperText sx={{ marginTop: 1 }} error>
                        {fileRejections.length > 0 && (
                          <>
                            {t("common.unacceptable-file")}
                            <br />
                          </>
                        )}
                        {formik.touched.images && formik.errors.images}
                        {formik.errors.submit}
                      </FormHelperText>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button type="submit" variant="contained">
                  {t("common.submit")}
                </Button>
              </CardActions>
            </Card>
          </form>
        </>
      )}
    </>
  );
};
