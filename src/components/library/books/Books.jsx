import { useState } from "react"
import BookItem from "../bookItem/BookItem"
import Search from "../../shared/search/Search";

const Books = ({ books, onDeleteBook }) => {
    const [selectedBook, setSelectedBook] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const handleSelectBook = (title) => {
        setSelectedBook(title)
    }

    const handleSearch = (event) => {
        setSearchValue(event.target.value)
    }

    const booksMapped = books
        .filter(book => {
            const searchUppercase = searchValue.toUpperCase();
            return book.title.toUpperCase().includes(searchUppercase)
                || book.author.toUpperCase().includes(searchUppercase)

        })
        .map(book =>
            <BookItem
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                pageCount={book.pageCount}
                rating={book.rating}
                imageUrl={book.imageUrl}
                isAvailable={book.isAvailable}
                onSelectBook={handleSelectBook}
                onDeleteBook={onDeleteBook} />)

    return (
        <div className="d-flex flex-column align-items-center">
            <Search
                entity="libros"
                onChange={handleSearch}
                value={searchValue} />
            {
                selectedBook &&
                <p className="text-center">Usted ha seleccionado el libro: <b>{selectedBook}</b></p>
            }
            <div className="d-flex justify-content-center flex-wrap">
                {booksMapped.length ?
                    booksMapped :
                    <p>No se encontraron libros</p>}
            </div>
        </div>
    )
}

export default Books