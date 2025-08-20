import { useState } from "react";
import { Button, Row } from "react-bootstrap"

import { BOOKS } from "../../../data/data";
import { initialDeleteBookModalState } from "./Dashboard.data";

import NewBook from "../newBook/NewBook"
import Books from "../books/Books"
import DeleteModal from "../../shared/deleteModal/DeleteModal";
import { Route, Routes, useNavigate } from "react-router";

const Dashboard = ({ onLogout }) => {
    const [bookData, setBookData] = useState(BOOKS);
    const [deleteBookModal, setDeleteBookModal] = useState(initialDeleteBookModalState);


    const navigate = useNavigate();

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

    const handleDeleteBook = () => {
        setBookData(prevBookData =>
            prevBookData.filter(book => book.id !== deleteBookModal.bookToDelete.id));
        handleCloseDeleteModal();
    }

    const handleOpenDeleteModal = (book) => {
        setDeleteBookModal(prevDeleteBookModal => ({
            ...prevDeleteBookModal,
            show: true,
            bookToDelete: book
        }))
    }

    const handleCloseDeleteModal = () => {
        setDeleteBookModal(initialDeleteBookModalState)
    }

    const handleNavigateToForm = () => {
        navigate('/library/add-book')
    }

    return (
        <>
            <DeleteModal
                show={deleteBookModal.show}
                title="Borrar libro"
                entityType='libro'
                entityName={deleteBookModal.bookToDelete.title}
                onHide={handleCloseDeleteModal}
                onDelete={handleDeleteBook} />
            <div className="flex-column">
                <div className='text-center mb-5'>
                    <h1>¡Bienvenidos a Book Champions App!</h1>
                    <Button className="me-3" onClick={onLogout}>Cerrar sesión</Button>
                    <Button variant="success" onClick={handleNavigateToForm}>Agregar libro</Button>
                </div>
                <Row className='d-flex justify-content-center'>
                    <Routes>
                        <Route
                            index
                            element={<Books
                                books={bookData}
                                onDeleteBook={handleOpenDeleteModal} />} />
                        <Route
                            path="/add-book"
                            element={<NewBook onAddBook={handleAddBook} />} />
                    </Routes>
                    {/* <NewBook onAddBook={handleAddBook} />
                    <Books books={bookData} onDeleteBook={handleOpenDeleteModal} /> */}
                </Row>
            </div>
        </>
    )
}

export default Dashboard