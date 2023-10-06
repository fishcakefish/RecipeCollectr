import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getUserRecipesThunk } from "../../store/recipes"
import RecipeDelete from "../RecipeDelete"
import OpenModalButton from "../OpenModalButton"
import RecipeEdit from "../RecipeEdit"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import './RecipeCategory.css'
import RecipeCategorySearch from "../RecipeCategorySearch"

export default function RecipeCategory() {
    const dispatch = useDispatch()
    const { category } = useParams()
    const recipes = useSelector(state => Object.values(state.recipes.allRecipes))
    const categoryRecipes = recipes.filter(recipe => recipe.category === category)
    const [isLoading, setIsLoading] = useState(true)
    const [recipeFilter, setRecipeFilter] = useState('')
    const filteredRecipes = categoryRecipes.filter(recipe => recipe.title.toLowerCase().includes(recipeFilter.toLowerCase()))
    console.log(recipes)

    useEffect(() => {
        dispatch(getUserRecipesThunk()).finally(() => {
            setIsLoading(false)
        })
    }, [dispatch])

    if (isLoading) return <h1>{">.<"}</h1>

    if (categoryRecipes.length < 1) {
        return (
            <>
                <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
                <h2><NavLink exact to="/create">Create New Recipe!</NavLink></h2>
                <img src="/NoRecipes.PNG" alt="No Recipes?" />
            </>
        )
    }

    return (
        <div className="recipe-category-container">
            <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            <RecipeCategorySearch category={category} setRecipeFilter={setRecipeFilter}/>
            {filteredRecipes.map(recipe => (

                <div key={recipe.id || recipe.title} className="recipe-category-box">
                    <div className="recipe-category-image-placeholder"></div>
                    <div className="recipe-category-content">
                        <NavLink exact to={`/${recipe.id}`}>
                            <h3>{recipe.title}</h3>
                        </NavLink>
                        <div classname="recipe-category-button-container">
                            <OpenModalButton
                                buttonText={"Edit"}
                                modalComponent={<RecipeEdit recipeId={recipe.id}/>}
                            />
                            <OpenModalButton
                                buttonText={"Delete"}
                                modalComponent={<RecipeDelete recipeId={recipe.id}/>}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
