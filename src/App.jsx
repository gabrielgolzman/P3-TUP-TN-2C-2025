import BookItem from './components/bookItem/BookItem';
import { BOOKS } from './data/data';

const App = () => {
  return (
    <>
      <h1>¡Bienvenidos a Book Champions App!</h1>
      <p>Quiero leer libros</p>
      <BookItem
        title={BOOKS[0].title}
        author={BOOKS[0].author}
        pageCount={BOOKS[0].pageCount}
        rating={BOOKS[0].rating}
        imageUrl={BOOKS[0].imageUrl}
        isAvailable={BOOKS[0].isAvailable}
      />
      <BookItem
        title={BOOKS[1].title}
        author={BOOKS[1].author}
        pageCount={BOOKS[1].pageCount}
        rating={BOOKS[1].rating}
        imageUrl={BOOKS[1].imageUrl}
        isAvailable={BOOKS[1].isAvailable}
      />
      <BookItem
        title={BOOKS[2].title}
        author={BOOKS[2].author}
        pageCount={BOOKS[2].pageCount}
        rating={BOOKS[2].rating}
        imageUrl={BOOKS[2].imageUrl}
        isAvailable={BOOKS[2].isAvailable}
      />
    </>
  )

}

export default App
