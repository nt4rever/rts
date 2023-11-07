import { Box, CircularProgress } from "@mui/material";

const FullPageLoading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress disableShrink />
    </Box>
  );
};

export default FullPageLoading;
