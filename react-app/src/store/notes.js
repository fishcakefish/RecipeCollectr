const GET_NOTES = "notes/getNotes"
const GET_NOTE = "notes/getNote"
const POST_NOTE = "notes/postNote"
const EDIT_NOTE = "notes/editNote"
const DELETE_NOTE = "notes/deleteNote"

const getNotesAction = (notes) => {
    return {
        type: GET_NOTES,
        notes
    }
}

const getNoteAction = (note) => {
    return {
        type: GET_NOTE,
        note
    }
}

const postNoteAction = (note) => {
    return {
        type: POST_NOTE,
        note
    }
}

const editNoteAction = (note) => {
    return {
        type: EDIT_NOTE,
        note
    }
}

const deleteNoteAction = (noteId) => {
    return {
        type: DELETE_NOTE,
        noteId
    }
}

export const getNotesThunk = () => async dispatch => {
    const res = await fetch(`/api/notes`)

    if (res.ok) {
        const notes = await res.json()
        dispatch(getNotesAction(notes))
        return notes
    }
}

export const getRecipeNotesThunk = (recipeId) => async dispatch => {
    const res = await fetch(`/api/notes/recipe/${recipeId}`)

    if (res.ok) {
        const notes = await res.json()
        dispatch(getNotesAction(notes))
        return notes
    }
}

export const getNoteThunk = (noteId) => async dispatch => {
    const res = await fetch(`/api/notes/${noteId}`)

    if (res.ok) {
        const note = await res.json()
        dispatch(getNoteAction(note))
        return note
    }
}

export const postNoteThunk = (note, recipeId) => async dispatch => {
    const res = await fetch(`/api/notes/recipe/${recipeId}`, {
        method: 'POST',
        body: note
    })

    if (res.ok) {
        const postedNote = await res.json()
        dispatch(postNoteAction(postedNote))
        return postedNote
    }
}

export const editNoteThunk = (note, noteId) => async dispatch => {
    const res = await fetch(`/api/notes/${noteId}`, {
        method: 'PUT',
        body: note
    })

    if (res.ok) {
        const note = await res.json()
        dispatch(editNoteAction(note))
        return note
    }
}

export const deleteNoteThunk = (noteId) => async dispatch => {
    const res = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        await res.json()
        dispatch(deleteNoteAction(noteId))
        return `deleted note with id: ${noteId}`
    }
}

const initialState = { allNotes: {}, singleNote: {} }

const noteReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case GET_NOTES: {
            newState = { ...state, allNotes: {}, singleNote: {} }
            action.notes.forEach(note => newState.allNotes[note.id] = note)
            return newState
        }
        case GET_NOTE: {
            newState = { ...state, allNotes: { ...state.allNotes }, singleNote: {} }
            newState.singleNote = action.note
            return newState
        }
        case POST_NOTE: {
            newState = { ...state, allNotes: { ...state.allNotes }, singleNote: {} }
            newState.allNotes[action.note.id] = action.note
            newState.singleNote = action.note
            return newState
        }
        case EDIT_NOTE: {
            newState = { ...state, allNotes: { ...state.allNotes }, singleNote: {} }
            newState.allNotes[action.note.id] = action.note
            newState.singleNote = action.note
            return newState
        }
        case DELETE_NOTE: {
            newState = { ...state, allNotes: { ...state.allNotes }, singleNote: {} }
            delete newState.allNotes[action.noteId]
            return newState
        }
        default:
            return state
    }
}

export default noteReducer
