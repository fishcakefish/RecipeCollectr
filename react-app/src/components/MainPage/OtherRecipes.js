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
        <>
            <h3>hello from other recipes</h3>
            <div className="otherrecipe-container">
                <h2>Other recipe container</h2>
                <h3>{recipe.title}</h3>
                <button onClick={handleClick}>REFRESH</button>
            </div>
        </>
    )
}
