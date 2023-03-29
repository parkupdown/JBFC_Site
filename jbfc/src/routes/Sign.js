import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Sign() {
  const [userId, setUserId] = useState(``);
  const [userPassword, setPassword] = useState(``);
  const navigate = useNavigate();

  const onCheck = (event) => {
    event.preventDefault();
    setUserId(event.currentTarget[0].value);
    setPassword(event.currentTarget[1].value);
  };

  try {
    useEffect(() => {
      axios
        .post(`http://localhost:8080/sign`, {
          name: "짝발란스",
          userId: userId,
          userPassword: userPassword,
        })
        .then((res) => alert(res.data));
    }, [userId]);
  } catch (error) {
    throw new error();
  }

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:8080/sign/insertData`, {
        name: "짝발란스",
        userId: userId,
        userPass: userPassword,
      })
      .then(goToMain())
      .then(alert(`회원가입이 완료되었습니다.`));
    //이제 여기서 이동 usenavigator로!
  };

  const goToMain = () => {
    navigate(`/`);
  };
  return (
    <div>
      <h1>회원가입 페이지 입니다.</h1>
      <form onSubmit={onCheck}>
        <input placeholder="[팀이름] 선수이름 " />
        <input placeholder="Password" />
        <button>체크!</button>
      </form>
      <form onSubmit={onSubmit}>
        <button>제출</button>
      </form>
    </div>
  );
}

export default Sign;
