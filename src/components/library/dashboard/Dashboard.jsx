import { useState } from "react";
import { Button, Row } from "react-bootstrap"

import { BOOKS } from "../../../data/data";

import NewBook from "../newBook/NewBook"
import Books from "../books/Books"

const Dashboard = ({ onLogout }) => {
    const [bookData, setBookData] = useState(BOOKS);

    const handleAddBook = (book) => {
        setBookData((prevBooks) => {
            const maxId = Math.max(...prevBooks.map(book => book.id));

            const newBook = {
                ...book,
                id: maxId + 1
            }
            return [newBook, ...prevBooks]

        });
    }

    const handleDeleteBook = (bookId) => {
        setBookData(prevBookData =>
            prevBookData.filter(book => book.id !== bookId))
    }
    return (
        <div className="flex-column">
            <div className='text-center mb-5'>
                <h1>¡Bienvenidos a Book Champions App!</h1>
                <Button onClick={onLogout}>Cerrar sesión</Button>
            </div>
            <Row className='d-flex justify-content-center'>
                <NewBook onAddBook={handleAddBook} />
                <Books books={bookData} onDeleteBook={handleDeleteBook} />
            </Row>
        </div>
    )
}

export default Dashboard