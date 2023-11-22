import { MessageSquare } from "react-feather";
import styles from "./comment.module.scss";
import { Tooltip, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";

const CommentChip = (props) => {
  const { count } = props;
  const { t } = useTranslation();
  return (
    <Tooltip title={`${count} ${t("common.comment")}`}>
      <div className={styles.wrapper}>
        <MessageSquare size={22} color="#bdbdbd" />
        <Typography variant="subtitle1">{count}</Typography>
      </div>
    </Tooltip>
  );
};

export default CommentChip;
