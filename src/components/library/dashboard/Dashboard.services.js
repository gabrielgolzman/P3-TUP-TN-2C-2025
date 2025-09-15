export const getBooks = (onSuccess, onError) => {
    fetch('http://localhost:3000/book', {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("book-champions-token")}`,
        }
    })
        .then(res => res.json())
        .then(onSuccess)
        .catch(onError);
}

export const addBook = (newBook, onSuccess, onError) => {
    fetch('http://localhost:3000/book', {
        method: 'POST',
        body: JSON.stringify(newBook),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("book-champions-token")}`,
        }
    },)
        .then(async res => {
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Algo ha salido mal");
            }

            return res.json();
        })
        .then(onSuccess)
        .catch(onError)
}