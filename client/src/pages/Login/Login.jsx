import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import gif from "../../assets/video/login.gif";
import { setToke } from "../../store/authStore";
import { setNickName } from "../../store/nickNameStore";

export default function Login() {
  const navigate = useNavigate();

  const goMain = () => {
    navigate("/");
  };

  const goJoin = () => {
    navigate("/join");
  };

  const initInput = (e) => {
    e.target[0].value = ``;
    e.target[1].value = ``;
  };

  const postApi = async (userId, userPassword) => {
    try {
      const response = await axios.post(
        "http://localhost:3060/login",
        {
          userId: userId,
          userPassword: userPassword,
        },
        { withCredentials: true }
      );
      // 결국 백엔드의 코드 구조에 따라 로그인을 검증하는 방식이 바뀌는거였다.
      // 백엔드에서 header에 authorization을 담는구조
      const data = response.data;
      setToke(data.token);
      setNickName(data.user_nickname);
      // 여기서 Localstorage에 저장
    } catch (err) {
      throw new Error("아이디와 비밀번호를 확인해주세요.");
    }
  };
  // trycatch사용해서 타당성검사
  const submitUserInfo = async (e) => {
    e.preventDefault();
    let [userId, userPassword] = e.target;
    userId = userId.value;
    userPassword = userPassword.value;
    initInput(e);
    try {
      await postApi(userId, userPassword);
      alert("로그인 성공");
      goMain();
    } catch (error) {
      alert(error);
    }
  };
  // 이제 여기사 서버로 해당 ID,PW에 대한 요청을 날림

  return (
    <Container>
      <ContainerInnerBox>
        <LoginBox>
          <h1>풋살하고 싶을 땐</h1>
          <h1>짝발란스</h1>
          <form onSubmit={submitUserInfo}>
            <input type="text" placeholder="ID" />
            <input type="password" placeholder="PASSWORD" />
            <button>로그인</button>
          </form>
        </LoginBox>
        <JoinBox>
          <h4 onClick={goJoin}>회원가입</h4>
        </JoinBox>
      </ContainerInnerBox>
      <VideoContainer>
        <Gif src={gif} loop="infinite"></Gif>
      </VideoContainer>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    position: relative;
    justify-content: center;
  }
`;

const ContainerInnerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60vw;
  height: 100vh;
  @media (max-width: 1100px) {
    width: 50%;
  }
`;

const VideoContainer = styled.div`
  height: 100vh;
  width: 40%;

  @media (max-width: 1100px) {
    width: 50%;
  }

  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
    opacity: 1;
  }
`;

const Gif = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const LoginBox = styled.div`
  @media (max-width: 768px) {
    color: white;
  }
  text-align: center;
  color: black;

  h1 {
    font-size: 28px;
    font-weight: 300;
  }

  form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  }

  input {
    margin-top: 5px;
    padding: 9px;
    font-size: 15px;
    border-radius: 5px;
    opacity: 0.5;
    border: 1px black dotted;
  }
  button {
    margin-top: 5px;
    padding: 5px;
    font-size: 15px;
    opacity: 0.9;
  }
`;
const JoinBox = styled.div`
  margin-top: 10px;
  color: black;
  @media (max-width: 768px) {
    color: white;
  }
  h4 {
    font-size: 20px;
    font-weight: 300;
  }
`;
