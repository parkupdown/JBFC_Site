const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const insertBoardData = (req, res) => {
  let { userId, title, content, time } = req.body;
  let image = req.file;
  let thumbnail;
  if (image !== undefined) {
    thumbnail = image.filename;
  } else if (image === undefined) {
    thumbnail = null;
  }

  console.log(userId, title, content, image, time);
  // 여기서 req.file의 name을 db에 저장하는거지
  // text, userId까지!
  const sql =
    "INSERT INTO board (user_id,title,content,thumbnail,time) VALUE (?,?,?,?,?);";
  const value = [userId, title, content, thumbnail, time];
  conn.query(sql, value, function (err, result) {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }
    res.status(StatusCodes.CREATED).end();
  });

  res.send(true);
};

const getBoardData = (req, res) => {
  const sql = "SELECT * FROM board;";
  let { limit } = req.query;
  limit = parseInt(limit);
  conn.query(sql, function (err, result) {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }
    limit = limit * 6;
    if (limit > result.length) {
      res.status(StatusCodes.OK).json(false);
      return;
    }
    let boardData = result.slice(limit, limit + 6);
    // 이렇게하면 전체적으로 계속 불러와짐 그럼 ??
    // page에 맞게 가져오는거지

    res.status(StatusCodes.OK).json(boardData);
  });
};

const getBoardDetailData = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM board WHERE id = ?;";
  conn.query(sql, id, function (err, result) {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }
    res.status(StatusCodes.OK).json(result);
  });
};

module.exports = { insertBoardData, getBoardData, getBoardDetailData };
