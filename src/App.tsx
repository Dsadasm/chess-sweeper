import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "./pages/Home";
import DailyScreen from "./pages/Daily";
import LeaderboardScreen from "./pages/Leaderboard";
import RandomScreen from "./pages/Random";
import RuleScreen from "./pages/Rule";
import "./App.css";

const router = createBrowserRouter([
  { path: "/", element: <HomeScreen /> },
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
