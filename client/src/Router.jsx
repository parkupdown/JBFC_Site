import { Suspense } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { Loader } from "./Loader/Loader";
import Layout from "./components/layout/Layout";

const Join = React.lazy(() => import("@/pages/Join/Join"));
const Login = React.lazy(() => import("@/pages/Login/Login"));
const Main = React.lazy(() => import("@/pages/Main/Main"));
const Board = React.lazy(() => import("@/pages/Board/Board"));
const BoardWrite = React.lazy(() => import("@/pages/Board/BoardWrite"));
const BoardDetail = React.lazy(() => import("@/pages/Board/BoardDetail"));
const Team = React.lazy(() => import("@/pages/Team/Team"));
const BoardMine = React.lazy(() => import("@/pages/Board/BoardMine"));
const Schedule = React.lazy(() => import("@/pages/Schedule/Schedule"));
const FeedBack = React.lazy(() => import("@/pages/FeedBack/FeedBack"));

const routeList = [
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/join",
    element: <Join />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/board",
    element: <Board />,
  },
  { path: "/board/write", element: <BoardWrite /> },
  { path: "/board/detail/:boardId", element: <BoardDetail /> },
  { path: "/team", element: <Team /> },
  { path: "/board/mine", element: <BoardMine /> },
  { path: "/schedule", element: <Schedule /> },
  { path: "/feedback/*", element: <FeedBack /> },
];

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {routeList.map((item, _) => (
            <Route
              key={_}
              {...item}
              element={
                item.path === "/login" || item.path === "/join" ? (
                  item.element
                ) : (
                  <Layout>{item.element}</Layout>
                )
              }
            />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
