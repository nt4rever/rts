import { ROLES } from "@/constants/role";
import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";
import ShoppingBagIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UserPlusIcon from "@heroicons/react/24/solid/UserPlusIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import TicketIcon from "@heroicons/react/24/solid/TicketIcon";
import ShieldCheckIcon from "@heroicons/react/24/solid/ShieldCheckIcon";
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
  // {
  //   title: "Settings",
  //   path: "/settings",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <CogIcon />
  //     </SvgIcon>
  //   ),
  // },
  // {
  //   title: "Login",
  //   path: "/auth/login",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <LockClosedIcon />
  //     </SvgIcon>
  //   ),
  // },
  // {
  //   title: "Register",
  //   path: "/auth/register",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserPlusIcon />
  //     </SvgIcon>
  //   ),
  // },
  // {
  //   title: "Error",
  //   path: "/404",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <XCircleIcon />
  //     </SvgIcon>
  //   ),
  // },
];

export const getItems = (role) => items.filter((item) => item.role.includes(role));