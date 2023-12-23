import { useLogoutMutation } from "@/hooks/mutations/auth";
import useAuthStore from "@/store/useAuthStore";
import { clearTokens, getAccessToken } from "@/utils/storage";
import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useCallback } from "react";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const mutation = useLogoutMutation();

  const handleSignOut = useCallback(() => {
    const token = getAccessToken();
    mutation.mutate(
      {
        token,
      },
      {
        onSettled: () => {
          onClose?.();
          clearTokens();
          router.refresh();
        },
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  const handleOpenHomePage = () => {
    router.push("/");
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
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">{t("common.account")}</Typography>
        <Typography color="text.secondary" variant="body2">
          {`${user?.first_name || ""} ${user?.last_name || ""}`}
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
        <MenuItem onClick={handleOpenHomePage}>
          {t("common.home-page")}
        </MenuItem>

        <MenuItem onClick={handleSignOut}>{t("common.sign-out")}</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
