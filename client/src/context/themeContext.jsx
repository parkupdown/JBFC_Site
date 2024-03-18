import { createContext } from "react";
import { GlobalStyle } from "../styles/global";
import { ThemeProvider } from "styled-components";
import { getTheme } from "../styles/theme";
import { useState } from "react";

export const ThemeContext = createContext();

// 이제 ThemeContext.Provider하위의 모든 컴포넌트는 Mode와 setMode에 접근할 수있다.

export default function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    setMode((current) => (current === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={getTheme(mode)}>
        <GlobalStyle themeName={mode} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
