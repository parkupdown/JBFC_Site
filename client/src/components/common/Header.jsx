import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../context/themeContext";
import { ToggleSwitch } from "../header/ToggleSwitch";
import { Auth } from "../header/Auth";
import { useNavigate } from "react-router-dom";
import { GoBack } from "../header/Goback";
import { Logo } from "../header/Logo";

export default function Header() {
  return (
    <>
      <Logo />
      <HeaderStyled>
        <GoBack />
        <Auth />
        <ToggleSwitch />
      </HeaderStyled>
    </>
  );
}
const HeaderStyled = styled.header`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: end;
  align-items: center;
  background-color: white;
  padding: 5px;

  span {
    background-color: #f0efef;
    padding: 1px 5px;
    border-radius: 10px;
    margin: 0 10px;
  }
`;
