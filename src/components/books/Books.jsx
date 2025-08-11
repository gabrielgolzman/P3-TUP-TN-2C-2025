import { useState } from "react"
import BookItem from "../bookItem/BookItem"
import Search from "../shared/search/Search";

const Books = ({ books }) => {
    const [selectedBook, setSelectedBook] = useState('');

    const handleSelectBook = (title) => {
        setSelectedBook(title)
    }

    const booksMapped = books.map(book =>
        <BookItem
            key={book.id}
            title={book.title}
            author={book.author}
            pageCount={book.pageCount}
            rating={book.rating}
            imageUrl={book.imageUrl}
            isAvailable={book.isAvailable}
            onSelectBook={handleSelectBook} />)

    return (
        <>
            <Search entity="libros" />

            {
                selectedBook &&
                <p className="text-center">Usted ha seleccionado el libro: <b>{selectedBook}</b></p>
            }
            <div className="d-flex justify-content-center flex-wrap">
                {booksMapped.length ?
                    booksMapped :
                    <p>No se encontraron libros</p>}
            </div>
        </>
    )
}

export default Books