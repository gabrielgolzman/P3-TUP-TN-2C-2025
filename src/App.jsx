import { Row } from 'react-bootstrap';
import { BOOKS } from './data/data';
import Books from './components/books/Books';
import NewBook from './components/newBook/NewBook';

const App = () => {
  const handleAddBook = (book) => {
    console.log(book)
  }

  return (
    <>
      <div className='text-center mb-5'>
        <h1>¡Bienvenidos a Book Champions App!</h1>
      </div>
      <Row className='d-flex justify-content-center'>
        <NewBook onAddBook={handleAddBook} />
        <Books books={BOOKS} />
      </Row>
    </>
  )

}

export default App
