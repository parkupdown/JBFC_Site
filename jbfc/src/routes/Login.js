import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styled, { keyframes } from "styled-components";
import "animate.css";
import swal from "sweetalert";

const Box = styled.div`
  background-color: #f2f2f2;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Define a styled component for the title
const Title = styled.h1`
  font-size: 48px;
  color: #333;
  text-align: center;
  margin-bottom: 24px;
`;

// Define a styled component for the form
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

// Define a styled component for the inputs
const Input = styled.input`
  height: 40px;
  padding: 8px 16px;
  margin-bottom: 16px;
  border-radius: 4px;
  border: none;
  font-size: 16px;
`;

// Define a styled component for the button
const Button = styled.button`
  height: 40px;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: #03a9f4;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0288d1;
  }
`;

const Sign = styled.h4`
  margin-top: 20px;
  color: #333;
  font-size: 16px;
  cursor: pointer;
`;

function Login() {
  const navigate = useNavigate();
  const CheckLoggedIn = () => {
    if (localStorage.getItem(`userId`) !== null) {
      navigate(`/home`);
    }
  };
  CheckLoggedIn();
  const goToHome = () => {
    navigate(`/home`);
  };

  const SetLocalStorage = (userInfomation) => {
    localStorage.setItem(`userId`, userInfomation);
    goToHome();
  };

  const CheckIDPASS = (userId, userPassword) => {
    axios
      .post(
        `https://jjb.jjackbalance.info/login`,
        {
          userId: userId,
          userPassword: userPassword,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data === ``) {
          return swal(
            "로그인에 실패하셨습니다",
            "ID와 PW를 확인해주세요",
            "warning"
          );
        }
        const userInfomation = `[${res.data.teamName}] ${res.data.nickName}`;
        SetLocalStorage(userInfomation);
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const userId = event.currentTarget[0].value;
    const userPass = event.currentTarget[1].value;
    CheckIDPASS(userId, userPass);
  };

  //set안됐는데

  // Define a styled component for the outer container

  return (
    <Box>
      <div>
        <Title className="animate__animated animate__flipInX animate__slower">
          JJack balance
        </Title>
        <Form onSubmit={onSubmit}>
          <Input placeholder="ID" />
          <Input type="password" placeholder="PW" />
          <Button>Login</Button>
        </Form>
        <Link style={{ textDecoration: "none" }} to={`/sign`}>
          <Sign> You Don't Have Any ID?</Sign>
        </Link>
      </div>
    </Box>
  );
}

export default Login;
