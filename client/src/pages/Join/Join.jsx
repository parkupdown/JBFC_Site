import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { inputProps } from "@/constants/input.contant";
import { checkDuplication } from "@/Validation/joinValidation";
import axios from "axios";
import { Error } from "../../components/common/Error";

export default function Join() {
  const navigate = useNavigate();
  const goLogin = () => {
    navigate("/login");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const postApi = async (userId, userPassword, userNickname) => {
    try {
      await axios.post("http://localhost:3060/join", {
        userId: userId,
        userPassword: userPassword,
        userNickname: userNickname,
      });
    } catch (err) {
      alert("모든 데이터값을 입력해주세요.");
    }
  };

  const checkPassword = (password, passwordRe) => {
    if (password !== passwordRe) {
      throw new Error("비밀번호 확인이 일치하지 않습니다.");
    }
  };

  const onSubmit = async (data) => {
    const { id, password, passwordRe, nickName } = data;
    try {
      checkPassword(password, passwordRe);
      await checkDuplication(id, "ID");
      await checkDuplication(nickName, "NICKNAME");
      postApi(id, password, nickName);
      alert("회원가입완료");
      goLogin();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container>
      <Summary>
        스포츠가 주는 다양한 감정을
        <br />
        즐기며 살아갑시다
        <br />
      </Summary>
      <form onSubmit={handleSubmit(onSubmit)}>
        {inputProps(errors).map((item) => (
          <>
            <InputWrapper>
              <p>{item.name}</p>
              <input
                type={
                  item.id === "password" || item.id === "passwordRe"
                    ? "password"
                    : "text"
                }
                {...register(item.id, {
                  required: {
                    value: true,
                    message: `${item.name}을(를) 입력해주세요.`,
                  },
                  maxLength: {
                    value: item.max,
                    message: `최대${item.max}글자까지 입력이 가능합니다.`,
                  },
                  minLength: {
                    value: item.min,
                    message: `최소${item.min}글자를 입력해주세요.`,
                  },
                })}
              />
            </InputWrapper>
            {item.error && <Error message={item.error.message} />}
          </>
        ))}
      </form>
      <button type="submit">제출</button>
      <button onClick={goLogin}>로그인</button>
    </Container>
  );
}
const Container = styled.div`
  height: 130vh;
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
    text-align: center;
    background-color: #516fd4;
    border: 1px solid #eeeeee;
    color: white;
    font-size: 16px;
    margin-left: 10px;
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
    background-color: #fbfcff;
    border: 0.5px solid #eeeeee;
    font-size: 15px;
    ::placeholder {
    }
  }
`;
