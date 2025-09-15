import { useContext } from "react"
import { Button } from "react-bootstrap"
import { ThemeContext } from "../../../services/themeContext/ThemeContext"
import { THEME } from "../../../services/themeContext/ThemeContext.const"

const ToggleTheme = () => {
    const { theme, onToggleTheme } = useContext(ThemeContext)
    return (
        <Button onClick={onToggleTheme} className="me-3 my-2"> Cambiar a tema
            {' '} {theme === THEME.DARK ? "claro" : "oscuro"}
        </Button>
    )
}

export default ToggleTheme