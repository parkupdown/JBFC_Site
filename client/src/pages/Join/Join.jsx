import joinValidation from "../../Validation/joinValidation";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { httpClient } from "../../api/http";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  button {
    width: 50vw;
    padding: 15px;
    border: 1px solid black;
    border-radius: 6px;
    margin-top: 10px;
    background-color: #1778f7;
    border: none;
    margin-left: 30px;
    color: white;
    font-size: 14px;
  }
`;

const Summary = styled.h3`
  opacity: 0.3;
  text-align: center;
`;

const InputWrapper = styled.div`
  padding: 10px;
  p {
    font-size: 17px;
    opacity: 0.5;
  }
  input {
    width: 50vw;
    padding: 20px;
    border: 1px solid black;
    border-radius: 6px;
    margin-top: 5px;
    background-color: #f0efef;
    border: none;
    font-size: 15px;
  }
`;

export default function Join() {
  const navigate = useNavigate();
  const goLogin = () => {
    navigate("/login");
  };

  const postApi = async (userId, userPassword, userNickname) => {
    try {
      await httpClient.post("http://localhost:3060/join", {
        userId: userId,
        userPassword: userPassword,
        userNickname: userNickname,
      });
    } catch (err) {
      alert("모든 데이터값을 입력해주세요.");
    }
  };

  const checkPasswordDubble = (firstPassword, secondPassword) => {
    if (firstPassword !== secondPassword) {
      throw new Error("비밀번호 확인이 일치하지 않습니다.");
    }
  };

  const submitUserInfo = async (e) => {
    e.preventDefault();
    let [userId, userPassword, userPasswordCheck, userNickname] = e.target;

    userId = userId.value;
    userPassword = userPassword.value;
    userPasswordCheck = userPasswordCheck.value;
    userNickname = userNickname.value;
    // 여기서 이걸 보낼 수 있게 되었다.
    try {
      checkPasswordDubble(userPassword, userPasswordCheck);
      await joinValidation(userId, userPassword, userNickname);
      await postApi(userId, userPassword, userNickname);
      alert("회원가입완료");
      goLogin();
    } catch (error) {
      alert(error);
    }
    //여기서 요청 중단되어야함
  };

  //validation 만들기.
  /*
  1. 공백없이
  2. 이미존재하는 ID여부
  3. 7글자이상
  */

  return (
    <Container>
      <Summary>
        스포츠가 주는 다양한 감정을
        <br />
        즐기며 살아갑시다
        <br />
      </Summary>

      <form onSubmit={(e) => submitUserInfo(e)}>
        <InputWrapper>
          <p>아이디</p>
          <input type="text" placeholder="아이디를 입력해주세요" />
        </InputWrapper>
        <InputWrapper>
          <p>비밀번호</p>
          <input type="password" placeholder="비밀번호를 입력해주세요" />
        </InputWrapper>
        <InputWrapper>
          <p>비밀번호 확인</p>
          <input
            type="password"
            placeholder="비밀번호를 한 번 더 입력해주세요"
          />
        </InputWrapper>
        <InputWrapper>
          <p>닉네임</p>
          <input type="text" placeholder="닉네임을 입력해주세요" />
        </InputWrapper>
        <button>제출</button>
      </form>
    </Container>
  );
}
