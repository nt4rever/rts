import LanguageSwitcher from "@/components/language-switcher";
import { Divider } from "@mui/material";
import styles from "./index.module.scss";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <Divider />
      <div className={styles.reserveBox}>
        <div>@2023 RTS. All rights reserved</div>
        <LanguageSwitcher />
      </div>
    </div>
  );
}
