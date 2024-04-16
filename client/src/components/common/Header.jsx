import styled from "styled-components";
import { ToggleSwitch } from "../header/ToggleSwitch";
import { Auth } from "../header/Auth";
import { GoBack } from "../header/Goback";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { isLogin, login, logout } = useAuthStore();
  const navigator = useNavigate();
  const goHome = () => isLogin && navigator("/");
  return (
    <Container>
      <div className="logo" onClick={goHome}>
        <img className="logoImg" src="/Team/jjackicon.png" />
        <span>짝발란스</span>
      </div>
      <HeaderStyled>
        <div className="option">
          <GoBack />
          <Auth />
          <ToggleSwitch />
        </div>
      </HeaderStyled>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-evenly;
  .logo {
    display: flex;
    align-items: center;
    justify-content: left;
    padding: 10px 20px;
    .logoImg {
      @media (max-width: 800px) {
        width: 50px;
        height: 50px;
      }
      width: 80px;
      height: 80px;
    }
    span {
      font-weight: 500;
      &:hover {
        ${({ theme }) => theme.color.positive}
      }
      @media (max-width: 800px) {
        font-size: 17px;
      }
      font-size: 32px;
    }
  }
`;

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-around;

  .option {
    display: flex;
    align-items: center;
    font-size: 14px;
    @media (max-width: 800px) {
      font-size: 11px;
    }
  }
`;
