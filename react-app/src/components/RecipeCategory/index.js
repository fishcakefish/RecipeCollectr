import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getUserRecipesThunk } from "../../store/recipes"
import RecipeDelete from "../RecipeDelete"
import OpenModalButton from "../OpenModalButton"
import RecipeEdit from "../RecipeEdit"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"

export default function RecipeCategory() {
    const dispatch = useDispatch()
    const { category } = useParams()
    const recipes = useSelector(state => Object.values(state.recipes.allRecipes))
    const categoryRecipes = recipes.filter(recipe => recipe.category === category)
    const [isLoading, setIsLoading] = useState(true)

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
        <div>
            <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            {categoryRecipes.map(recipe => (
                <>
                    <NavLink exact to={`/${recipe.id}`}><h3 key={recipe.id || recipe.title}>{recipe.title}</h3></NavLink>
                    <div>
                        <OpenModalButton
                            buttonText={"Edit"}
                            modalComponent={<RecipeEdit recipeId={recipe.id}/>}
                        />
                        <OpenModalButton
                            buttonText={"Delete"}
                            modalComponent={<RecipeDelete recipeId={recipe.id}/>}
                        />
                    </div>
                </>
            ))}
        </div>
    )
}
