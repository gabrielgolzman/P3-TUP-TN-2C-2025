const BookItem = ({
    title,
    author,
    pageCount,
    rating,
    imageUrl,
    isAvailable
}) => {

    return (
        <>
            <h1>{title}</h1>
            <h2>{author}</h2>
            <p>{pageCount} páginas</p>
            <p>{rating} estrellas</p>
            <img alt="portada de libro" src={imageUrl} />
            <p> {isAvailable ? "Disponible" : "No disponible"}</p>
        </>
    )
}

export default BookItem;