import { useDispatch, useSelector } from "react-redux"
import { getUserRecipesThunk } from "../../store/recipes"
import { useEffect, useState } from "react"
import MyRecipes from "./MyRecipes"
import OtherRecipes from "./OtherRecipes"
import "./MainPage.css"

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
        dispatch(getUserRecipesThunk())
    }, [dispatch])

    return (
        <>
            <div className="main-page-container">
                <div>Hello! from MainPage</div>
                <div>{ yourRecipes ? <MyRecipes /> : <OtherRecipes /> }</div>
                <div className="your-recipes-container">
                    <button onClick={handleMyClick}>My Recipes</button>
                    <button onClick={handleOtherClick}>Other Recipes</button>
                </div>
            </div>
        </>
    )
}
