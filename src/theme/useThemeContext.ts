import { useContext } from "react";
import ThemeContext from "styled-components/macro";

export const useThemeContext = () => {
  //@ts-ignore
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error(
      "No theme context found. Is there a wrapping ThemeProvider component?"
    );
  return context;
};
