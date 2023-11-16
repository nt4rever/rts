import { Stack } from "@mui/material";
import ForumReportItem from "./forum-report-item";

const ForumContainer = (props) => {
  const { data } = props;

  return (
    <Stack spacing={1}>
      {data?.items.map((report) => (
        <ForumReportItem key={report.id} report={report} />
      ))}
    </Stack>
  );
};

export default ForumContainer;
