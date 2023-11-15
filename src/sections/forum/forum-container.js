import { Stack } from "@mui/material";
import ForumReportItem from "./forum-report-item";

const ForumContainer = (props) => {
  return (
    <Stack spacing={1}>
      <ForumReportItem />
      <ForumReportItem />
      <ForumReportItem />
      <ForumReportItem />
    </Stack>
  );
};

export default ForumContainer;
