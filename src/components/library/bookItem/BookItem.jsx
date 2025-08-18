import { Badge, Button, Card } from "react-bootstrap";
import { StarFill, Star } from "react-bootstrap-icons";
import classNames from "classnames";

import { IMAGE_DEFAULT, STAR_QTY } from "./BookItem.const";

import classes from './BookItem.module.css'

const BookItem = ({
    id,
    title,
    author,
    pageCount,
    rating,
    imageUrl = IMAGE_DEFAULT,
    isAvailable,
    onSelectBook,
    onDeleteBook
}) => {

    const ratingStars = Array.from({ length: STAR_QTY }, (_, index) =>
        index < rating ? <StarFill key={index} /> : <Star key={index} />
    );

    const handleSelectBook = () => {
        onSelectBook(title)
    }

    const handleDeleteBook = () => {
        onDeleteBook(id)
    }

    return (
        <Card className={classNames('mx-3 mb-5', classes.cardContainer)}>
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
                <div className="d-flex justify-content-center mt-3">
                    <Button className="me-3" variant="danger" onClick={handleDeleteBook}>Eliminar libro</Button>
                    <Button onClick={handleSelectBook}>Seleccionar libro</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default BookItem;