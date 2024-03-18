import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../context/themeContext";
import { ToggleSwitch } from "../header/ToggleSwitch";
import { Auth } from "../header/Auth";
import { useNavigate } from "react-router-dom";
import { GoBack } from "../header/Goback";

export default function Header() {
  return (
    <HeaderStyled>
      <GoBack />
      <Auth />
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
