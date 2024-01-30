const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.listen(3060, () => console.log("서버켜짐"));
const joinRouter = require("./routes/joins");

app.use("/join", joinRouter);
