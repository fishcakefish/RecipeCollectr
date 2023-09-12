import { useState } from "react"
import MyRecipes from "./MyRecipes"
import OtherRecipes from "./OtherRecipes"
import "./MainPage.css"
import { useSelector } from "react-redux"
import LoginFormPage from "../LoginFormPage"

export default function MainPage() {
    const [yourRecipes, setYourRecipes] = useState(true)
    const user = useSelector(state => state.session.user)

    const handleMyClick = async(e) => {
        e.preventDefault()
        setYourRecipes(true)
    }

    const handleOtherClick = async(e) => {
        e.preventDefault()
        setYourRecipes(false)
    }

    if (!user) {
        return (
            <LoginFormPage />
        )
    }

    return (
        <>
            <div className="main-page-container">
                <div>Hello! from MainPage</div>
                <div>.</div>
                <div>{ yourRecipes ? <MyRecipes /> : <OtherRecipes /> }</div>
                <div className="your-recipes-container">
                    <button onClick={handleMyClick}>My Recipes</button>
                    <button onClick={handleOtherClick}>Other Recipes</button>
                </div>
            </div>
        </>
    )
}
