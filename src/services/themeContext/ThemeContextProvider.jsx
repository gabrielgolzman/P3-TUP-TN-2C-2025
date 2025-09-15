import { useEffect, useState } from "react"
import { ThemeContext } from "./ThemeContext"
import { THEME } from "./ThemeContext.const"

const themeValue = localStorage.getItem("theme-p3");

const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(themeValue ?? THEME.DARK);

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', themeValue);
    }, [])

    const handleToggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === THEME.LIGHT ?
                THEME.DARK : THEME.LIGHT;

            localStorage.setItem('theme-p3', newTheme)
            document.documentElement.setAttribute('data-bs-theme', newTheme);

            return newTheme;

        })
    }


    return (
        <ThemeContext
            value={{
                theme,
                onToggleTheme: handleToggleTheme
            }}>
            {children}
        </ThemeContext>
    )
}

export default ThemeContextProvider