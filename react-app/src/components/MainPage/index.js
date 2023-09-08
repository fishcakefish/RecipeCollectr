import { useDispatch, useSelector } from "react-redux"
import { getRecipesThunk } from "../../store/recipes"
import { useEffect } from "react"
import MyRecipes from "./MyRecipes"
import OtherRecipes from "./OtherRecipes"

export default function MainPage() {
    const dispatch = useDispatch()
    const recipes = useSelector(state => Object.values(state.recipes.allRecipes))

    useEffect(() => {
        dispatch(getRecipesThunk())
    }, [dispatch])

    console.log(recipes)
    return (
        <>
            <div>Hello! from MainPage</div>
            <MyRecipes />
            <OtherRecipes />
        </>
    )
}
