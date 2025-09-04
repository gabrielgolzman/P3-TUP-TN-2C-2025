

import { useEffect, useState } from "react";
import { Badge, Button, Card, Row } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { useLocation, useNavigate, useParams } from "react-router";
import BookForm from "../bookForm/BookForm";

const BookDetails = () => {
    const [showBookForm, setShowBookForm] = useState(false);
    const [book, setBook] =useState(null);

    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(location.state?.book) {
            const bookState = {
                ...location.state.book,
                id: parseInt(id, 10),
            };
            setBook(bookState);
        }
    }, [location.state?.book, id])

    if(!book)
        return <p>Cargando libro...</p>;

    const { title, author, pageCount, summary, imageUrl, rating, isAvailable } = book;

    const clickHandler = () => {
        navigate("/library");
    };

    const editBookHandler = (editedBook) => {
        setBook(editedBook);
        setShowBookForm(false);
    }

    const ratingStars = Array.from({ length: 5 }, (_, index) =>
        index < rating ? <StarFill key={index} /> : <Star key={index} />
    );

    return (
        <Card className="my-3 w-75 p-0">
            <Card.Img
                height={500}
                variant="top"
                src={imageUrl !== "" ? imageUrl : "https://bit.ly/47NylZk"}
            />
            <Card.Body>
                <div className="mb-2">
                    {isAvailable ?
                        <Badge bg="success">Disponible</Badge>
                        :
                        <Badge bg="danger">Reservado</Badge>
                    }
                </div>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle>{author}</Card.Subtitle>
                {ratingStars}
                <p>{pageCount} páginas</p>
                <p className="my-3">
                    <b>Sinopsis</b>: {summary}
                </p>
                <Row className="mb-1">
                    <Button className="me-2" variant="secondary" onClick={() => setShowBookForm(!showBookForm)}>
                        {showBookForm ? "Ocultar formulario" : "Editar lectura"}
                    </Button>
                    <Button className="me-2" onClick={clickHandler}>
                        Volver a la página principal
                    </Button>
                </Row>

                {showBookForm && (
                    <BookForm
                        book={book}
                        onBookSaved={editBookHandler}
                        isEditing={true}
                    />
                )}
            </Card.Body>
        </Card>
    );
};


export default BookDetails;
