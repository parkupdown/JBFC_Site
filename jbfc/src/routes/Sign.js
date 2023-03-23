import axios from "axios";

import { useEffect, useState } from "react";

function Sign() {
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState();

  const onSubmit = (event) => {
    event.preventDefault();
    setUserId(event.currentTarget[0].value);
    setPassword(event.currentTarget[1].value);
    axios.post(`http://localhost:8080/data`, { todo: "haha" });
  };
  return (
    <div>
      <h1>회원가입 페이지 입니다.</h1>
      <form onSubmit={onSubmit} name="id">
        <input placeholder="[팀이름] 선수이름 " />
        <input placeholder="Password" />
        <button>제출</button>
      </form>
    </div>
  );
}

export default Sign;
