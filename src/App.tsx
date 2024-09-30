import { Box, CssBaseline } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import Drawer from "./components/Drawer";
import { PlayersProvider } from "./data/PlayersContext";

function App() {
  return (
    <>
      <CssBaseline />
      <HelmetProvider>
        <Helmet>
          <title>anari</title>
        </Helmet>
        <Box sx={{ display: "flex" }}>
          <Drawer />
          <PlayersProvider>
            <Outlet />
          </PlayersProvider>
        </Box>
      </HelmetProvider>
    </>
  );
}

export default App;
