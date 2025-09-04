import { useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap"
import { Route, Routes, useNavigate } from "react-router";

import { initialDeleteBookModalState } from "./Dashboard.data";

import Books from "../books/Books"
import BookDetails from "../bookDetails/BookDetails"
import DeleteModal from "../../shared/deleteModal/DeleteModal";
import BookForm from "../bookForm/BookForm";
import { successToast } from "../../shared/notifications/notification";

const Dashboard = ({ onLogout }) => {
    const [bookData, setBookData] = useState([]);
    const [deleteBookModal, setDeleteBookModal] = useState(initialDeleteBookModalState);

    const navigate = useNavigate();

    useEffect(() => {
        console.log("Dasboard component useEffect!")
        fetch('http://localhost:3000/book')
            .then(res => res.json())
            .then(data => {
                setBookData([...data])
            })
            .catch(err => console.log(err));
    }, [])

    const handleAddBook = (book) => {
        fetch('http://localhost:3000/book', {
            method: 'POST',
            body: JSON.stringify(book),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        },)
            .then(res => res.json())
            .then(data => {
                setBookData((prevBooks) => [data, ...prevBooks]);
                successToast(`El libro ${data.title} fue agregado correctamente.`);
            })
            .catch(err => console.log(err));
    }

    const handleDeleteBook = () => {
        const { id, title } = deleteBookModal.bookToDelete;

        fetch(`http://localhost:3000/book/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        })
            .then(res => res.text())
            .then(message => {
                console.log(message);
                successToast(`El libro "${title}" fue eliminado correctamente.`);
                setBookData(prevBooks => prevBooks.filter(book => book.id !== id));
                handleCloseDeleteModal();
            })
            .catch((err) => {
                console.error(err);
            });
    };

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
        navigate('/library/add-book', { replace: true })
    }

    const handleLogout = () => {
        navigate('/login');
        onLogout();
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
                    <Button className="me-3" onClick={handleLogout}>Cerrar sesión</Button>
                    <Button variant="success" onClick={handleNavigateToForm}>Agregar libro</Button>
                </div>
                <Row className='d-flex justify-content-center'>
                    <Routes>
                        <Route
                            index
                            element={<Books
                                books={bookData}
                                onDeleteBook={handleOpenDeleteModal} />} />
                        <Route path="/:id" element={<BookDetails />} />
                        <Route
                            path="/add-book"
                            element={<BookForm onAddBook={handleAddBook} />} />
                    </Routes>
                </Row>
            </div>
        </>
    )
}

export default Dashboard