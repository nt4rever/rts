import { useCallback } from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import useAuthStore from "@/store/useAuthStore";
import { useTranslation } from "next-i18next";
import { clearTokens, getAccessToken } from "@/utils/storage";
import { useLogoutMutation } from "@/hooks/mutations/auth";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { t } = useTranslation();
  const mutation = useLogoutMutation();

  const handleSignOut = () => {
    const token = getAccessToken();
    mutation.mutate({
      token,
    });
    onClose?.();
    logout();
    clearTokens();
  };

  const handleOpenDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
      disableScrollLock
      sx={{ zIndex: 3000 }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">{t("common.account")}</Typography>
        <Typography color="text.secondary" variant="body2">
          {user?.first_name || ""} {user?.last_name}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={handleOpenDashboard}>Dashboard</MenuItem>
        <MenuItem onClick={handleSignOut}>{t("common.logout")}</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
