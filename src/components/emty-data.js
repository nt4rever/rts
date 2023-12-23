import { Box, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import Image from "next/image";

const EmptyData = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          mb: 3,
          textAlign: "center",
        }}
      >
        <Image
          alt="Under development"
          src="/assets/errors/error-404.png"
          style={{
            display: "inline-block",
            maxWidth: "100%",
          }}
          width={150}
          height={150}
        />
      </Box>
      <Typography
        align="center"
        sx={{ color: "rgb(108, 115, 127)" }}
        variant="h6"
      >
        {t("common.empty-data")}
      </Typography>
    </Box>
  );
};

export default EmptyData;
