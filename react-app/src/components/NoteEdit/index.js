import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { editNoteThunk } from "../../store/notes"
import { useModal } from "../../context/Modal"

export default function NoteEdit({ note, noteId }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [entry, setEntry] = useState(note.entry)
    const [errros, setErrors] = useState({})
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()
        let validationErrors = {}
        if (entry === "") validationErrors.entry = 'Please choose a Category'
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        const formData = new FormData()
        formData.append("entry", entry)

        try {
            await dispatch(editNoteThunk(formData, noteId))
            closeModal()
        } catch (error) {
            console.error('Error editing note:', error)
        }
    }

    return (
        <div className="index">
            <div className="recipe-create-div">
                <h1>Edit Note</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <section id='create-form-data'>
                            <label className="create-form-elements">
                                Entry:
                                <input
                                    className="entry-inputs"
                                    type="text"
                                    placeholder="Entry"
                                    value={entry}
                                    onChange={(e) => setEntry(e.target.value)}
                                />
                            </label>
                            {errros.entry && <p className="create-validators">{errros.entry}</p>}
                        </section>
                        <button type="submit" className="submit-button">Edit Recipe</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
