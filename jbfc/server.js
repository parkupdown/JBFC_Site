const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`);

const MongoClient = require(`mongodb`).MongoClient;
// mongodb와 연결
//서버 구축
let db;

MongoClient.connect(
  `mongodb+srv://tkdgk1996:FBG9w8AwL8J0p5Zy@cluster0.btnfifg.mongodb.net/?retryWrites=true&w=majority`,
  //여기에 연결하겠다.
  function (error, client) {
    if (error) {
      return console.log(error);
    }
    db = client.db(`UserInfi`);

    app.listen(8080, function () {
      console.log(`Hello`);
    });
  }
);

/*
app.use(bodyParser.urlencoded({ extended: true }));

app.get(`/`, function (req, res) {
  res.sendFile(__dirname + `/index.html`);
});

app.get(`/write`, function (요청, 응답) {
  응답.sendFile(__dirname + `/write.html`);
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
