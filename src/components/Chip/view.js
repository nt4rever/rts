import { Typography } from "@mui/material";
import { Eye } from "react-feather";
import styles from "./comment.module.scss";

const ViewChip = (props) => {
  const { viewCount } = props;
  return (
    <div className={styles.wrapper}>
      <Eye size={22} color="#bdbdbd" />
      <Typography variant="subtitle1">{viewCount}</Typography>
    </div>
  );
};

export default ViewChip;
