/* eslint-disable react-hooks/exhaustive-deps */
import { areaService } from "@/apis/area";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Unstable_Grid2 as Grid,
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEffect } from "react";
import Dropzone from "react-dropzone";
import * as Yup from "yup";

export const CreateReportForm = () => {
  const {
    data: areas,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["area"],
    queryFn: () =>
      areaService.all({
        select: "name|address",
        order: "name|asc",
      }),
    onSuccess: (data) => {
      formik.setFieldValue("area_id", data[0].id || undefined);
    },
  });

  const formik = useFormik({
    initialValues: {
      area_id: undefined,
      title: "",
      description: "",
      lat: "",
      lng: "",
      images: [],
    },
    validationSchema: Yup.object({
      area_id: Yup.string().required(),
      title: Yup.string().required(),
      description: Yup.string(),
      lat: Yup.number().required(),
      lng: Yup.number().required(),
      images: Yup.array().required(),
    }),
    onSubmit: async (values, helpers) => {
      console.log(values);
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        console.log("Geolocation not supported");
      }

      function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        formik.setFieldValue("lat", latitude);
        formik.setFieldValue("lng", longitude);
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      }

      function error() {
        console.log("Unable to retrieve your location");
      }
    }
  }, []);

  if (isLoading) {
    return null;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader title="Create a new report" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={12}>
                <TextField
                  fullWidth
                  label="Select Your Area"
                  name="area_id"
                  required
                  select
                  SelectProps={{ native: true }}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.area_id}
                  error={!!(formik.touched.area_id && formik.errors.area_id)}
                  helperText={formik.touched.area_id && formik.errors.area_id}
                >
                  {areas.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </TextField>
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
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={
                    !!(formik.touched.description && formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
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
                <Dropzone
                  accept={{ "image/jpeg": [], "image/png": [] }}
                  onDrop={(acceptedFiles) => {
                    if (acceptedFiles.length === 0) {
                      return;
                    }
                    formik.setFieldValue(
                      "images",
                      formik.values.images.concat(acceptedFiles)
                    );
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>
                          Drag drop some files here, or click to select files
                        </p>
                        {formik.values.images.map((file, i) => (
                          <div key={i}>{file.name}</div>
                        ))}
                      </div>
                    </section>
                  )}
                </Dropzone>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
