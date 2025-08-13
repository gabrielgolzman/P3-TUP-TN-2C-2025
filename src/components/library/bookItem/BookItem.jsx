import { Badge, Button, Card } from "react-bootstrap";
import { IMAGE_DEFAULT, STAR_QTY } from "./BookItem.const";
import { StarFill, Star } from "react-bootstrap-icons";

const BookItem = ({
    title,
    author,
    pageCount,
    rating,
    imageUrl = IMAGE_DEFAULT,
    isAvailable,
    onSelectBook
}) => {

    const ratingStars = Array.from({ length: STAR_QTY }, (_, index) =>
        index < rating ? <StarFill key={index} /> : <Star key={index} />
    );

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
                    {ratingStars}
                </div>
                <Button onClick={handleSelectBook}>Seleccionar libro</Button>
            </Card.Body>
        </Card>
    )
}

export default BookItem;