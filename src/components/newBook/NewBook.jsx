import { useState } from "react"
import { Card, Col, Form, Row, Button } from "react-bootstrap"
import { initialForm } from "./NewBook.data";

const NewBook = () => {
    const [form, setForm] = useState(initialForm);

    const handleChangeForm = (newForm) => {
        setForm((prevForm) => ({
            ...prevForm,
            ...newForm
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setForm(initialForm)
    }

    return (
        <Card className="mb-5 w-50" bg="success">
            <Card.Body>
                <Form className="text-white" onSubmit={handleSubmit} >
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Título</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresar título"
                                    onChange={(e) => handleChangeForm({
                                        title: e.target.value
                                    })}
                                    value={form.title}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="author">
                                <Form.Label>Autor</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresar autor"
                                    onChange={(e) => handleChangeForm({
                                        author: e.target.value,
                                    })}
                                    value={form.author}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group className="mb-3" controlId="summary">
                                <Form.Label>Resumen</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Ingresa un resumen del libro"
                                    onChange={(e) => handleChangeForm({
                                        summary: e.target.value,
                                    })}
                                    value={form.summary} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="rating">
                                <Form.Label>Puntuación</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingresar cantidad de estrellas"
                                    max={5}
                                    min={1}
                                    onChange={(e) => handleChangeForm({
                                        rating: e.target.value,
                                    })}
                                    value={form.rating}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="pageCount">
                                <Form.Label>Cantidad de páginas</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingresar cantidad de páginas"
                                    min={1}
                                    onChange={(e) => handleChangeForm({
                                        pageCount: e.target.value,
                                    })}
                                    value={form.pageCount}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-between">
                        <Form.Group className="mb-3" controlId="imageUrl">
                            <Form.Label>URL de imagen</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingresar url de imagen"
                                onChange={(e) => handleChangeForm({
                                    imageUrl: e.target.value,
                                })}
                                value={form.imageUrl}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-end">
                        <Col md={3} className="d-flex flex-column justify-content-end align-items-end">
                            <Form.Check
                                type="switch"
                                id="available"
                                className="mb-3"
                                label="¿Disponible?"
                                onChange={(e) => handleChangeForm({
                                    isAvailable: e.target.checked,
                                })}
                                value={form.isAvailable} />
                            <Button type="submit">
                                Agregar lectura
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default NewBook