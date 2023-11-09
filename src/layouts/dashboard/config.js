import { ROLES } from "@/constants/role";
import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import ShieldCheckIcon from "@heroicons/react/24/solid/ShieldCheckIcon";
import TicketIcon from "@heroicons/react/24/solid/TicketIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import { SvgIcon } from "@mui/material";

export const items = [
  {
    role: [ROLES.Admin, ROLES.AreaManager, ROLES.User, ROLES.Volunteer],
    title: "Overview",
    path: "/dashboard",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    role: [ROLES.Admin, ROLES.AreaManager, ROLES.User, ROLES.Volunteer],
    title: "Reports",
    path: "/my-report",
    icon: (
      <SvgIcon fontSize="small">
        <TicketIcon />
      </SvgIcon>
    ),
  },
  {
    role: [ROLES.Volunteer],
    title: "Tasks",
    path: "/tasks",
    icon: (
      <SvgIcon fontSize="small">
        <ShieldCheckIcon />
      </SvgIcon>
    ),
  },
  {
    role: [ROLES.Admin, ROLES.AreaManager, ROLES.User, ROLES.Volunteer],
    title: "Account",
    path: "/account",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
];

export const getItems = (role) => items.filter((item) => item.role.includes(role));