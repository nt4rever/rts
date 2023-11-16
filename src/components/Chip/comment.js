import { MessageSquare } from "react-feather";
import styles from "./comment.module.scss";
import { Typography } from "@mui/material";

const CommentChip = (props) => {
  return (
    <div className={styles.wrapper}>
      <MessageSquare size={22} color="#bdbdbd" />
      <Typography variant="subtitle1">1000</Typography>
    </div>
  );
};

export default CommentChip;
