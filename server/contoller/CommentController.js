const express = require("express");
const router = express.Router();
const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const { STATUS_CODES } = require("http");

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
    conn.query(
      "SELECT * FROM comment WHERE board_id = ?;",
      board_id,
      function (err, result) {
        if (err) {
          res.status(StatusCodes.BAD_REQUEST).end();
          return;
        }
        res.status(StatusCodes.OK).json(result);
        return;
      }
    );
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

const deleteCommentData = (req, res) => {
  const { commentId } = req.params;
  const sql = "DELETE  FROM comment WHERE id = ?";

  conn.query(sql, commentId, function (err, result) {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }
    res.status(StatusCodes.CREATED).end();
  });
};

module.exports = { postCommentData, getCommentData, deleteCommentData };
