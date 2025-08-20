import { Button, Modal } from "react-bootstrap";

const DeleteModal = ({
    show = false,
    title,
    entityType,
    entityName,
    onHide,
    onDelete }) => {

    return (
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Está seguro/a que desea eliminar el {entityType} <b>{entityName}</b>?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={onDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteModal