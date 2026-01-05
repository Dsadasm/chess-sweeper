import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DailyScreen from "./pages/Daily";
import LeaderboardScreen from "./pages/LeaderBoard";
import RandomScreen from "./pages/Random";
import RuleScreen from "./pages/Rule";
import "./App.css";

const router = createBrowserRouter([
  { path: "/daily", element: <DailyScreen /> },
  { path: "/leaderboard", element: <LeaderboardScreen /> },
  { path: "/random", element: <RandomScreen /> },
  { path: "/rule", element: <RuleScreen /> },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
