import {
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "next-i18next";

const ForumCommentFilter = (props) => {
  const { t } = useTranslation();
  const { order, setOrder } = props;
  const handleChange = (e) => {
    setOrder(e.target.value);
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography>{t("common.sort-by")}</Typography>
      <FormControl>
        <Select
          size="small"
          name="order"
          value={order}
          onChange={handleChange}
          MenuProps={{ disableScrollLock: true }}
        >
          <MenuItem disabled>{t("common.sort-by")}</MenuItem>
          <MenuItem value="created_at|desc">{t("common.newest")}</MenuItem>
          <MenuItem value="score|desc">{t("common.most-vote")}</MenuItem>
          <MenuItem value="updated_at|desc">{t("common.frequent")}</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default ForumCommentFilter;
