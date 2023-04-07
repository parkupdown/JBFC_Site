import axios from "axios";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "animate.css";
import swal from "sweetalert";

function Sign() {
  const [userId, setUserId] = useState(null);
  const [userPassword, setPassword] = useState(null);
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
        .then((res) =>
          userId === null
            ? null
            : swal("불가능한 계정입니다.", "중복된 ID가 있습니다.", "warning")
        );
    }, [userId, userPassword]);
  } catch (error) {
    throw new error();
  }
  const goToMain = () => {
    navigate(`/`);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:8080/sign/insertUserData`, {
        name: "짝발란스",
        userId: userId,
        userPassword: userPassword,
      })
      .then(goToMain())
      .then(alert(`회원가입이 완료되었습니다.`));
    //이제 여기서 이동 usenavigator로!
  };

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
    align-items: center;
    margin-bottom: 24px;
  `;

  // Define a styled component for the inputs
  const Input = styled.input`
    height: 40px;
    padding: 8px 20px;
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

  // Define a styled component for the link
  const Link = styled.a`
    display: flex;
    justify-content: center;
    color: #333;
    font-size: 16px;
    cursor: pointer;
  `;

  // Define the membership registration page component

  return (
    <Box>
      <div>
        <Title className="animate__animated animate__flipInX animate__slower">
          Membership Registration
        </Title>
        <Form onSubmit={onCheck}>
          <Input placeholder="ID" />
          <Input placeholder="Password" />
          <Button>Check</Button>
        </Form>
        <Form onSubmit={onSubmit}>
          <Button>Submit</Button>
        </Form>
        <Link style={{ textDecoration: "none" }} href={`/`}>
          Go to login
        </Link>
      </div>
    </Box>
  );
}

export default Sign;
