import { Suspense } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { Loader } from "./Loader/Loader";
import Team from "./Team/Team";
import BoardMine from "./Board/BoardMine";

const Join = React.lazy(() => import("./Join/Join"));
const Login = React.lazy(() => import("./Login/Login"));
const Main = React.lazy(() => import("./Main/Main"));
const Board = React.lazy(() => import("./Board/Board"));
const BoardWrite = React.lazy(() => import("./Board/BoardWrite"));
const BoardDetail = React.lazy(() => import("./Board/BoardDetail"));

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board/write" element={<BoardWrite />} />
          <Route path="/board/detail/:boardId" element={<BoardDetail />} />
          <Route path="/team" element={<Team />} />
          <Route path="/board/mine" element={<BoardMine />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
