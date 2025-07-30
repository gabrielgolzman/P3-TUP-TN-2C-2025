import BookItem from './components/bookItem/BookItem';

const App = () => {
  return (
    <>
      <h1>¡Bienvenidos a Book Champions App!</h1>
      <p>Quiero leer libros</p>
      <BookItem
        title="100 años de soledad"
        author="Gabriel García Marquez"
        pageCount={342}
        rating={5}
        imageUrl="#"
        isAvailable
      />
      <BookItem
        title="Las dos torres"
        author="J.R.R Tolkien"
        pageCount={654}
        rating={5}
        imageUrl="#"
        isAvailable={false}
      />
      <BookItem />
      <BookItem />
    </>
  )

}

export default App
