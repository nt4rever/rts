/* eslint-disable react-hooks/exhaustive-deps */
import { areaService } from "@/apis/area";
import useGeoLocation from "@/hooks/use-geo-location";
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
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup";
import styles from "./create-report.module.scss";
import { useRouter } from "next/router";
import { Image, X as XIcon } from "react-feather";

export const CreateReportForm = () => {
  const router = useRouter();
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
  });

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
      title: Yup.string().required(),
      description: Yup.string(),
      lat: Yup.number().required(),
      lng: Yup.number().required(),
      images: Yup.array().required().max(5).min(1),
    }),
    onSubmit: async (values, helpers) => {
      console.log(values);
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
              <Image size={20}/>
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
    <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader title="Create a new report" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={12}>
                <FormControl fullWidth variant="filled">
                  <InputLabel
                    id="area_id"
                    error={!!(formik.touched.area_id && formik.errors.area_id)}
                  >
                    Area
                  </InputLabel>
                  <Select
                    label="Area"
                    value={formik.values.area_id}
                    onChange={formik.handleChange}
                    name="area_id"
                    error={!!(formik.touched.area_id && formik.errors.area_id)}
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
                <div {...getRootProps()} className={styles.file_upload_wrapper}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p>
                      Drag and drop some files here, or click to select files
                    </p>
                  )}
                </div>
                <div className={styles.list_upload_file}>
                  {listFileSelected}
                </div>
                <FormHelperText error>
                  {fileRejections.length > 0 && "Unacceptable file"}
                  {formik.touched.images && formik.errors.images}
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
  );
};
