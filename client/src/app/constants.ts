export const SESSION = {
  token: "token",
};

export const STORE = {
  authToken: "token",
};

export const PAGE_ROUTES = {
  home: "/",
  dashboard: "/dashboard",
  dashboardMessages: "/dashboard/messages",
  dashboardMessageDetails: (id: number) => `/dashboard/messages/${id}`,
  dashboardGroups: "/dashboard/groups",
  dashboardGroupCreate: "/dashboard/groups/create",
  dashboardGroupDetails: (id: number | string) => `/dashboard/groups/${id}`,
  dashboardAdmin: "/dashboard/admin",
} as const;

export const API_ENDPOINTS = {
  login: "/users/auth/login",
  logout: "/users/auth/logout",
  msLogin: "/api/teamssender/2281/login",
  msCallback: "/api/teamssender/callback",
  messages: "/notifier/messages",
  messageById: (id: number, email: string) =>
    `/notifier/messages/${id}/${email}`,
  messageRecipients: (id: number) =>
    `/notifier/messages/message/${id}/recipients`,
  messagesAll: "/notifier/messages/all",
  groups: "/notifier/groups",
  groupById: (id: number | string) => `/notifier/groups/${id}`,
  allEmployees: "/notifier/employees",
  searchEmployees: "/notifier/employees/search",
  allOrganizations: "/notifier/organization/organizations",
  allManagers: "/notifier/employees/managers",
  itProd: "/notifier/employees/org-group/it-prod",
  adminUsers: "/admin/users",
  adminUserById: (id: number) => `/admin/users/${id}`,
  adminUserPassword: (id: number) => `/admin/users/${id}/password`,
} as const;

type NavPath = {
  url: string;
  title: string;
  isVisible: boolean;
  isExternal?: boolean;
};

export const USER_PATHS: NavPath[] = [
  { url: PAGE_ROUTES.dashboard, title: "Startsida", isVisible: true },
  {
    url: PAGE_ROUTES.dashboardMessages,
    title: "Nytt utskick",
    isVisible: true,
  },
  {
    url: PAGE_ROUTES.dashboardGroups,
    title: "Hantera dina grupper",
    isVisible: true,
  },
];

export const ADMIN_PATHS: NavPath[] = [
  {
    url: PAGE_ROUTES.dashboardAdmin,
    title: "Admin",
    isVisible: true,
  },
  {
    url: API_ENDPOINTS.msLogin,
    title: "TeamsSender",
    isVisible: true,
    isExternal: true,
  },
];

export const PATHS: NavPath[] = [...USER_PATHS, ...ADMIN_PATHS];

export const SESSION_STORAGE = {
  sessionActive: "sessionActive",
};

export const tailwindBreakPoint = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const;
