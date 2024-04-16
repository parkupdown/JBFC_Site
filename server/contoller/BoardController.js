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

  let { nickname, title, content, time } = req.body;
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
    "INSERT INTO board (nickname,title,content,thumbnail,time) VALUE (?,?,?,?,?);";
  const value = [nickname, title, content, thumbnail, time];
  conn.query(sql, value, function (err, result) {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }
    //여기서 새로운 데이터를 보내줌

    const newData = {
      id: result.insertId,
      nickname: nickname,
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
  let { mine, detail, page } = req.query;
  let sql = "SELECT * FROM board ORDER BY id DESC LIMIT 1";
  let value;
  if (mine) {
    sql = "SELECT * FROM board WHERE nickname = ?;";
    value = mine;
  } else if (detail) {
    sql = "SELECT * FROM board WHERE id = ?;";
    value = detail;
  } else if (page) {
    sql = "SELECT * FROM board;";
  }
  conn.query(sql, value, function (err, result) {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }
    if (page) {
      page = page * 6;
      if (page > result.length) {
        res.status(StatusCodes.OK).json(false);
        return;
      }
      let boardData = result.slice(page, page + 6);
      res.status(StatusCodes.OK).json(boardData);
      return;
    }

    return res.status(StatusCodes.OK).json(result);

    // 이렇게하면 전체적으로 계속 불러와짐 그럼 ??
    // page에 맞게 가져오는거지
  });
};

const getLastestBoardData = (req, res) => {
  if (!isAuthorization(req, res)) {
    return;
  }

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

  const { nickname } = req.params;
  let { page } = req.query;
  page = parseInt(page);

  const sql = "SELECT * FROM board WHERE nickname = ?;";
  conn.query(sql, nickname, function (err, result) {
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

  let { deleteBoardIdArr } = req.params;
  deleteBoardIdArr = deleteBoardIdArr.split(`,`);
  const deleteSql = deleteBoardIdArr.map(
    (boardId) => `DELETE FROM board WHERE id =${Number(boardId)};`
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
