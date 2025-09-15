import { createContext } from "react";
import { THEME } from "./ThemeContext.const";

export const ThemeContext = createContext({
    theme: THEME.DARK,
    onToggleTheme: () => { }
})

