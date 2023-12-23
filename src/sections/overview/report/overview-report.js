import TicketIcon from "@heroicons/react/24/solid/TicketIcon";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

export const OverviewReport = (props) => {
  const { sx, value } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Report
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "error.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <TicketIcon />
            </SvgIcon>
          </Avatar>
        </Stack>

        <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
          <Typography color="text.secondary" variant="caption">
            Thank you for your contribution❤️
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewReport.prototypes = {
  sx: PropTypes.object,
  value: PropTypes.string.isRequired,
};
