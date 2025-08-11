import { Form } from "react-bootstrap"

const Search = ({
    entity = '',
    type = 'text'
}) => {
    return (
        <Form.Group className="mb-3" controlId="search">
            <Form.Control
                type={type}
                placeholder={`Buscar ${entity}...`}
            />
        </Form.Group>
    )
}

export default Search