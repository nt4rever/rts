import { userService } from "@/apis/user";
import { notifications } from "@mantine/notifications";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { useRef } from "react";

export const AccountProfile = ({ user }) => {
  const { t } = useTranslation();
  const fileInputRef = useRef();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["avatar"],
    mutationFn: userService.uploadAvatar,
  });

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSize = file.size / 1024 / 1024;
      if (fileSize > 5) {
        notifications.show({
          title: t("message.image-size-too-large"),
          color: "red",
        });
        return;
      }
      mutation.mutate(
        { avatar: file },
        {
          onSuccess: () => {
            notifications.show({
              title: t("message.update-profile-success"),
              color: "green",
              autoClose: 2000,
            });
          },
          onError: () => {
            notifications.show({
              title: t("message.update-profile-fail"),
              color: "red",
            });
          },
          onSettled: () => {
            queryClient.invalidateQueries(["me"]);
          },
        }
      );
    }
  };

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
          <Typography
            color="text.secondary"
            variant="subtitle2"
            textTransform="uppercase"
          >
            {t(`common.role.${user.role}`)}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user.email}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          fullWidth
          variant="text"
          onClick={() => fileInputRef.current.click()}
        >
          {t("common.upload-picture")}
        </Button>
        <input
          onChange={handleChange}
          ref={fileInputRef}
          multiple={false}
          accept="image/*"
          type="file"
          hidden
        />
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
