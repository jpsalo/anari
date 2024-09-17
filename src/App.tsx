import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Drawer from "./components/Drawer";

function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Drawer />
        <Outlet />
      </Box>
    </>
  );
}

export default App;
