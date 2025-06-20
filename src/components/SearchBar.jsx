import { useState } from "react";
import { useNavigate } from "react-router";

export default function SearchBar() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [ariaInvalid, setAriaInvalid] = useState(null);

    const handleSearch = (event) => {
        event.preventDefault();
        if (typeof search === "string" && search.trim().length !== 0) {
            navigate(`/search?query=${search}`);
            setSearch("");
            setAriaInvalid(null);
        } else {
            setAriaInvalid(true);
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                name="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-invalid={ariaInvalid ? "true" : "false"}
                placeholder="Cerca giochi"
            />
            <input type="submit" value="Go" />
        </form>
    );
}