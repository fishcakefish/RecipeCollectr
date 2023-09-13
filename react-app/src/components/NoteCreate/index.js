import { useState } from "react"
import { useDispatch } from "react-redux"
import { postNoteThunk } from "../../store/notes"
import { useModal } from "../../context/Modal"

export default function NoteCreate({ recipeId }) {
    const dispatch = useDispatch()
    const [entry, setEntry] = useState('')
    const [errros, setErrors] = useState({})
    const { closeModal } = useModal()

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
            closeModal()
        } catch (error) {
            console.error('Error creating note:', error)
        }
    }

    return (
        <div className="index">
            <div className="recipe-create-div">
                <h1>Create Note</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <section id='create-form-data'>
                            <label className="create-form-elements">
                                Note:
                                <input
                                    className="entry-inputs"
                                    type="text"
                                    placeholder="Note"
                                    value={entry}
                                    onChange={(e) => setEntry(e.target.value)}
                                />
                            </label>
                            {errros.entry && <p className="create-validators">{errros.entry}</p>}
                        </section>
                        <button type="submit" className="submit-button">Create Note</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
