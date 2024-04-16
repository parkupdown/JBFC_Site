import { useNavigate } from "react-router-dom";
import { removeToken, useAuthStore } from "@/store/authStore";
import styled from "styled-components";
import { CiUnlock } from "react-icons/ci";
import { GoPencil } from "react-icons/go";

export function Auth() {
  const { isLogin, login, logout } = useAuthStore();

  const navigator = useNavigate();

  const handleLog = () => {
    if (isLogin) {
      logout();
      navigator("/login");
    } else {
      navigator(`/login`);
    }
  };

  const goJoin = () => {
    navigator(`/join`);
  };

  return (
    <>
      <Container>
        <div className="log">
          <span onClick={handleLog}>{isLogin ? "Logout" : "Login"}</span>
        </div>
      </Container>
      {!isLogin && (
        <Container>
          <div className="join">
            <span onClick={goJoin}>join</span>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  padding: 4px 8px;
  border: ${({ theme }) => theme.border.main};
  border-radius: 5px;
  margin-right: 5px;
  .log {
    span {
      &:hover {
        color: ${({ theme }) => theme.color.positive};
      }
    }
  }
`;
