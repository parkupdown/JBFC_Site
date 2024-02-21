const express = require("express");
const router = express.Router();
const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const postCommentData = (req, res) => {
  let { board_id, content, writer, time } = req.body;
  const sql =
    "INSERT INTO comment (board_id, content, writer, time) VALUE (?,?,?,?);";
  const value = [board_id, content, writer, time];

  conn.query(sql, value, function (err, result) {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }
    res.status(StatusCodes.CREATED).end();
  });
};

const getCommentData = (req, res) => {
  const { boardId } = req.params;

  const sql = "SELECT * FROM comment WHERE board_id = ? ;";
  conn.query(sql, boardId, function (err, result) {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }
    console.log(result);
    res.status(StatusCodes.OK).json(result);
  });
};

module.exports = { postCommentData, getCommentData };
