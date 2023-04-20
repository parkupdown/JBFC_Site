import axios from "axios";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "animate.css";
import swal from "sweetalert";
import SignValidation from "./SignValidation";
import api from "../api";

const Box = styled.div`
  background-color: #f2f2f2;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

const Input = styled.input`
  height: 40px;
  padding: 8px 20px;
  margin-bottom: 16px;
  border-radius: 4px;
  border: none;
  font-size: 16px;
`;

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

const InputDescription = styled.p`
  font-size: 11px;
  color: #666;
  margin-bottom: 8px;
`;

function Sign() {
  const navigate = useNavigate();
  const [savedUserId, setSavedUserId] = useState("");
  const [checkPass, setCheckPass] = useState(false);
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

    setCheckPass(true);
  };

  const Fail = (message) => {
    swal(`실패`, `${message}`, `warning`);

    passCheckData(false);
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

  const CheckValid = (teamName, nickName, userId, userPassword) => {
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

  const Validation = (teamName, nickName, userId, password) => {
    axios
      .post(`${api.BASE_URL}/sign`, {
        userId: userId,
        userPassword: password,
        nickName: nickName,
      })
      .then(function (res) {
        const checkValidData = CheckValid(teamName, nickName, userId, password);
        if (checkValidData !== true) {
          return Fail(checkValidData);
        } //타당성검사
        if (res.data !== true) {
          return Fail(res.data);
        } //중복검사
        setCheckPass(true);
        setSavedUserId(userId);

        return Pass(teamName, nickName, userId, password);
      });
  };

  const SetUserInput = (event) => {
    event.preventDefault();

    const teamName = event.target.parentElement[0].value;
    const nickName = event.target.parentElement[1].value;
    const userId = event.target.parentElement[2].value;
    const password = event.target.parentElement[3].value;
    console.log(userId);
    Validation(teamName, nickName, userId, password);
    //   Validation(teamName, nickName, userId, password);
  };

  const InsertUserData = (teamName, nickName, userId, userPassword) => {
    axios
      .post(`${api.BASE_URL}/sign/insertUserData`, {
        teamName: teamName,
        nickName: nickName,
        userId: userId,
        userPassword: userPassword,
      })
      .then(goToMain())
      .then(swal(`성공`, `회원가입에 성공하셨습니다.`, "success"));
  };

  const CheckPassValid = (teamName, nickName, userId, userPassword) => {
    if (
      userId === null ||
      nickName === null ||
      teamName === null ||
      userPassword === null
    ) {
      setCheckPass(false);
      return swal(`실패`, `Check 버튼으로 중복검사 해주세요`, `warning`);
    }
    if (passCheckData === false) {
      setCheckPass(false);
      return swal(`실패`, `로그인 타당성 검사 실패`, `warning`);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const teamName = event.target.parentElement[0].value;
    const nickName = event.target.parentElement[1].value;
    const userId = event.target.parentElement[2].value;
    const password = event.target.parentElement[3].value;
    CheckPassValid(teamName, nickName, userId, password);

    if (savedUserId === userId && checkPass === true) {
      InsertUserData(teamName, nickName, userId, password);
      return;
    }
    return swal(`실패`, `로그인 중복 검사를 통과해주세요.`, "warning");

    //이제 여기서 이동 usenavigator로!
  };

  // Define a styled component for the outer container

  return (
    <Box>
      <div>
        <Title className="animate__animated animate__flipInX animate__slower">
          Membership Registration
        </Title>
        <Form>
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
          <Button onClick={SetUserInput}>Check</Button>
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
