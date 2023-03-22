import Detail from "./routes/Detail";
import Home from "./routes/Home";

const { BrowserRouter, Routes, Route } = require("react-router-dom");

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/detail" element={<Detail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
