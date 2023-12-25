import { Box, Container, Stack } from "@mui/material";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import styles from "./sponsor.module.scss";

const HomeSponsor = () => {
  const { t } = useTranslation();

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        pt: 6,
        pb: 10,
      }}
    >
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="center">
          <h2 className="section-heading">{t("common.sponsor")}</h2>
        </Stack>
        <Stack direction="row" justifyContent="center" spacing={1}>
          <div className={styles.authorWrapper}>
            <div>made by</div>
            <div>students of</div>
          </div>
          <Image
            src="/assets/logos/vku.svg"
            width={114}
            height={80}
            alt="vku-logo"
            className={styles.img}
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default HomeSponsor;
