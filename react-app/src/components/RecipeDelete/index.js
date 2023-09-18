import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteRecipeThunk } from "../../store/recipes"
import './RecipeDelete.css'

export default function RecipeDelete({ recipeId }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(deleteRecipeThunk(recipeId))
        closeModal()
    }

    return (
        <div className="delete-modal">
            <h2>Confirm Delete</h2>
            <p>Do you really want to remove this recipe?</p>
            <button onClick={handleDelete} className="yes-button">Yes (Delete Recipe)</button>
            <button onClick={closeModal} className="no-button">Cancel (Keep Recipe)</button>
        </div>
    )
}
