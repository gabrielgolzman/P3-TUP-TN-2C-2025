import { useState } from 'react';
import { Row } from 'react-bootstrap';
import { BOOKS } from './data/data';
import Books from './components/books/Books';
import NewBook from './components/newBook/NewBook';
import Search from './components/shared/search/Search';

const App = () => {
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

  return (
    <>
      <div className='text-center mb-5'>
        <h1>¡Bienvenidos a Book Champions App!</h1>
      </div>
      <Row className='d-flex justify-content-center'>
        <NewBook onAddBook={handleAddBook} />
        <Books books={bookData} />
      </Row>
    </>
  )

}

export default App
