import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./utils/routes";
import Stats from "./pages/Stats";
import ErrorPage from "./pages/ErrorPage";
import Player from "./pages/Player";
import Home from "./pages/Home";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const router = createBrowserRouter([
  {
    path: ROUTES.HOME.path,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.HOME.path,
        element: <Home />,
      },
      {
        path: ROUTES.STATS.path,
        element: <Stats />,
      },
      {
        path: ROUTES.PLAYERS.path,
        element: <div>Players</div>,
      },
      {
        path: `${ROUTES.PLAYERS.path}/:playerId`,
        element: <Player />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
