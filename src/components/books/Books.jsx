import { useState } from "react"
import BookItem from "../bookItem/BookItem"

const Books = ({ books }) => {
    const [selectedBook, setSelectedBook] = useState('');

    const handleSelectBook = (title) => {
        setSelectedBook(title)
    }
    return (
        <>
            {
                selectedBook &&
                <p className="text-center">Usted ha seleccionado el libro: <b>{selectedBook}</b></p>
            }
            <div className="d-flex justify-content-center flex-wrap">
                <BookItem
                    title={books[0].title}
                    author={books[0].author}
                    pageCount={books[0].pageCount}
                    rating={books[0].rating}
                    imageUrl={books[0].imageUrl}
                    isAvailable={books[0].isAvailable}
                    onSelectBook={handleSelectBook}
                />
                <BookItem
                    title={books[1].title}
                    author={books[1].author}
                    pageCount={books[1].pageCount}
                    rating={books[1].rating}
                    imageUrl={books[1].imageUrl}
                    isAvailable={books[1].isAvailable}
                    onSelectBook={handleSelectBook}

                />
                <BookItem
                    title={books[2].title}
                    author={books[2].author}
                    pageCount={books[2].pageCount}
                    rating={books[2].rating}
                    imageUrl={books[2].imageUrl}
                    isAvailable={books[2].isAvailable}
                    onSelectBook={handleSelectBook}
                />
            </div>
        </>
    )
}

export default Books