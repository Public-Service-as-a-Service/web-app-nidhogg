export const SESSION = {
  token: "token",
};

export const STORE = {
  userId: "userId",
};

export const PATHS = [
  { url: "/dashboard", title: "Dashboard", isVisible: true },
  { url: "/dashboard/messages", title: "Skapa nytt utskick", isVisible: true },
  {
    url: "/dashboard/groups",
    title: "Hantera sparade grupper",
    isVisible: true,
  },
];

export const SESSION_STORAGE = {
  sessionActive: "sessionActive",
};

export const ROUTES = {
  login: "/login",
  logout: "/logout",
  messages: "/messages",
  groups: "/notifier/groups",
  allEmployees: "/notifier/employees",
  searchEmployees: "/notifier/employees/search",
  allOrganizations: "/notifier/organization/organizations",
};

export const tailwindBreakPoint = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const;
