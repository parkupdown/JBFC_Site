import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [userId, setUserId] = useState(``);
  const [userPassword, setUserPass] = useState(``);
  const navigate = useNavigate();

  const goToHome = () => {
    navigate(`/home`);
  };

  if (localStorage.getItem(`userId`) !== null) {
    goToHome();
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setUserId(event.currentTarget[0].value);
    setUserPass(event.currentTarget[1].value);
    //이제 여기서 이동 usenavigator로!
  };
  try {
    useEffect(() => {
      axios
        .post(
          `http://localhost:8080/login`,
          {
            userId: userId,
            userPassword: userPassword,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          if (res.data.pass === true) {
            localStorage.setItem(`userId`, res.data.userInfo.아이디);
            goToHome();
            return;
          }
          alert(res.data.message);
        });
    }, [userId, userPassword]);
  } catch (error) {
    throw new Error();
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input placeholder="ID를 입력해주세요 " />
        <input placeholder="PASSWORD를 입력해주세요" />
        <button>Login</button>
      </form>
      <Link to={`/sign`}>
        <h3>아이디가 없으신가요?</h3>
      </Link>
    </div>
  );
}

export default Login;
