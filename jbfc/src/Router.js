import Board from "./routes/Board";
import BoardDetail from "./routes/BoardDetail";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Sign from "./routes/Sign";

const { BrowserRouter, Routes, Route } = require("react-router-dom");

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/sign" element={<Sign />}></Route>
        <Route path="/home/*" element={<Home />}></Route>
        <Route path="/board" element={<Board />}></Route>
        <Route path="/board/:userId" element={<BoardDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
