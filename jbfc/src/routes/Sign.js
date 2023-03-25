import axios from "axios";

import { useEffect, useState } from "react";

function Sign() {
  const [userId, setUserId] = useState(``);
  const [password, setPassword] = useState();
  let pass = false;

  const onCheck = (event) => {
    pass = false;
    event.preventDefault();
    setUserId(event.currentTarget[0].value);
    setPassword(event.currentTarget[1].value);
    event.currentTarget[0].value = ``;
    event.currentTarget[1].value = ``;
  };

  useEffect(() => {
    axios
      .post(`http://localhost:8080/sign`, {
        name: "짝발란스",
        useId: userId,
        usePass: password,
      })
      .then((res) => alert(res.data));

    pass = true;
  }, [userId]);

  const onSubmit = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:8080/sign/insertData`, {
      name: "짝발란스",
      useId: userId,
      usePass: password,
    });
    //이제 여기서 이동 usenavigator로!
  };

  return (
    <div>
      <h1>회원가입 페이지 입니다.</h1>
      <form onSubmit={onCheck} name="id">
        <input placeholder="[팀이름] 선수이름 " />
        <input placeholder="Password" />
        <button>체크!</button>
      </form>
      <form onSubmit={onSubmit} name="id" disabled={pass}>
        <button>제출</button>
      </form>
    </div>
  );
}

export default Sign;
