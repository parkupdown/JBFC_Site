import styled from "styled-components";

export default function Header() {
  return (
    <HeaderStyled>
      <h1>짝발란스</h1>
    </HeaderStyled>
  );
}
const HeaderStyled = styled.header`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;
