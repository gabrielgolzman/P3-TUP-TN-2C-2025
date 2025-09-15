import { useContext, useRef, useState } from "react"
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap"
import { useNavigate } from "react-router";

import { initialErrors } from "./Login.data";

import AuthContainer from "../authContainer/AuthContainer";
import { errorToast } from "../../shared/notifications/notification";
import { AuthContext } from "../../../services/authContext/AuthContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(initialErrors)

    const { onLogin } = useContext(AuthContext)

    const navigate = useNavigate()
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

        fetch("http://localhost:3000/login", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(async res => {
                if (!res.ok) {
                    const errData = await res.json();
                    throw new Error(errData.message || "Algo ha salido mal");
                }

                return res.json();
            })
            .then(token => {
                onLogin(token)
                navigate('/library')
            })
            .catch(err => errorToast(err.message));

    }

    const handleRegisterClick = () => {
        navigate("/register")
    }
    return (
        <AuthContainer>
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
                <Row className="mt-4">
                    <p className="text-center fw-bold">¿No posee cuenta?</p>
                    <Button onClick={handleRegisterClick}>Registrarse</Button>
                </Row>
            </Form>
        </AuthContainer>
    )
}

export default Login