import { useContext, useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap"
import { Route, Routes, useLocation, useNavigate } from "react-router";

import { initialDeleteBookModalState } from "./Dashboard.data";

import Books from "../books/Books"
import BookDetails from "../bookDetails/BookDetails"
import DeleteModal from "../../shared/deleteModal/DeleteModal";
import BookForm from "../bookForm/BookForm";
import { errorToast, successToast } from "../../shared/notifications/notification";
import { addBook, getBooks } from "./Dashboard.services";
import { AuthContext } from "../../../services/authContext/AuthContext";

const Dashboard = () => {
    const [bookData, setBookData] = useState([]);
    const [deleteBookModal, setDeleteBookModal] = useState(initialDeleteBookModalState);

    const { onLogout } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/library") {
            getBooks(
                data => setBookData([...data]),
                err => errorToast(err)
            )
        }
    }, [location])

    const handleAddBook = (enteredBook) => {
        if (!enteredBook.title || !enteredBook.author) {
            errorToast('El autor y/o título son requeridos');
            return;
        }
        addBook(
            enteredBook,
            data => {
                setBookData((prevBooks) => [data, ...prevBooks]);
                successToast(`El libro ${data.title} fue agregado correctamente.`);
            },
            err => errorToast(err)
        )
    }

    const handleDeleteBook = () => {
        const { id, title } = deleteBookModal.bookToDelete;

        fetch(`http://localhost:3000/book/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("book-champions-token")}`,
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
        onLogout();
        navigate('/login');
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