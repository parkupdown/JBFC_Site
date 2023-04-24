const express = require(`express`);
const cors = require(`cors`);
const app = express();
const MongoClient = require(`mongodb`).MongoClient;
const http = require(`http`).createServer(app);
const { Server } = require(`socket.io`);
const io = new Server(http, {
  cors: {
    origin: "*",
  },
}); //login
const LocalStrategy = require(`passport-local`).Strategy;
const session = require(`express-session`);
const bodyParser = require(`body-parser`);
const ObjectId = require(`mongodb`).ObjectID;
require(`dotenv`).config();
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

//서버연결

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
  })
);

let db;
//mongodb+srv://tkdgk1996:<password>@cluster0.btnfifg.mongodb.net/?retryWrites=true&w=majority
MongoClient.connect(process.env.DB_URL, { useUnifiedTopology: true })
  .then((client) => {
    db = client.db(`JB`);

    http.listen(process.env.SERVER_PORT, function () {
      console.log(`Listening on 8080`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

io.on("connection", (socket) => {
  socket.on(`send_message_notice`, (data) => {
    //유저가 메세지를 보내면
    io.emit(`broadcast_notice`, data);
    //모든사람에게 뿌려주세요.
  });
  socket.on(`send_message_free`, (data) => {
    io.emit(`broadcast_free`, data);
  });
});

const checkId = async (req, res) => {
  const user = await db
    .collection(`UserInfo`)
    .findOne({ userId: req.body.userId });
  const nick = await db
    .collection(`UserInfo`)
    .findOne({ nickName: req.body.nickName });
  if (user === null && nick === null) {
    res.send(true);
  } else if (nick !== null) {
    res.send(`중복 닉네임이 존재합니다.`);
  } else {
    res.send(`중복 ID가 존재합니다.`);
  }
};

const insertUserData = (req, res) => {
  db.collection(`UserInfo`).insertOne(
    {
      teamName: req.body.teamName,
      nickName: req.body.nickName,
      userId: req.body.userId,
      userPassword: req.body.userPassword,
    },
    function (error, res) {
      if (error) {
        return console.log(error);
      }
    }
  );
};

app.post(`/sign`, (req, res) => {
  checkId(req, res);
});

app.post(`/sign/insertUserData`, (req, res) => {
  insertUserData(req, res);
});
app.post(`/boardDetail`, (req, res) => {
  db.collection("Board").findOne(
    { _id: ObjectId(req.body.userId) },
    //string 타입을 ObjectId타입으로 변환 후 비교함
    function (error, result) {
      res.send(result);
    }
  );
});

app.post(`/login`, async (req, res, next) => {
  const checkLogin = await db
    .collection("UserInfo")
    .findOne(
      { userId: req.body.userId, userPassword: req.body.userPassword },
      (error, result) => {
        res.send(result);
      }
    );
});
app.get(`/fail`, (req, res) => {
  res.send({ message: `로그인 정보가 일치하지 않습니다!`, pass: false });
});

function LoginCheck(req, res, next) {
  if (req.user) {
    next();
    //통과
  } else {
    res.send(`로그인안하셨습니다.`);
  }
}

app.get(`/`, LoginCheck, (req, res) => {
  res.send({
    message: "로그인에 성공하셨습니다!",
    pass: true,
    userInfo: req.user,
    //deserializeUser에 의해 req.user를 보낼수있음
  });
});

const insertBoardData = async (req, res) => {
  db.collection(`Board`).insertOne(
    {
      userId: req.body.userId,
      title: req.body.title,
      contents: req.body.contents,
      nowTime: req.body.nowTime,
      category: req.body.category,
    },
    function (error, Result) {
      if (error) {
        return console.log(error);
      }
    }
  );
};

app.post(`/board/write`, (req, res) => {
  insertBoardData(req, res);
});

app.post(`/board`, (req, res) => {
  db.collection("Board")
    .find({ category: req.body.category })
    .toArray(function (error, result) {
      res.send(result);
    });
});

app.post(`/boardDetail`, (req, res) => {
  db.collection("Board").findOne(
    { _id: ObjectId(req.body.userId) },
    //string 타입을 ObjectId타입으로 변환 후 비교함
    function (error, result) {
      res.send(result);
    }
  );
});

app.post(`/board/mine`, (req, res) => {
  db.collection("Board")
    .find({ userId: req.body.userId })
    .toArray(function (error, result) {
      res.send(result);
    });
});

app.delete(`/board/mine/delete`, (req, res) => {
  db.collection(`Board`).deleteOne(
    { _id: ObjectId(req.body.userId) },
    function (error, result) {
      res.status(200).send({ message: `삭제완료` });
    }
  );
});

app.delete(`/board/mine/comment/delete`, (req, res) => {
  const removeTarget = {
    _id: ObjectId(req.body._id),
    userName: req.body.userName,
  };

  db.collection(`Comments`).deleteOne(removeTarget, function (error, result) {
    res.status(200).send({ message: `삭제완료` });
  });
});

const insertBoardCommentsData = (req, res) => {
  db.collection(`Comments`).insertOne(
    {
      userId: req.body.userId,
      userName: req.body.userName,
      comment: req.body.comment,
      time: req.body.time,
    },
    function (error, Result) {
      if (error) {
        return console.log(error);
      }
      db.collection("Comments")
        .find({ userId: req.body.userId })
        .toArray(function (error, result) {
          res.send(result);
        });
    }
  );
};

const findBoardCommentsData = (req, res) => {
  db.collection(`Comments`)
    .find({ userId: req.body.userId })
    .toArray(function (error, result) {
      res.send(result);
    });
};

app.post(`/board/comment`, (req, res) => {
  insertBoardCommentsData(req, res);
});

app.post(`/board/comment/get`, (req, res) => {
  findBoardCommentsData(req, res);
});

const InsertChatData = (req, res) => {
  db.collection(`Chat`).insertOne(
    {
      userId: req.body.userId,
      message: req.body.message,
      category: req.body.category,
    },
    function (error, Result) {
      if (error) {
        return console.log(error);
      }
      db.collection("Chat")
        .find({ category: req.body.category })
        .toArray(function (error, result) {
          res.send(result);
        });
    }
  );
};
app.post(`/chat/insertOne`, (req, res) => {
  InsertChatData(req, res);
});
app.post(`/chat`, (req, res) => {
  db.collection("Chat")
    .find({ category: req.body.category })
    .toArray((error, result) => {
      res.send(result);
    });
});

//여기에 이제 추가 넣으면됨
/* .toArray(function (error, res) {
      console.log(res); // 가져오기성공
      console.log(res[0]);
    });
    */
//findOne은 첫번째데이터만가지고옴
/*db.collection(`UserInfo`).insertOne(
    {
      name: req.body.name,
   req.body.useId,
      userPassword: req.body.usePass,
    },
    function (error, res) {
      if (error) {
        return console.log(error);
      }
    }
  );
});

app.get(`/api/todo`, function (req, res) {
  res.json(todoList);
});

/*
app.use(bodyParser.urlencoded({ extended: true }));

app.get(`/`, function (req, res) {
  res.sendFile(__dirname + `/index.html`);
});

app.get(`/write`, function (요청, 응답) {
  응답.sendFile(__dirname + `/write.html`);
});
app.get(`/data`, function (req, res) {
  db.collection(`UserInfo`)
    .find()
    .toArray(function (error, result) {
      res.json(result);
    });
});

app.post(`/add`, function (요청, 응답) {
  응답.send(`전송완료`);
  db.collection(`counter`).findOne(
    { name: `게시물개수` },
    function (error, res) {
      console.log(res.totalPost);
    }
  );
  db.collection(`post`).insertOne(
    { 제목: 요청.body.title, 날짜: 요청.body.date },
    function (에러, 결과) {
      console.log(`저장완료`);
      db.collection(`counter`).updateOne(
        { name: `게시물개수` },
        { $inc: { totalPost: 1 } },
        function (에러, 결과) {
          if (에러) {
            return console.log(에러);
          }
          //업데이트끝난 후 뭔가 하고싶으면 이렇게
        }
      );
      //db데이터 수정해주세요~
      //{}=> 어떤 데이터를 수정할지 {}=> 수정값
    }
  );
  console.log(요청.body);
});

app.get(`/list`, function (req, res) {
  db.collection(`post`)
    .find()
    .toArray(function (error, result) {
      console.log(result);
    });
});
*/
