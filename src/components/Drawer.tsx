import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { ROUTES } from "../utils/routes";

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
        {Object.keys(ROUTES).map((ROUTE) => (
          <ListItem key={ROUTES[ROUTE].path} disablePadding>
            <ListItemButton>
              <Link to={ROUTES[ROUTE].path}>
                <ListItemText primary={ROUTES[ROUTE].name} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </MuiDrawer>
  );
}
