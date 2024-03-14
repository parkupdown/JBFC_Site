import { Suspense } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { Loader } from "./Loader/Loader";
import Layout from "./components/layout/Layout";

const Join = React.lazy(() => import("./pages/Join/Join"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const Main = React.lazy(() => import("./pages/Main/Main"));
const Board = React.lazy(() => import("./pages/Board/Board"));
const BoardWrite = React.lazy(() => import("./pages/Board/BoardWrite"));
const BoardDetail = React.lazy(() => import("./pages/Board/BoardDetail"));
const Team = React.lazy(() => import("./pages/Team/Team"));
const BoardMine = React.lazy(() => import("./pages/Board/BoardMine"));
const Schedule = React.lazy(() => import("./pages/Schedule/Schedule"));
const FeedBack = React.lazy(() => import("./pages/FeedBack/FeedBack"));

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Main />
              </Layout>
            }
          />
          <Route
            path="/join"
            element={
              <Layout>
                <Join />
              </Layout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board/write" element={<BoardWrite />} />
          <Route path="/board/detail/:boardId" element={<BoardDetail />} />
          <Route path="/team" element={<Team />} />
          <Route path="/board/mine" element={<BoardMine />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/feedback" element={<FeedBack />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
