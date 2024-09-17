interface RouteInfo {
  path: string;
  name: string;
}

export const ROUTES: Record<string, RouteInfo> = {
  HOME: {
    path: "/",
    name: "Home",
  },
  STATS: {
    path: "stats",
    name: "Stats",
  },
};
