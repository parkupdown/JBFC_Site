import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { IoArrowBackOutline } from "react-icons/io5";
import styled from "styled-components";

export function GoBack() {
  const { isLogin, login, logout } = useAuthStore();
  const navigator = useNavigate();
  const goBack = () => navigator(-1);

  return (
    <>
      {isLogin && (
        <Container>
          <span onClick={goBack}>
            <IoArrowBackOutline></IoArrowBackOutline>Back
          </span>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  padding: 4px 8px;
  border: ${({ theme }) => theme.border.main};
  border-radius: 5px;
  margin-right: 5px;
  &:hover {
    color: ${({ theme }) => theme.color.positive};
  }
`;
