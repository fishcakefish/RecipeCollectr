import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";

export default function RecipeCategorySearch({category, setRecipeFilter}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        setRecipeFilter(searchTerm)
    }, [searchTerm, setRecipeFilter])

    return (
        <div>
            <form>
                <input
                    className="search-input"
                    type="search"
                    placeholder="Search for recipe name..."
                    size='35'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>
        </div>
    )
}
