import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRandomRecipeThunk } from "../../store/recipes"

export default function OtherRecipes() {
    const dispatch = useDispatch()
    const recipe = useSelector(state => state.recipes.singleRecipe)

    useEffect(() => {
        dispatch(getRandomRecipeThunk())
    }, [dispatch])

    console.log(recipe)

    return (
        <>
            <h3>hello from other recipes</h3>
            <div className="otherrecipe-container">
                <h2>Other recipe container</h2>
            </div>
        </>
    )
}
