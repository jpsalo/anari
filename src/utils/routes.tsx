interface RouteInfo {
  path: string;
  name: string;
  isMenuItem?: boolean;
}

export type RouteEnums = "ERROR" | "HOME" | "STATS" | "PLAYERS";

export const ROUTES: Record<RouteEnums, RouteInfo> = {
  ERROR: {
    path: "/404",
    name: "Error",
  },
  HOME: {
    path: "/",
    name: "Home",
    isMenuItem: true,
  },
  STATS: {
    path: "stats",
    name: "Stats",
    isMenuItem: true,
  },
  PLAYERS: {
    path: "/players",
    name: "Players",
    isMenuItem: true,
  },
};
