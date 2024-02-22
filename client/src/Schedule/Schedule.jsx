import styled from "styled-components";
import Calendar from "./Calendar";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default function Schedule() {
  const navigator = useNavigate();

  return (
    <Container>
      <button onClick={() => navigator(-1)}>뒤로가기</button>
      <Calendar></Calendar>
    </Container>
  );
}
