import {
  FormControl,
  MenuItem,
  Select,
  Stack,
  capitalize,
} from "@mui/material";
import { useTranslation } from "next-i18next";

const ForumGroupFilter = (props) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" spacing={1}>
      <FormControl>
        <Select size="small" name="order" defaultValue="created_at|desc">
          <MenuItem disabled>{t("common.sort-by")}</MenuItem>
          <MenuItem value="score|desc">{t("common.most-vote")}</MenuItem>
          <MenuItem value="created_at|desc">{t("common.newest")}</MenuItem>
          <MenuItem value="updated_at|desc">{t("common.frequent")}</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <Select size="small" name="status" defaultValue="ALL">
          <MenuItem disabled>{t("common.status")}</MenuItem>
          <MenuItem value="ALL">
            {capitalize(t("dashboard.report.status.ALL"))}
          </MenuItem>
          <MenuItem value="NEW">
            {capitalize(t("dashboard.report.status.NEW"))}
          </MenuItem>
          <MenuItem value="PENDING">
            {capitalize(t("dashboard.report.status.PENDING"))}
          </MenuItem>
          <MenuItem value="CONFIRMED">
            {capitalize(t("dashboard.report.status.CONFIRMED"))}
          </MenuItem>
          <MenuItem value="REJECTED">
            {capitalize(t("dashboard.report.status.REJECTED"))}
          </MenuItem>
          <MenuItem value="IN_PROCESS">
            {capitalize(t("dashboard.report.status.IN_PROCESS"))}
          </MenuItem>
          <MenuItem value="RESOLVED">
            {capitalize(t("dashboard.report.status.RESOLVED"))}
          </MenuItem>
          <MenuItem value="CLOSED">
            {capitalize(t("dashboard.report.status.CLOSED"))}
          </MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default ForumGroupFilter;
