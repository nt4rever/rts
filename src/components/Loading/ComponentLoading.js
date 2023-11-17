import { Box, CircularProgress } from "@mui/material";

const ComponentLoading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh"
      }}
    >
      <CircularProgress disableShrink />
    </Box>
  );
};

export default ComponentLoading;
