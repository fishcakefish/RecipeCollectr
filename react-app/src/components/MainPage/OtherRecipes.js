import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRandomRecipeThunk } from "../../store/recipes"
import { NavLink } from "react-router-dom"
import './OtherRecipes.css'

export default function OtherRecipes() {
    const dispatch = useDispatch()
    const recipe = useSelector(state => state.recipes.singleRecipe)
    const [toggle, setToggle] = useState(0)
    const [loading, setLoading] = useState(true)

    const handleClick = async (e) => {
        e.preventDefault()
        setLoading(true)
        setToggle(toggle + 1)
    }

    useEffect(() => {
        dispatch(getRandomRecipeThunk()).then(() => {
            setLoading(false)
        })
    }, [dispatch, toggle])

    console.log(recipe)

    if (loading) return <h1>{">.<"}</h1>

    // return (
    //     <div className="other-recipes-container">
    //         <button className="refresh-button" onClick={handleClick}>Refresh</button>
    //         <div className="otherrecipe-container">
    //             <h2>{recipe.title}</h2>
    //             <h3>{recipe.description}</h3>
    //             <h4>Link URL: <a href={recipe.recipe_link} target="_blank" rel="noopener noreferrer">{recipe.recipe_link}</a></h4>
    //         </div>
    //     </div>
    // )
    return (
        <div className="recipe-category-container">
            <button className="refresh-button" onClick={handleClick}>Refresh</button>
            {recipe && (
                <div key={recipe.id} className="recipe-category-box">
                    <div className="recipe-category-image-placeholder"></div>
                    <div className="recipe-category-content">
                        <NavLink exact to={`/${recipe.id}`}>
                            <h3>{recipe.title}</h3>
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    )
}
