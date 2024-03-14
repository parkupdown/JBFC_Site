import styled from "styled-components";

export default function Footer() {
  return (
    <FooterStyled>
      <h1>Footer</h1>
    </FooterStyled>
  );
}

const FooterStyled = styled.footer`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
