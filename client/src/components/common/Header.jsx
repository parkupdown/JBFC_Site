import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../context/themeContext";
import { ToggleSwitch } from "./ToggleSwitch";

export default function Header() {
  return (
    <HeaderStyled>
      <h1>짝발란스</h1>
      <ToggleSwitch />
    </HeaderStyled>
  );
}
const HeaderStyled = styled.header`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px 0;
`;
