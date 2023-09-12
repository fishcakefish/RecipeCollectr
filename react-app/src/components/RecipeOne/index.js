import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getRecipeThunk } from "../../store/recipes"

export default function RecipeOne() {
    const dispatch = useDispatch()
    const { recipeId } = useParams()
    const recipe = useSelector(state => state.recipes.singleRecipe)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchRecipe() {
            await dispatch(getRecipeThunk(recipeId))
            setIsLoading(false)
        }

        fetchRecipe()
    }, [dispatch, recipeId])

    if (isLoading) {
        return (
            <h1>{">.<"}</h1>
        )
    }

    return (
        <>
            <h1>Hello from RecipeOne component</h1>
            <h2>{recipe.title}</h2>
        </>
    )
}
