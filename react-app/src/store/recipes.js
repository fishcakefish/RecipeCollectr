const GET_RECIPES = "recipes/getRecipes"
const GET_RECIPE = "recipes/getRecipe"
const POST_RECIPE = "recipes/postRecipe"
const EDIT_RECIPE = "recipes/editRecipe"
const DELETE_RECIPE = "recipes/deleteRecipe"

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

const postRecipeAction = (recipe) => {
    return {
        type: POST_RECIPE,
        recipe
    }
}

const editRecipeAction = (recipe) => {
    return {
        type: EDIT_RECIPE,
        recipe
    }
}

const deleteRecipeAction = (recipeId) => {
    return {
        type: DELETE_RECIPE,
        recipeId
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
    console.log('test')
    const res = await fetch(`/api/recipes/${recipeId}`)

    if (res.ok) {
        const recipe = await res.json()
        console.log(recipe)
        dispatch(getRecipeAction(recipe))
        return recipe
    }
}

export const getUserRecipesThunk = () => async dispatch => {
    const res = await fetch(`/api/recipes/user`)

    if (res.ok) {
        const recipes = await res.json()
        dispatch(getRecipesAction(recipes))
        return recipes
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

export const postRecipeThunk = (recipe, user) => async dispatch => {
    const res = await fetch(`/api/recipes/create`, {
        method: 'POST',
        body: recipe
    })

    if (res.ok) {
        if (!user) throw new Error('Please log in to create a song')
        const postedRecipe = await res.json()
        dispatch(postRecipeAction(postedRecipe))
        console.log('@@THROUGH DISPATCH')
        return postedRecipe
    }
}

export const editRecipeThunk = (recipe, recipeId) => async dispatch => {
    const res = await fetch(`/api/recipes/${recipeId}`, {
        method: 'PUT',
        body: recipe
    })

    if (res.ok) {
        const recipe = await res.json()
        dispatch(editRecipeAction(recipe))
        return recipe
    }
}

export const deleteRecipeThunk = (recipeId) => async dispatch => {
    const res = await fetch(`/api/recipes/${recipeId}`, {
        method: 'DELETE',
    })

    if (res.ok) {
        await res.json()
        dispatch(deleteRecipeAction(recipeId))
        return `deleted recipe with id: ${recipeId}`
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
        case POST_RECIPE: {
            newState = { ...state, allRecipes: { ...state.allRecipes }, singleRecipe: {} }
            newState.allRecipes[action.recipe.id] = action.recipe
            newState.singleRecipe = action.recipe
            return newState
        }
        case EDIT_RECIPE: {
            newState = { ...state, allRecipes: { ...state.allRecipes }, singleRecipe: {} }
            newState.allRecipes[action.recipe.id] = action.recipe
            newState.singleRecipe = action.recipe
            return newState
        }
        case DELETE_RECIPE: {
            newState = { ...state, allRecipes: { ...state.allRecipes }, singleRecipe: {} }
            delete newState.allRecipes[action.recipeId]
            return newState
        }
        default:
            return state
    }
}

export default recipeReducer
