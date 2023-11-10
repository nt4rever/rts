import { ROLES } from "./role";
import RouteNames from "./route-name";

const routeConfig = {
  [ROLES.Admin]: {
    default: RouteNames.dashboard,
    [RouteNames.dashboard]: RouteNames.dashboard,
    [RouteNames.account]: RouteNames.account,
    [RouteNames.myReport]: RouteNames.myReport,
  },
  [ROLES.AreaManager]: {
    default: RouteNames.dashboard,
    [RouteNames.dashboard]: RouteNames.dashboard,
    [RouteNames.account]: RouteNames.account,
    [RouteNames.myReport]: RouteNames.myReport,
  },
  [ROLES.User]: {
    default: RouteNames.dashboard,
    [RouteNames.dashboard]: RouteNames.dashboard,
    [RouteNames.account]: RouteNames.account,
    [RouteNames.myReport]: RouteNames.myReport,
  },
  [ROLES.Volunteer]: {
    default: RouteNames.dashboard,
    [RouteNames.dashboard]: RouteNames.dashboard,
    [RouteNames.account]: RouteNames.account,
    [RouteNames.myReport]: RouteNames.myReport,
    [RouteNames.tasks]: RouteNames.tasks,
  },
};

export default routeConfig;
