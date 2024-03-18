import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../context/themeContext";

export const ToggleSwitch = () => {
  const { mode, toggleMode } = useContext(ThemeContext);

  return (
    <Label>
      <span>다크 모드 {mode === "light" ? "켜기" : "끄기"} </span>
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
  gap: 10px;
  cursor: pointer;
`;

const Switch = styled.div`
  position: relative;
  width: 50px;
  height: 28px;
  background: #0f53e6b8;
  border-radius: 32px;
  padding: 4px;
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: "";
    position: absolute;
    width: 25px;
    height: 28px;
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
      transform: translate(32px, -50%);
    }
  }
`;
