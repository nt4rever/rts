import { Tooltip, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { Eye } from "react-feather";
import styles from "./comment.module.scss";

const ViewChip = (props) => {
  const { viewCount } = props;
  const { t } = useTranslation();
  return (
    <Tooltip title={`${viewCount} ${t("common.views")}`}>
      <div className={styles.wrapper}>
        <Eye size={22} color="#bdbdbd" />
        <Typography variant="subtitle1">{viewCount}</Typography>
      </div>
    </Tooltip>
  );
};

export default ViewChip;
