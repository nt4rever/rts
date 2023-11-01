import { usePopover } from "@/hooks/use-popover";
import useAuthStore from "@/store/useAuthStore.js";
import { Avatar, Box, Button } from "@mui/material";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { AccountPopover } from "./account-popover";

const Account = () => {
  const { isLoggedIn, user } = useAuthStore();
  const accountPopover = usePopover();
  const { t } = useTranslation();

  if (!isLoggedIn)
    return (
      <Link href="/auth/login">
        <Button
          variant="contained"
          sx={{
            textTransform: "capitalize",
          }}
        >
          {t("common.login")}
        </Button>
      </Link>
    );

  return (
    <>
      <Box>
        <Avatar
          onClick={accountPopover.handleOpen}
          ref={accountPopover.anchorRef}
          sx={{
            cursor: "pointer",
            height: 40,
            width: 40,
          }}
          src={user?.avatar || "/assets/avatars/avatar-anika-visser.png"}
        />
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};

export default Account;
