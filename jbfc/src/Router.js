import Login from "./routes/Login";
import Sign from "./routes/Sign";

const { BrowserRouter, Routes, Route } = require("react-router-dom");

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/sign" element={<Sign />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;