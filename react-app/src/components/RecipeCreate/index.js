import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

export default function RecipeCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [link, setLink] = useState('')
    const [description, setDescription] = useState('')
    const [errros, setErrors] = useState({})

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
        formData.append("link", link)
        formData.append("description", description)

        // try {
        //     const newRecipe = await dispatch(createRecipeThunk(formData, user))
        //     history.push(`/recipes/${newRecipe?.newRecipe.id}`)
        // } catch (error) {
        //     console.error('Error creating recipe:', error)
        // }
    }

    return (
        <div className="index">
            <div className="recipe-create-div">
                <h1>Create a Recipe</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <section id='create-form-data'>
                            <label className="create-form-elements">
                                Category:
                                <select id='category-select'>
                                    <option value="">--Please choose a category</option>
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
                        <button type="submit" className="submit-button">Create Recipe</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
