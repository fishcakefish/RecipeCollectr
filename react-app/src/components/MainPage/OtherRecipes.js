import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRandomRecipeThunk } from "../../store/recipes"

export default function OtherRecipes() {
    const dispatch = useDispatch()
    const recipe = useSelector(state => state.recipes.singleRecipe)
    const [toggle, setToggle] = useState(0)

    const handleClick = async (e) => {
        e.preventDefault()
        setToggle(toggle + 1)
    }

    useEffect(() => {
        dispatch(getRandomRecipeThunk())
    }, [dispatch, toggle])

    console.log(recipe)

    return (
        <div className="other-recipes-container">
            <button onClick={handleClick}>REFRESH</button>
            <div className="otherrecipe-container">
                <h2>{recipe.title}</h2>
                <h3>{recipe.description}</h3>
                <h4>Link: <a href={recipe.recipe_link} target="_blank" rel="noopener noreferrer">{recipe.recipe_link}</a></h4>
            </div>
        </div>
    )
}
