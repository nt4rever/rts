import LanguageSwitcher from "@/components/language-switcher";
import { ActionIcon } from "@mantine/core";
import { Divider } from "@mui/material";
import { CornerRightUp } from "react-feather";
import styles from "./index.module.scss";
import { getYear } from "date-fns";

export default function Footer() {
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className={styles.footer}>
      <Divider />
      <div className={styles.reserveBox}>
        <div className={styles.textSignContainer}>
          @{getYear(new Date())} RTS.&nbsp;<div>All rights reserved</div>
        </div>
        <div className={styles.groupBtn}>
          <LanguageSwitcher />
          <ActionIcon
            title="Back to top"
            variant="gradient"
            size={37}
            aria-label="Gradient action icon"
            gradient={{ from: "#6366F1", to: "violet", deg: 32 }}
            onClick={backToTop}
            style={{
              borderRadius: 8,
            }}
          >
            <CornerRightUp size={18} />
          </ActionIcon>
        </div>
      </div>
    </div>
  );
}
