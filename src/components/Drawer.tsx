import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { RouteEnums, ROUTES } from "../utils/routes";

const drawerWidth = 240;

export default function Drawer() {
  return (
    <MuiDrawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        {Object.keys(ROUTES)
          .filter((ROUTE) => ROUTES[ROUTE as RouteEnums].isMenuItem)
          .map((ROUTE) => (
            <ListItem key={ROUTES[ROUTE as RouteEnums].path} disablePadding>
              <ListItemButton>
                <Link to={ROUTES[ROUTE as RouteEnums].path}>
                  <ListItemText primary={ROUTES[ROUTE as RouteEnums].name} />
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </MuiDrawer>
  );
}
