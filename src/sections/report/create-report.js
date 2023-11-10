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
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useFormik } from "formik";
import { getDistance } from "geolib";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Image, X as XIcon } from "react-feather";
import * as Yup from "yup";
import styles from "./create-report.module.scss";

export const CreateReportForm = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      area_id: Yup.string().required(),
      title: Yup.string().max(200).required(),
      description: Yup.string().max(500),
      lat: Yup.number().min(-90).max(90).required(),
      lng: Yup.number().min(-180).max(180).required(),
      images: Yup.array().required().max(5).min(1),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const area = areas?.find((item) => item.id === values.area_id);
        if (!checkLocation(area, values)) {
          modals.openConfirmModal({
            title: "Confirm your location",
            centered: true,
            children: (
              <Text size="sm">
                Your location is too far from the current area. Do you want to
                continue using this location?
              </Text>
            ),
            labels: { confirm: "Confirm", cancel: "No don't submit it" },
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

  useEffect(() => {
    if (location.loaded) {
      formik.setFieldValue("lat", location.coordinates.lat);
      formik.setFieldValue("lng", location.coordinates.lng);
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
    return null;
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
            Your report has been submitted successfully
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
            Go to home page
          </Button>
        </Box>
      ) : (
        <>
          <Typography variant="h4" mb={4}>
            Create a new report
          </Typography>
          <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
            <Card>
              <CardHeader subheader="Enter details of the problem" />
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
                          Area
                        </InputLabel>
                        <Select
                          label="Area"
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
                        label="Title"
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
                        label="Description"
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
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Latitude"
                        name="lat"
                        required
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.lat}
                        error={!!(formik.touched.lat && formik.errors.lat)}
                        helperText={formik.touched.lat && formik.errors.lat}
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Longitude"
                        name="lng"
                        required
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.lng}
                        error={!!(formik.touched.lng && formik.errors.lng)}
                        helperText={formik.touched.lng && formik.errors.lng}
                      />
                    </Grid>
                    <Grid lg={12}>
                      <div
                        {...getRootProps()}
                        className={styles.file_upload_wrapper}
                      >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                          <p>Drop the files here ...</p>
                        ) : (
                          <p>
                            Drag and drop some files here, or click to select
                            files
                          </p>
                        )}
                      </div>
                      <div className={styles.list_upload_file}>
                        {listFileSelected}
                      </div>
                      <FormHelperText sx={{ marginTop: 1 }} error>
                        {fileRejections.length > 0 && "Unacceptable file"}
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
                  Submit
                </Button>
              </CardActions>
            </Card>
          </form>
        </>
      )}
    </>
  );
};
