import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRandomRecipeThunk } from "../../store/recipes"

export default function OtherRecipes() {
    const dispatch = useDispatch()
    const recipe = useSelector(state => Object.values(state.recipes.singleRecipe))

    useEffect(() => {
        dispatch(getRandomRecipeThunk())
    }, [dispatch])

    console.log(recipe)

    return (
        <>
            <div>hello from other recipes</div>
        </>
    )
}
