import { useAuthStore } from "../../store/authStore";
import logo from "../../assets/logo/logo.png";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export function Logo() {
  const { isLogin, login, logout } = useAuthStore();
  const navigator = useNavigate();
  const goHome = () => isLogin && navigator("/");
  return (
    <ImgBox>
      <img src={logo} onClick={goHome} />
    </ImgBox>
  );
}
const ImgBox = styled.div`
  padding: 10px 0;
  width: 100vw;
  margin-bottom: 3px;
  display: flex;
  justify-content: center;
  img {
    width: 90%;
    height: 90%;
    object-fit: cover;
  }
`;
