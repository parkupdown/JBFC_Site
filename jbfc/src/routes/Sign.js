import axios from "axios";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "animate.css";
import swal from "sweetalert";

function Sign() {
  const [teamName, setTeamName] = useState(null);
  const [nickName, setNickName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userPassword, setPassword] = useState(null);

  const navigate = useNavigate();

  let passCheckData = false;

  const passCheck = (teamName, nickName, userId, userPassword) => {
    swal(`성공`, `사용가능한 아이디입니다.`, `success`);

    const TeamName = document.getElementById("TeamName");
    const NickName = document.getElementById("NickName");
    const Id = document.getElementById("ID");
    const Password = document.getElementById("Password");

    TeamName.value = teamName;
    NickName.value = nickName;
    Id.value = userId;
    Password.value = userPassword;

    passCheckData = true;
  };

  const failCheck = (message) => {
    swal(`실패`, `${message}`, `warning`);
    passCheckData = false;
  };

  const onCheck = (event) => {
    event.preventDefault();
    setTeamName(event.target[0].value);
    setNickName(event.target[1].value);
    setUserId(event.target[2].value);
    setPassword(event.target[3].value);
  };

  useEffect(() => {
    axios
      .post(`http://localhost:8080/sign`, {
        userId: userId,
        nickName: nickName,
      })
      .then(function (res) {
        if (userId !== null) {
          res.data === true
            ? passCheck(teamName, nickName, userId, userPassword)
            : failCheck(res.data);
        }
      });
  }, [userId, nickName]);

  const goToMain = () => {
    navigate(`/`);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (userId === null || teamName === null || userPassword === null) {
      return swal(`실패`, `Check 버튼으로 중복검사 해주세요`, `warning`);
    }
    if (passCheckData === false) {
      return swal(
        `실패`,
        `사용이 불가능한 아이디입니다. 중복검사를 통해 다른 아이디를 찾아주세요`,
        `warning`
      );
    }
    axios
      .post(`http://localhost:8080/sign/insertUserData`, {
        teamName: teamName,
        nickName: nickName,
        userId: userId,
        userPassword: userPassword,
      })
      .then(goToMain())
      .then(swal(`성공`, `회원가입에 성공하셨습니다.`, "success"));

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
    margin-top: 20px;

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
          <Input
            id="TeamName"
            placeholder="TeamName ex) 짝발란스"
            maxLength={13}
          />
          <Input id="NickName" placeholder="NickName ex) 준맹" maxLength={10} />
          <Input id="ID" placeholder="ID" maxLength={11} />
          <Input id="Password" placeholder="Password" type="password" />
          <Button>Check</Button>
        </Form>
        <Form>
          <Button onClick={onSubmit} disabled={false}>
            Submit
          </Button>
        </Form>

        <Link style={{ textDecoration: "none" }} href={`/`}>
          Go to login
        </Link>
      </div>
    </Box>
  );
}

export default Sign;
