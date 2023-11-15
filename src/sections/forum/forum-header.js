import { ArrowIcon } from "@/assets/icon/arrow";
import { Box, Button, Stack } from "@mui/material";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import ForumGroupFilter from "./forum-group-filter";

const ForumHeader = (props) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" justifyContent="space-between">
      <Box>
        <Button
          variant="contained"
          size="small"
          component={NextLink}
          href="/create-report"
        >
          &nbsp;{t("home.report-your-problem")}&nbsp;
          <ArrowIcon />
        </Button>
      </Box>
      <ForumGroupFilter />
    </Stack>
  );
};

export default ForumHeader;
