import { Badge, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
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
    summary,
    imageUrl = IMAGE_DEFAULT,
    isAvailable,
    onSelectBook,
    onDeleteBook
}) => {

    const navigate = useNavigate();

    const ratingStars = Array.from({ length: STAR_QTY }, (_, index) =>
        index < rating ? <StarFill key={index} /> : <Star key={index} />
    );

    const handleSelectBook = () => {
        onSelectBook(title);
        navigate(`${id}`, {
            state: {
                book: {
                    title,
                    author,
                    rating,
                    pageCount,
                    summary,
                    imageUrl,
                    isAvailable,
                }
            }
        })
    }

    const handleDeleteBook = () => {
        onDeleteBook({ id, title })
    }

    return (
        <Card className={classNames('mx-3 mb-5', classes.cardContainer)}>
            <Card.Img
                height={400}
                variant="top"
                src={imageUrl?.length ? imageUrl : null} />
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