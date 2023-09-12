import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getUserRecipesThunk } from "../../store/recipes"
import RecipeDelete from "../RecipeDelete"
import OpenModalButton from "../OpenModalButton"
import RecipeEdit from "../RecipeEdit"

export default function RecipeCategory() {
    const dispatch = useDispatch()
    const { category } = useParams()
    const recipes = useSelector(state => Object.values(state.recipes.allRecipes))
    const categoryRecipes = recipes.filter(recipe => recipe.category === category)

    useEffect(() => {
        dispatch(getUserRecipesThunk())
    }, [dispatch])

    return (
        <div>
            <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            {categoryRecipes.map(recipe => (
                <>
                    <h3 key={recipe.id || recipe.title}>{recipe.title}</h3>
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
