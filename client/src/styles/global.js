import "sanitize.css";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
body{
    padding: 0;
    margin: 0;
}
h1{
    margin: 0;
}
body>*{
    color: ${(props) => (props.themeName === "light" ? "black" : "white")};
    background-color: ${(props) =>
      props.themeName === "light" ? "white" : "#1E1E1E"};
}
`;
