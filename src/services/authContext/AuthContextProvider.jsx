import { useState } from "react"
import { AuthContext } from "./AuthContext";

const tokenValue = localStorage.getItem('book-champions-token');

const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(tokenValue);

    const handleLogin = (token) => {
        setToken(token);
        localStorage.setItem('book-champions-token', token)
    }

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('book-champions-token');
    }


    return (
        <AuthContext
            value={{
                token,
                onLogin: handleLogin,
                onLogout: handleLogout
            }}>
            {children}
        </AuthContext>
    )
}

export default AuthContextProvider