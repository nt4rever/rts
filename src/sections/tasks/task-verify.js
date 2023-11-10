/* eslint-disable react-hooks/exhaustive-deps */
import CommonTaskRow from "@/components/Task/common-task-row";
import { EVIDENCE_TYPE } from "@/constants/task-status";
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
} from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { Image, X as XIcon } from "react-feather";
import { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import useGeoLocation from "@/hooks/use-geo-location";
import { useEffect } from "react";
import styles from "../report/create-report.module.scss";
import * as Yup from "yup";

const TaskVerify = (props) => {
  const { taskId, hide } = props;
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      content: "",
      lat: "",
      lng: "",
      images: [],
      type: EVIDENCE_TYPE[0],
    },
    validationSchema: Yup.object({
      content: Yup.string().max(500).required(),
      lat: Yup.number().min(-90).max(90).required(),
      lng: Yup.number().min(-180).max(180).required(),
      images: Yup.array().required().max(5).min(1),
      type: Yup.mixed().oneOf(EVIDENCE_TYPE).required(),
    }),
    onSubmit: async (values, helpers) => {},
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

  if (hide) return null;

  return (
    <Card>
      <CardHeader title="Verify" />
      <Divider />
      <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
        <Grid container sx={{ px: 3, py: 2, gap: 2 }}>
          <Grid xs={12} item>
            <TextField
              fullWidth
              label="Content"
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
          <Grid xs={12} item>
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
          <Grid xs={12} item>
            <FormControl fullWidth variant="filled">
              <InputLabel id="type">Type</InputLabel>
              <Select
                label="Type"
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                error={!!(formik.touched.type && formik.errors.type)}
              >
                {EVIDENCE_TYPE.map((t, index) => (
                  <MenuItem key={index} value={t}>
                    {t}
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
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag and drop some files here, or click to select files</p>
              )}
            </div>
            <div className={styles.list_upload_file}>{listFileSelected}</div>
            <FormHelperText sx={{ marginTop: 1 }} error>
              {fileRejections.length > 0 && "Unacceptable file"}
              {formik.touched.images && formik.errors.images}
              {formik.errors.submit}
            </FormHelperText>
          </Grid>
          <Box sx={{ width: "100%" }} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </Grid>
      </form>
      <Divider />
      <Stack
        direction="row"
        m={3}
        alignItems="center"
        gap={5}
        sx={{
          justifyContent: {
            xs: "space-between",
            md: "flex-start",
          },
        }}
      >
        <Typography variant="subtitle2">{"You can't verify?"}</Typography>
        <Button variant="outlined" color="error">
          Cancel this task
        </Button>
      </Stack>
    </Card>
  );
};

export default TaskVerify;
