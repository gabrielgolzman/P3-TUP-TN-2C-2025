import { BOOKS } from './data/data';
import Books from './components/books/Books';

const App = () => {
  return (
    <>
      <h1>¡Bienvenidos a Book Champions App!</h1>
      <p>Quiero leer libros</p>
      <Books books={BOOKS} />
    </>
  )

}

export default App
