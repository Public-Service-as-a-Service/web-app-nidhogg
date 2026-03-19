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
} as const;

export const API_ENDPOINTS = {
  login: "/users/auth/login",
  logout: "/users/auth/logout",
  msLogin: "/api/teamssender/2281/login",
  msCallback: "/api/teamssender/callback",
  messages: "/notifier/messages",
  messageById: (id: number, email: string) =>
    `/notifier/messages/${id}/${email}`,
  groups: "/notifier/groups",
  groupById: (id: number | string) => `/notifier/groups/${id}`,
  allEmployees: "/notifier/employees",
  searchEmployees: "/notifier/employees/search",
  allOrganizations: "/notifier/organization/organizations",
  allManagers: "/notifier/employees/managers",
} as const;

export const PATHS = [
  { url: PAGE_ROUTES.dashboard, title: "Dashboard", isVisible: true },
  {
    url: PAGE_ROUTES.dashboardMessages,
    title: "Skapa nytt utskick",
    isVisible: true,
  },
  {
    url: PAGE_ROUTES.dashboardGroups,
    title: "Hantera sparade grupper",
    isVisible: true,
  },
    {
    url: API_ENDPOINTS.msLogin,
    title: "Logga in TeamsSender",
    isVisible: true,
    isExternal: true
  },
];

export const SESSION_STORAGE = {
  sessionActive: "sessionActive",
  userEmail: "userEmail",
};

export const tailwindBreakPoint = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const;
