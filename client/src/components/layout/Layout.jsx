import styled from "styled-components";
import Footer from "../common/Footer";
import Header from "../common/Header";

export default function Layout({ children }) {
  return (
    <>
      <Header></Header>
      <LayoutStyled>{children}</LayoutStyled>
      <Footer></Footer>
    </>
  );
}
const LayoutStyled = styled.main`
  width: 100%;
  margin: 0 auto;
  padding: 20px 0;
`;
