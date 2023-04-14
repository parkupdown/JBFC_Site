import axios from "axios";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "animate.css";
import swal from "sweetalert";
import SignValidation from "./SignValidation";

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

// Define the membership registration page component

const InputDescription = styled.p`
  font-size: 11px;
  color: #666;
  margin-bottom: 8px;
`;

function Sign() {
  const [teamName, setTeamName] = useState(null);
  const [nickName, setNickName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userPassword, setPassword] = useState(null);
  const navigate = useNavigate();
  const goToMain = () => {
    navigate(`/`);
  };
  let passCheckData = false;

  const Pass = (teamName, nickName, userId, userPassword) => {
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

  const Fail = (message) => {
    swal(`실패`, `${message}`, `warning`);

    const TeamName = document.getElementById("TeamName");
    const NickName = document.getElementById("NickName");
    const Id = document.getElementById("ID");
    const Password = document.getElementById("Password");

    TeamName.value = teamName;
    NickName.value = nickName;
    Id.value = userId;
    Password.value = userPassword;

    passCheckData = false;
  };

  const SetUserInput = (event) => {
    event.preventDefault();
    const teamName = event.target[0].value;
    const nickName = event.target[1].value;
    const userId = event.target[2].value;
    const password = event.target[3].value;
    setTeamName(teamName);
    setNickName(nickName);
    setUserId(userId);
    setPassword(password);
  };

  const CheckInputNullBlankSpecial = (passNull, passBlank, passSpecial) => {
    if (passNull !== true) {
      return passNull;
    }
    if (passBlank !== true) {
      return passBlank;
    }

    if (passSpecial !== true) {
      return passSpecial;
    }
    return true;
  };

  const CheckValid = () => {
    const signValidation = new SignValidation(
      teamName,
      nickName,
      userId,
      userPassword
    );
    const passNull = signValidation.CheckNull();
    const passBlank = signValidation.CheckBlank();
    const passSpecial = signValidation.CheckSpecial();

    return CheckInputNullBlankSpecial(passNull, passBlank, passSpecial);
  };

  const CheckPassValid = () => {
    if (
      userId === null ||
      nickName === null ||
      teamName === null ||
      userPassword === null
    ) {
      return swal(`실패`, `Check 버튼으로 중복검사 해주세요`, `warning`);
    }
    if (passCheckData === false) {
      return swal(`실패`, `로그인 타당성 검사 실패`, `warning`);
    }
  };

  useEffect(() => {
    axios
      .post(`http://localhost:8080/sign`, {
        userId: userId,
        nickName: nickName,
      })
      .then(function (res) {
        if (userId !== null) {
          const checkValidData = CheckValid();
          if (checkValidData !== true) {
            return Fail(checkValidData);
          } //타당성검사
          if (res.data !== true) {
            return Fail(res.data);
          } //중복검사
          return Pass(teamName, nickName, userId, userPassword);
        }
      });
  }, [teamName, nickName, userId, userPassword]);

  const onSubmit = (event) => {
    event.preventDefault();
    CheckPassValid();

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

  return (
    <Box>
      <div>
        <Title className="animate__animated animate__flipInX animate__slower">
          Membership Registration
        </Title>
        <Form onSubmit={SetUserInput}>
          <Input
            id="TeamName"
            placeholder="팀네임 ex) 짝발란스"
            maxLength={13}
          />
          <Input id="NickName" placeholder="닉네임 ex) 준맹" maxLength={10} />

          <InputDescription>당신의 계정 닉네임이 될거에요.</InputDescription>
          <InputDescription>특수문자,공백 없이 작성해주세요.</InputDescription>
          <Input id="ID" placeholder="ID" maxLength={11} />
          <InputDescription>
            특수문자, 공백 없이 작성해주세용용
          </InputDescription>

          <Input id="Password" placeholder="Password" type="password" />
          <Button>Check</Button>
        </Form>
        <Form>
          <Button onClick={onSubmit} disabled={false}>
            Submit
          </Button>
        </Form>
        <Link
          style={{
            display: "flex",
            justifyContent: "center",
            color: "#333",
            fontSize: "16px",
            textDecoration: "none",
          }}
          to={`/`}
        >
          Go to login
        </Link>
      </div>
    </Box>
  );
}

export default Sign;
