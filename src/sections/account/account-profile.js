import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Skeleton,
  Typography,
} from "@mui/material";
import { useTranslation } from "next-i18next";

export const AccountProfile = ({ user }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 80,
              mb: 2,
              width: 80,
            }}
          />
          <Typography gutterBottom variant="h5">
            {user.first_name} {user.last_name}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user.role}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user.email}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text">
          {t("common.upload-picture")}
        </Button>
      </CardActions>
    </Card>
  );
};

export const AccountProfileSkeleton = () => {
  return (
    <div>
      <Skeleton variant="text" animation="wave" sx={{ fontSize: "2rem" }} />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" height={60} sx={{ marginY: 2 }} />
      <Skeleton variant="rounded" height={60} />
    </div>
  );
};
