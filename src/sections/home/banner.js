import { Button } from "@mui/material";
import styles from "./banner.module.scss";
import { ArrowIcon } from "@/assets/icon/arrow";
import NextLink from "next/link";

export default function Banner() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Report a problem</h1>
      <h4 className={styles.subTitle}>
        (like graffiti, fly tipping, broken paving slabs, or street lighting)
      </h4>
      <Button
        variant="contained"
        size="large"
        component={NextLink}
        href="/create-report"
      >
        &nbsp;Report your problem&nbsp;
        <ArrowIcon />
      </Button>
    </div>
  );
}
