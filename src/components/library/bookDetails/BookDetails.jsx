

import { Badge, Button, Card } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router";

const BookDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { title, author, pageCount, summary, imageUrl, rating, available } = location.state.book;

    const clickHandler = () => {
        navigate("/library");
    };

    const ratingStars = Array.from({ length: 5 }, (_, index) =>
        index < rating ? <StarFill key={index} /> : <Star key={index} />
    );

    return (
        <Card className="my-3 w-25 p-0">
            <Card.Img
                height={500}
                variant="top"
                src={imageUrl !== "" ? imageUrl : "https://bit.ly/47NylZk"}
            />
            <Card.Body>
                <div className="mb-2">
                    {available ?
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
                <Button className="me-2" onClick={clickHandler}>
                    Volver a la página principal
                </Button>
            </Card.Body>
        </Card>
    );
};


export default BookDetails;
