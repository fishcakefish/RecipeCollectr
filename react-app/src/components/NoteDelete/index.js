import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteNoteThunk } from "../../store/notes";

export default function NoteDelete({ noteId }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(deleteNoteThunk(noteId))
        closeModal()
    }

    return (
        <div className="delete-modal">
            <h2>Confirm Delete</h2>
            <p>Do you really want to remove this note?</p>
            <button onClick={handleDelete} className="yes-button">Yes (Delete Note)</button>
            <button onClick={closeModal} className="no-button">Cancel (Keep Note)</button>
        </div>
    )
}
