import Board from "./routes/Board";
import BoardDetail from "./routes/BoardDetail";
import BoardMine from "./routes/BoardMine";
import Chat from "./routes/Chat";
import DetailWeatherPollution from "./routes/DetailWeatherPollution";
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
        <Route path="/home/" element={<Home />}></Route>
        <Route path="/board" element={<Board />}></Route>
        <Route path="/board/:userId" element={<BoardDetail />}></Route>
        <Route path="/board/mine" element={<BoardMine />}></Route>
        <Route path="/chat/*" element={<Chat />}></Route>
        <Route
          path="/WeatherPollution/*"
          element={<DetailWeatherPollution />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
