import PropTypes from "prop-types";
import ListBulletIcon from "@heroicons/react/24/solid/ListBulletIcon";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useTranslation } from "next-i18next";

export const OverviewTaskSuccess = (props) => {
  const { value, sx } = props;
  const { t } = useTranslation();

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
            <Typography color="text.secondary" gutterBottom variant="overline">
              {t("dashboard.task-success")}
            </Typography>
            <Typography variant="h4">{value ? `${value}%` : "--"}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "warning.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <ListBulletIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Box sx={{ mt: 3 }}>
          <LinearProgress value={value ?? 100} variant="determinate" />
        </Box>
      </CardContent>
    </Card>
  );
};

OverviewTaskSuccess.propTypes = {
  value: PropTypes.number,
  sx: PropTypes.object,
};
