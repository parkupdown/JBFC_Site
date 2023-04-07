import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styled, { keyframes } from "styled-components";
import "animate.css";

function Login() {
  const [userId, setUserId] = useState(null);
  const [userPassword, setUserPass] = useState(null);
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
          if (res.data.pass === true) {
            localStorage.setItem(`userId`, res.data.userInfo.아이디);
            goToHome();
            return;
          }
          return userId === null ? null : alert(res.data.message);
        });
    }, [userId, userPassword]);
  } catch (error) {
    throw new Error();
  }

  // Define a styled component for the outer container
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

  return (
    <Box>
      <div>
        <Title className="animate__animated animate__flipInX animate__slower">
          JJack balance
        </Title>
        <Form onSubmit={onSubmit}>
          <Input placeholder="ID" />
          <Input placeholder="PW" />
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
