import { useRef, useState } from "react"
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap"
import { initialErrors } from "./Login.data";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(initialErrors)

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setErrors(prevErrors => ({
            ...prevErrors,
            email: false
        }))
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setErrors(prevErrors => ({
            ...prevErrors,
            password: false
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email.length) {
            setErrors(prevErrors => ({
                ...prevErrors,
                email: true
            }))
            emailRef.current.focus();
            return;
        }

        if (!password.length) {
            setErrors(prevErrors => ({
                ...prevErrors,
                password: true
            }))
            passwordRef.current.focus();
            return;
        }

        setErrors(initialErrors);
        setEmail('');
        setPassword('')
        alert(`Su email es ${email} y su contraseña es: ${password}`)
    }
    return (
        <Card className="w-25 mt-5 mx-3 p-3 px-5 shadow">
            <Card.Body>
                <Row className="mb-2">
                    <h5>¡Bienvenidos a Books Champion!</h5>
                </Row>
                <Form onSubmit={handleSubmit}>
                    <FormGroup className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            ref={emailRef}
                            autoComplete="email"
                            type="email"
                            placeholder="Ingresar email"
                            className={errors.email && "border border-danger"}
                            value={email}
                            onChange={handleEmailChange} />
                        {errors.email && <p className="text-danger">¡El email es campo obligatorio!</p>}
                    </FormGroup>
                    <FormGroup className="mb-4">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            ref={passwordRef}
                            autoComplete="current-pasword"
                            type="password"
                            placeholder="Ingresar contraseña"
                            className={errors.password && "border border-danger"}
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {errors.password && <p className="text-danger">¡La contraseña es campo obligatorio!</p>}
                    </FormGroup>
                    <Row>
                        <Col />
                        <Col md={6} className="d-flex justify-content-end">
                            <Button variant="secondary" type="submit">
                                Iniciar sesión
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default Login