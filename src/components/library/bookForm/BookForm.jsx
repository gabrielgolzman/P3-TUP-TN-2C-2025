import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import { errorToast } from "../../shared/notifications/notification";

const BookForm = ({
    book,
    onAddBook,
    onBookSaved,
    isEditing = false
}) => {
    const [title, setTitle] = useState(book?.title);
    const [author, setAuthor] = useState(book?.author);
    const [summary, setSummary] = useState(book?.summary);
    const [rating, setRating] = useState(book?.rating);
    const [pageCount, setPageCount] = useState(book?.pageCount);
    const [imageUrl, setImageUrl] = useState(book?.imageUrl);
    const [isAvailable, setIsAvailable] = useState(book?.isAvailable);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!title || !author) {
            errorToast("El autor y/o título son requeridos.");
            return;
        }

        const newBook = {
            title,
            author,
            summary,
            rating,
            pageCount,
            imageUrl,
            isAvailable,
        };

        onAddBook(newBook);

        if (!isEditing) {
            setTitle("");
            setAuthor("");
            setSummary("");
            setRating(null);
            setPageCount(null);
            setImageUrl("");
            setIsAvailable(false);
        }
    };

    const handleSaveBook = (event) => {
        event.preventDefault();

        const bookData = {
            title,
            author,
            rating: parseInt(rating, 10),
            pageCount: parseInt(pageCount, 10),
            imageUrl,
            isAvailable,
        };

        fetch(`http://localhost:3000/book/${book.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                 "Authorization": `Bearer ${localStorage.getItem("book-champions-token")}`,
            },
            body: JSON.stringify(bookData)
        })
            .then(res => res.json())
            .then(() => {
                onBookSaved(bookData);
            })
            .catch(err => console.log(err));
    }


    const handleGoBack = () => {
        navigate("/library");
    };

    return (
        <Card className="mb-5 w-100" bg="success">
            <Card.Body>
                <Form className="text-white" onSubmit={isEditing ? handleSaveBook : handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>
                                    Título<span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresar título"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="author">
                                <Form.Label>
                                    Autor<span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresar autor"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
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
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                />
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
                                    value={rating}
                                    onChange={(e) => setRating(Number(e.target.value))}
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
                                    value={pageCount}
                                    onChange={(e) => setPageCount(Number(e.target.value))}
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
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-end">
                        <Col
                            md={3}
                            className="d-flex flex-column justify-content-end align-items-end"
                        >
                            <Form.Check
                                type="switch"
                                id="available"
                                className="mb-3"
                                label="¿Disponible?"
                                checked={isAvailable}
                                onChange={(e) => setIsAvailable(e.target.checked)}
                            />
                            <Button
                                variant="secondary"
                                onClick={handleGoBack}
                                type="button"
                                className="mb-3"
                            >
                                Volver
                            </Button>
                            <Button type="submit">
                                {isEditing ? "Editar lectura" : "Agregar lectura"}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};


export default BookForm;
