import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserRecipesThunk } from "../../store/recipes"

export default function MyRecipes() {
    const dispatch = useDispatch()
    const recipes = useSelector(state => Object.values(state.recipes.allRecipes))

    useEffect(() => {
        dispatch(getUserRecipesThunk())
    }, [dispatch])

    console.log(recipes)

    return (
        <>
            <h3>hello from my recipes</h3>
            <div className="category-container">
                <button>breakfast</button>
                <button>lunch</button>
                <button>dinner</button>
                <button>dessert</button>
            </div>
            <h2>space</h2>
        </>
    )
}
