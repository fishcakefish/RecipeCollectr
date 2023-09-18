import { useState } from "react"
import { useDispatch } from "react-redux"
import { postNoteThunk } from "../../store/notes"
import { useModal } from "../../context/Modal"
import './NoteCreate.css'

export default function NoteCreate({ recipeId }) {
    const dispatch = useDispatch()
    const [entry, setEntry] = useState('')
    const [errros, setErrors] = useState({})
    const { closeModal } = useModal()

    function hardRefresh() {
        window.location.reload();
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let validationErrors = {}
        if (entry === "") validationErrors.entry = 'Please write a note'
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        const formData = new FormData()
        formData.append("entry", entry)

        try {
            await dispatch(postNoteThunk(formData, recipeId))
            hardRefresh()
            closeModal()
        } catch (error) {
            console.error('Error creating note:', error)
        }
    }

    return (
        <div className="index">
            <div className="recipe-create-div">
                <form onSubmit={handleSubmit}>
                    <div>
                        <section id='create-form-data'>
                            <h1>Create Note</h1>
                            <label className="create-note-elements">
                                <textarea
                                    className="entry-inputs"
                                    type="text"
                                    placeholder="Note"
                                    value={entry}
                                    onChange={(e) => setEntry(e.target.value)}
                                />
                            </label>
                            {errros.entry && <p className="create-validators">{errros.entry}</p>}
                            <div className="submit-button-container">
                                <button type="submit" className="submit-button">Create Note</button>
                            </div>
                        </section>
                    </div>
                </form>
            </div>
        </div>
    )
}
