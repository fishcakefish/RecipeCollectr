const GET_RECIPES = "recipes/getRecipes"
const GET_RECIPE = "recipes/getRecipe"

const getRecipesAction = (recipes) => {
    return {
        type: GET_RECIPES,
        recipes
    }
}

const getRecipeAction = (recipe) => {
    return {
        type: GET_RECIPE,
        recipe
    }
}

export const getRecipesThunk = () => async dispatch => {
    const res = await fetch(`/api/recipes`)

    if (res.ok) {
        const recipes = await res.json()
        dispatch(getRecipesAction(recipes))
        return recipes
    }
}

export const getRecipeThunk = (recipeId) => async dispatch => {
    const res = await fetch(`/api/recipes/${recipeId}`)

    if (res.ok) {
        const recipe = await res.json()
        dispatch(getRecipeAction(recipe))
        return recipe
    }
}

export const getRandomRecipeThunk = () => async dispatch => {
    const res = await fetch(`/api/recipes/random`)

    if (res.ok) {
        const recipe = await res.json()
        dispatch(getRecipeAction(recipe))
        return recipe
    }
}

const initialState = { allRecipes: {}, singleRecipe: {} }

const recipeReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case GET_RECIPES: {
            newState = { ...state, allRecipes: {}, singleRecipe: {} }
            action.recipes.forEach(recipe => newState.allRecipes[recipe.id] = recipe)
            return newState
        }
        case GET_RECIPE: {
            newState = { ...state, allRecipes: { ...state.allRecipes }, singleRecipe: {} }
            newState.singleRecipe = action.recipe
            return newState
        }
        default:
            return state
    }
}

export default recipeReducer
