const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const { decodeJwt } = require("./DecodedJwt");
const jwt = require("jsonwebtoken");
const { isAuthorization } = require("./CheckAuthorization");

const insertBoardData = (req, res) => {
  if (!isAuthorization(req, res)) {
    return;
  }

  let { userId, title, content, time } = req.body;
  let image = req.file;
  let thumbnail;
  if (image !== undefined) {
    thumbnail = image.filename;
  } else if (image === undefined) {
    thumbnail = null;
  }

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
    //여기서 새로운 데이터를 보내줌

    const newData = {
      id: result.insertId,
      user_id: userId,
      title: title,
      content: content,
      thumbnail: thumbnail,
      time: time,
    };
    res.status(StatusCodes.OK).json(newData);
    return;
  });
};

const getBoardData = (req, res) => {
  if (!isAuthorization(req, res)) {
    return;
  }

  const sql = "SELECT * FROM board;";
  let { page } = req.query;
  page = parseInt(page);

  conn.query(sql, function (err, result) {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }
    page = page * 6;
    if (page > result.length) {
      res.status(StatusCodes.OK).json(false);
      return;
    }

    let boardData = result.slice(page, page + 6);
    // 이렇게하면 전체적으로 계속 불러와짐 그럼 ??
    // page에 맞게 가져오는거지

    res.status(StatusCodes.OK).json(boardData);
  });
};

const getLastestBoardData = (req, res) => {
  if (!isAuthorization(req, res)) {
    return;
  }
  console.log(isAuthorization(req, res));

  const sql = "SELECT * FROM board ORDER BY id DESC LIMIT 1;";
  conn.query(sql, function (err, result) {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }
    res.status(StatusCodes.OK).json(result);
  });
};

const getBoardDetailData = (req, res) => {
  if (!isAuthorization(req, res)) {
    return;
  }

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

const getMyBoardData = (req, res) => {
  if (!isAuthorization(req, res)) {
    return;
  }

  const { userId } = req.params;
  let { page } = req.query;
  page = parseInt(page);

  const sql = "SELECT * FROM board WHERE user_id = ?;";
  conn.query(sql, userId, function (err, result) {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }
    page = page * 6;
    if (page > result.length) {
      res.status(StatusCodes.OK).json(false);
      return;
    }
    let boardData = result.slice(page, page + 6);
    // 이렇게하면 전체적으로 계속 불러와짐 그럼 ??
    // page에 맞게 가져오는거지

    res.status(StatusCodes.OK).json(boardData);
  });
};

const deleteBoardData = (req, res) => {
  if (!isAuthorization(req, res)) {
    return;
  }

  let { removeBoardIdArr } = req.body;
  const deleteSql = removeBoardIdArr.map(
    (boardId) => `DELETE FROM board WHERE id =${boardId};`
  );

  deleteSql.forEach((sql) => {
    conn.query(sql, function (err, result) {
      if (err) {
        res.status(StatusCodes.BAD_REQUEST).end();
        return;
      }
    });
  });
  res.status(StatusCodes.CREATED).send(true);
};

module.exports = {
  insertBoardData,
  getBoardData,
  getBoardDetailData,
  getLastestBoardData,
  getMyBoardData,
  deleteBoardData,
};
