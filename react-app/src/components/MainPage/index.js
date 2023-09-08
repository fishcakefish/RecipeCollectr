import { useDispatch, useSelector } from "react-redux"
import { getRecipesThunk } from "../../store/recipes"
import { useEffect, useState } from "react"
import MyRecipes from "./MyRecipes"
import OtherRecipes from "./OtherRecipes"

export default function MainPage() {
    const dispatch = useDispatch()
    const recipes = useSelector(state => Object.values(state.recipes.allRecipes))
    const [yourRecipes, setYourRecipes] = useState(true)

    const handleMyClick = async(e) => {
        e.preventDefault()
        setYourRecipes(true)
    }

    const handleOtherClick = async(e) => {
        e.preventDefault()
        setYourRecipes(false)
    }

    useEffect(() => {
        dispatch(getRecipesThunk())
    }, [dispatch])

    console.log(recipes)
    return (
        <>
            <div>Hello! from MainPage</div>
            <div>{ yourRecipes ? <MyRecipes /> : <OtherRecipes /> }</div>
            <button onClick={handleMyClick}>My Recipes</button>
            <button onClick={handleOtherClick}>Other Recipes</button>
        </>
    )
}
