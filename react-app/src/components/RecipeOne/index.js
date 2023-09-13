import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getRecipeThunk } from "../../store/recipes"
import { getRecipeNotesThunk } from "../../store/notes"
import NoteEdit from "../NoteEdit"
import OpenModalButton from "../OpenModalButton"
import NoteDelete from "../NoteDelete"
import NoteCreate from "../NoteCreate"

export default function RecipeOne() {
    const dispatch = useDispatch()
    const { recipeId } = useParams()
    const recipe = useSelector(state => state.recipes.singleRecipe)
    const notes = useSelector(state => Object.values(state.notes.allNotes))
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchRecipe() {
            await dispatch(getRecipeThunk(recipeId))
            await dispatch(getRecipeNotesThunk(recipeId))
            setIsLoading(false)
        }

        fetchRecipe()
    }, [dispatch])

    if (isLoading) {
        return (
            <h1>{">.<"}</h1>
        )
    }

    return (
        <>
            <h1>Hello from RecipeOne component</h1>
            <h2>{recipe.title}</h2>
            <OpenModalButton
                buttonText={"Add Note"}
                modalComponent={<NoteCreate recipeId={recipe.id}/>}
            />
            <h2>Your Notes: (bug: refresh if editing or adding notes)</h2>
            {notes.map(note => (
                <div key={note.id}>
                    <h3>{note.entry}</h3>
                    <div>
                        <OpenModalButton
                            buttonText={"Edit"}
                            modalComponent={<NoteEdit note={note} noteId={note.id} recipeId={recipeId}/>}
                        />
                        <OpenModalButton
                            buttonText={"Delete"}
                            modalComponent={<NoteDelete noteId={note.id}/>}
                        />
                    </div>
                </div>
            ))}
        </>
    )
}
