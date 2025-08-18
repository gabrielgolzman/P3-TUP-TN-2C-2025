import { Button, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const ErrorNotFound = () => {
    const navigate = useNavigate()

    const goBack = () => {
        navigate("/library")
    }

    return (
        <Row>
            <h1>Ups! Sitio no encontrado</h1>
            <p>Haz click en el botón para regresar</p>
            <Button className='w-25' onClick={goBack}>Regresar </Button>
        </Row>
    )
}

export default ErrorNotFound