import styled from "styled-components";
const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-weight: 400;
  }
`;

export const Loader = () => {
  return (
    <Container>
      <h2>로딩중입니다</h2>
    </Container>
  );
};
