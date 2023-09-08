import { useDispatch, useSelector } from "react-redux"
import { getRecipesThunk } from "../../store/recipes"
import { useEffect } from "react"

export default function MainPage() {
    const dispatch = useDispatch()
    const recipes = useSelector(state => Object.values(state.recipes.allRecipes))

    useEffect(() => {
        dispatch(getRecipesThunk())
    }, [dispatch])

    console.log(recipes)
    return (
        <>
            <div>Hello! from MainPage</div>
            <div className="category-container">
                <div>breakfast</div>
                <div>lunch</div>
                <div>dinner</div>
                <div>dessert</div>
            </div>
        </>
    )
}
