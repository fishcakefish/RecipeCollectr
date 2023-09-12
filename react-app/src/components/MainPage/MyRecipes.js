import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserRecipesThunk } from "../../store/recipes"
import { NavLink } from "react-router-dom"

export default function MyRecipes() {
    const dispatch = useDispatch()
    const recipes = useSelector(state => Object.values(state.recipes.allRecipes))
    const categories = ['breakfast', 'lunch', 'dinner', 'dessert']

    useEffect(() => {
        dispatch(getUserRecipesThunk())
    }, [dispatch])

    console.log(recipes)

    return (
        <>
            <h3>hello from my recipes</h3>
            <h2><NavLink exact to="/create">Create New Recipe!</NavLink></h2>
            <div className="category-container">
                {categories.map(category => (
                    <NavLink key={category} exact to={`/myrecipes/${category}`}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </NavLink>
                ))}
            </div>
            <h2>space</h2>
        </>
    )
}
