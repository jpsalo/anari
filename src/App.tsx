import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Drawer from "./components/Drawer";
import { PlayersProvider } from "./data/PlayersContext";

function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Drawer />
        <PlayersProvider>
          <Outlet />
        </PlayersProvider>
      </Box>
    </>
  );
}

export default App;
