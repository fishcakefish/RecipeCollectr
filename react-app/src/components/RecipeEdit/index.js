import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { editRecipeThunk } from "../../store/recipes"
import { useModal } from "../../context/Modal"

export default function RecipeEdit({ recipeId }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const chosenRecipe = useSelector(state => Object.values(state.recipes.allRecipes)).filter(recipe => recipe.id === recipeId)[0]
    const [category, setCategory] = useState(chosenRecipe.category)
    const [title, setTitle] = useState(chosenRecipe.title)
    const [link, setLink] = useState(chosenRecipe.recipe_link)
    const [description, setDescription] = useState(chosenRecipe.description)
    const [errros, setErrors] = useState({})
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()
        let validationErrors = {}
        if (category === "") validationErrors.category = 'Please choose a Category'
        if (!title) validationErrors.title = 'Please provide a valid Title'
        if (!link) validationErrors.link = 'Please provide a valid Link'
        if (!description) validationErrors.description = 'Please provide a valid Description'
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        const formData = new FormData()
        formData.append("category", category)
        formData.append("title", title)
        formData.append("recipe_link", link)
        formData.append("description", description)

        try {
            const newRecipe = await dispatch(editRecipeThunk(formData, recipeId))
            history.push(`/${newRecipe?.editedRecipe.id}`)
            closeModal()
        } catch (error) {
            console.error('Error creating recipe:', error)
        }
    }

    return (
        <div className="index">
            <div className="recipe-create-div">
                <h1>Edit Recipe</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <section id='create-form-data'>
                            <label className="create-form-elements">
                                Category:
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}>
                                    <option value="breakfast">Breakfast</option>
                                    <option value="lunch">Lunch</option>
                                    <option value="dinner">Dinner</option>
                                    <option value="dessert">Dessert</option>
                                </select>
                            </label>
                            {errros.category && <p className="create-validators">{errros.category}</p>}
                            <label className="create-form-elements">
                                Title:
                                <input
                                    className="recipe-inputs"
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </label>
                            {errros.title && <p className="create-validators">{errros.title}</p>}
                            <label className="create-form-elements">
                                Recipe Link:
                                <input
                                    className="recipe-inputs"
                                    type="text"
                                    placeholder="Recipe Link"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                />
                            </label>
                            {errros.link && <p className="create-validators">{errros.link}</p>}
                            <label className="create-form-elements">
                                Description:
                                <input
                                    className="recipe-inputs"
                                    type="text"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </label>
                            {errros.description && <p className="create-validators">{errros.description}</p>}
                        </section>
                        <button type="submit" className="submit-button">Edit Recipe</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
