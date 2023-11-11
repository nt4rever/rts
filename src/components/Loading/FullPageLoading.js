import { Box } from "@mui/material";
import { Logo } from "../logo";

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
      <Box
        sx={{
          display: "inline-flex",
          height: 32,
          width: 32,
        }}
      >
        <Logo />
      </Box>
    </Box>
  );
};

export default FullPageLoading;
