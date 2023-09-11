import { useState } from "react"
import { NavLink } from "react-router-dom"
import MyRecipes from "./MyRecipes"
import OtherRecipes from "./OtherRecipes"
import "./MainPage.css"

export default function MainPage() {
    const [yourRecipes, setYourRecipes] = useState(true)

    const handleMyClick = async(e) => {
        e.preventDefault()
        setYourRecipes(true)
    }

    const handleOtherClick = async(e) => {
        e.preventDefault()
        setYourRecipes(false)
    }

    return (
        <>
            <div className="main-page-container">
                <div>Hello! from MainPage</div>
                <div>.</div>
                <NavLink exact to="/create">Create New Recipe!</NavLink>
                <div>{ yourRecipes ? <MyRecipes /> : <OtherRecipes /> }</div>
                <div className="your-recipes-container">
                    <button onClick={handleMyClick}>My Recipes</button>
                    <button onClick={handleOtherClick}>Other Recipes</button>
                </div>
            </div>
        </>
    )
}
