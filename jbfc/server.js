const express = require(`express`);
const cors = require(`cors`);
const app = express();
const MongoClient = require(`mongodb`).MongoClient;
//login
const LocalStrategy = require(`passport-local`).Strategy;
const session = require(`express-session`);
const passport = require(`passport`);
const bodyParser = require(`body-parser`);

app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));

//서버연결

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: `SecretupdownPark`,
    resave: true,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

let db;
//mongodb+srv://tkdgk1996:<password>@cluster0.btnfifg.mongodb.net/?retryWrites=true&w=majority
MongoClient.connect(
  `mongodb+srv://tkdgk1996:FBG9w8AwL8J0p5Zy@cluster0.btnfifg.mongodb.net/?retryWrites=true&w=majority`,
  { useUnifiedTopology: true },
  //여기에 연결하겠다.
  function (error, client) {
    if (error) {
      return console.log(error);
    }
    db = client.db(`JB`);

    app.listen(8080, function () {
      console.log(`Hello`);
    });
  }
);

const checkId = async (req, res) => {
  const { userId } = req.body;
  const user = await db.collection(`UserInfo`).findOne({ 아이디: userId });
  if (user === null) {
    res.send(`사용이 가능합니다.`);
  } else {
    res.send(`사용이 불가능합니다.`);
  }
};

const insertData = (req, res) => {
  db.collection(`UserInfo`).insertOne(
    {
      name: "짝발란스",
      아이디: req.body.userId,
      비밀번호: req.body.userPassword,
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

app.post(`/sign/insertData`, (req, res) => {
  insertData(req, res);
});

app.post(
  `/login`,
  passport.authenticate(`local`, { failureRedirect: `/fail` }),
  (req, res, next) => {
    res.redirect(`/`);
  }
);
app.get(`/fail`, (req, res) => {
  res.send({ message: `로그인 정보가 일치하지 않습니다!`, pass: false });
});

app.get(`/`, (req, res) => {
  res.send({ message: "로그인에 성공하셨습니다!", pass: true });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "userId",
      passwordField: "userPassword",
      session: true,
      passReqToCallback: false,
    },
    function (입력한아이디, 입력한비번, done) {
      console.log(입력한아이디, 입력한비번);
      console.log(입력한아이디);
      db.collection("UserInfo").findOne(
        { 아이디: 입력한아이디 },
        function (에러, 결과) {
          if (에러) return done(에러);

          if (!결과)
            return done(null, false, { message: "존재하지않는 아이디요" });
          if (입력한비번 == 결과.비밀번호) {
            //결과.pw => db에 저장된 pw
            return done(null, 결과);
            //done은 서버에러를넣는곳
          } else {
            return done(null, false, { message: "비번틀렸어요" });
          }
        }
      );
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log(user);
  console.log(user._id);
  done(null, user._id);
});
//id를 이용해서 세션을 저장시키는 코드 (로그인 성공시 발동)
passport.deserializeUser(function (user, done) {
  done(null, {});
});
//나중에 쓸거임 (마이페이지 접속시 발동)

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
      아이디: req.body.useId,
      비밀번호: req.body.usePass,
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
