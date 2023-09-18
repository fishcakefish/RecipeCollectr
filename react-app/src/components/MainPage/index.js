import { useState } from "react"
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
            <div className="main-page-title">{yourRecipes ? <h1>My Recipes</h1> : <h1>Random Recipe</h1>}</div>
            <div className="main-page-container">
                <div>{ yourRecipes ? <MyRecipes /> : <OtherRecipes /> }</div>
                <div className="your-recipes-container">
                    <button onClick={handleMyClick}>My Recipes</button>
                    {/* <button onClick={handleOtherClick}>Other Recipes</button> */}
                    <button onClick={handleOtherClick}>Random Recipe</button>
                </div>
            </div>
        </>
    )
}
