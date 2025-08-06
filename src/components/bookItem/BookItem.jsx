import { useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { IMAGE_DEFAULT } from "./BookItem.const";

const BookItem = ({
    title,
    author,
    pageCount,
    rating,
    imageUrl = IMAGE_DEFAULT,
    isAvailable
}) => {

    const [bookTitle, setBookTitle] = useState(title);

    const handleUpdateTitle = () => {
        setBookTitle('Actualizado!')
    }

    return (
        <Card style={{ width: '22rem' }} className="mx-3 mb-2">
            <Card.Img
                height={400}
                variant="top"
                src={imageUrl} />
            <Card.Body>
                <div className="mb-2">
                    {
                        isAvailable
                            ? <Badge bg="success">Disponible</Badge>
                            : <Badge bg="danger">Reservado</Badge>
                    }
                    <Card.Title>{bookTitle}</Card.Title>
                    <Card.Subtitle>{author}</Card.Subtitle>
                    <p>{pageCount} páginas</p>
                    <p>{rating} estrellas</p>
                </div>
                <Button onClick={handleUpdateTitle}>Actualizar título</Button>
            </Card.Body>
        </Card>
    )
}

export default BookItem;