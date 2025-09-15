import { Card, Row } from "react-bootstrap"
import ToggleTheme from "../../shared/toggleTheme/ToggleTheme"

const AuthContainer = ({ children }) => {
    return (
        <Card className="mt-5 mx-3 p-3 px-5 shadow">
            <Card.Body>
                <ToggleTheme />
                <Row className="mb-2">
                    <h5>¡Bienvenidos a Books Champion!</h5>
                </Row>
                {children}
            </Card.Body>
        </Card>
    )
}

export default AuthContainer