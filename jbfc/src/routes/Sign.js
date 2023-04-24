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
  // 로그인이 Pass됐는지를 변수로 저장
  let passCheckData = false;

  // 회원가입의 검사가 통과되면 아래의 함수를 실행할 수 있도록한다.
  // form의 각 입력값을 받아와 .value에 저장한다.
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

  // 회원가입의 검사가 실패하면 아래의 함수를 실행할 수 있도록한다.
  const Fail = (message) => {
    swal(`실패`, `${message}`, `warning`);

    passCheckData(false);
  };

  // 타당성 검사 3가지
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

  //체크 한 타당성검사의 결과를 return하는 함수
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

  // 유저가 입력한 입력값을 가지고 중복검사와 타당성검사를 실행하여 Pass함수 또는 Fail함수를 실행하는 함수
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

  // Validation을 실행하는함수
  const runValidation = (event) => {
    event.preventDefault();

    const teamName = event.target.parentElement[0].value;
    const nickName = event.target.parentElement[1].value;
    const userId = event.target.parentElement[2].value;
    const password = event.target.parentElement[3].value;
    console.log(userId);
    Validation(teamName, nickName, userId, password);
    //   Validation(teamName, nickName, userId, password);
  };

  // DB에 유저의 정보를 저장하고 성공메세지와 함께 Home컴포넌트로 이동시켜주는 함수
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

  // 타당성검사를 통과했는지를 확인하는 함수
  const passOrNotCheck = (teamName, nickName, userId, userPassword) => {
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

  // 회원가입 제출 버튼을 눌렀을 때 체크가 통과되었는지를 확인하고 통과되었다면 DB에 저장시켜주는 함수를 실행하는함수
  const onSubmit = (event) => {
    event.preventDefault();
    const teamName = event.target.parentElement[0].value;
    const nickName = event.target.parentElement[1].value;
    const userId = event.target.parentElement[2].value;
    const password = event.target.parentElement[3].value;
    passOrNotCheck(teamName, nickName, userId, password);

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
          <Button onClick={runValidation}>Check</Button>
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
