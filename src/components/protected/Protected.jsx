import { useContext } from "react"
import { Navigate, Outlet } from "react-router"
import { AuthContext } from "../../services/authContext/AuthContext"
import { IsTokenValid } from "./Protected.helpers";

const Protected = () => {
    const { token } = useContext(AuthContext);

    if (!IsTokenValid(token)) {
        return <Navigate to='/login' replace />
    }
    return <Outlet />
}

export default Protected