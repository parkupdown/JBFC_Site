import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthStore } from "@/store/authStore";
import { setNickName } from "@/store/nickNameStore";
import { httpClient } from "@/api/http";
import { useForm } from "react-hook-form";

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { isLogin, login, logout } = useAuthStore();

  const goMain = () => {
    navigate("/");
  };

  const goJoin = () => {
    navigate("/join");
  };

  const postApi = async (userId, userPassword) => {
    try {
      const response = await httpClient.post(
        "/login",
        {
          userId: userId,
          userPassword: userPassword,
        },
        { withCredentials: true }
      );
      const data = response.data;
      return data;
      // 여기서 Localstorage에 저장
    } catch (err) {
      throw new Error("아이디와 비밀번호를 확인해주세요.");
    }
  };

  const submitUserInfo = async (data) => {
    const { id, password } = data;
    try {
      const data = await postApi(id, password);
      login(data.token);
      setNickName(data.user_nickname);
      alert("로그인성공");
      goMain();
    } catch (error) {
      alert(error);
    }
  };

  // 이제 여기사 서버로 해당 ID,PW에 대한 요청을 날림
  // state가 변경되면 컴포넌트 내부에 모든 코드가 다시 실행됨
  return (
    <Container>
      <LoginBox>
        <div className="titleBox">
          <h1>풋살하고 싶을 땐</h1>
          <h1>짝발란스</h1>
        </div>

        <form onSubmit={handleSubmit(submitUserInfo)}>
          <input
            type="text"
            placeholder="ID"
            {...register("id", { required: true })}
          />
          <input
            type="password"
            placeholder="PASSWORD"
            {...register("password", { required: true })}
          />
          <button type="submit">로그인</button>
          <button type="button" onClick={goJoin}>
            회원가입
          </button>
        </form>
      </LoginBox>
    </Container>
  );
}
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginBox = styled.div`
  text-align: center;
  color: #516fd4;
  .titleBox {
    @media (max-width: 800px) {
      padding: 10px 40px;
    }
    background-color: #fbfcff;
    padding: 30px 80px;
    border-radius: 20px;
    width: 100%;
  }
  h1 {
    font-size: 42px;
    font-weight: 500;

    @media (max-width: 800px) {
      font-size: 28px;
      font-weight: 300;
      opacity: 0.9;
    }
  }

  form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  }

  input {
    margin-top: 20px;
    padding: 12px;
    font-size: 20px;
    border-radius: 5px;
    background-color: #fbfcff;
    border: 0.5px solid #eeeeee;
    color: #516fd4;
    @media (max-width: 800px) {
      font-size: 15px;
      margin-top: 5px;
    }
  }
  button {
    margin-top: 20px;
    padding: 5px;
    font-size: 20px;
    border: 0.5px solid #eeeeee;
    color: #516fd4;
    border-radius: 5px;
    @media (max-width: 800px) {
      font-size: 15px;
      margin-top: 5px;
    }
  }
`;
const JoinBox = styled.div`
  margin-top: 10px;
  color: black;

  @media (max-width: 768px) {
    color: white;
  }
  button {
    font-size: 20px;
    font-weight: 300;
    background-color: #fbfcff;
    color: #516fd4;
    border: 0.8px solid #eeeeee;
    padding: 5px;
    border-radius: 10px;
    @media (max-width: 800px) {
      font-size: 15px;
      margin-top: 5px;
    }
  }
`;
