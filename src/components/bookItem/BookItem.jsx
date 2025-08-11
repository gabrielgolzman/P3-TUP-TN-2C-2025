import { Badge, Button, Card } from "react-bootstrap";
import { IMAGE_DEFAULT } from "./BookItem.const";

const BookItem = ({
    title,
    author,
    pageCount,
    rating,
    imageUrl = IMAGE_DEFAULT,
    isAvailable,
    onSelectBook
}) => {

    const handleSelectBook = () => {
        onSelectBook(title)
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
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle>{author}</Card.Subtitle>
                    <p>{pageCount} páginas</p>
                    <p>{rating} estrellas</p>
                </div>
                <Button onClick={handleSelectBook}>Seleccionar libro</Button>
            </Card.Body>
        </Card>
    )
}

export default BookItem;