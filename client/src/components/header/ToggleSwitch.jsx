import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "@/context/themeContext";
import { GoSun } from "react-icons/go";
import { GoMoon } from "react-icons/go";

export const ToggleSwitch = () => {
  const { mode, toggleMode } = useContext(ThemeContext);

  return (
    <Label>
      {mode === "light" ? <GoSun /> : <GoMoon />}
      <Input
        checked={mode === "light" ? false : true}
        type="checkbox"
        onChange={toggleMode}
      />
      <Switch />
    </Label>
  );
};

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 2px;
  cursor: pointer;
`;

const Switch = styled.div`
  position: relative;
  width: 46px;
  height: 24px;
  background: #0f53e6b8;
  border-radius: 32px;
  padding: 4px;
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: "";
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 35px;
    top: 50%;
    left: 0px;
    background: white;
    transform: translate(0, -50%);
  }
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + ${Switch} {
    background: #b3b3b3;

    &:before {
      transform: translate(22px, -50%);
    }
  }
`;
