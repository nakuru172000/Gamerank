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
                 className="w-full py-2 pl-10 pr-4 rounded-full nearblack text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-gray-300 transition-all"
                name="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-invalid={ariaInvalid ? "true" : "false"}
                placeholder="Search"
            />
            <input type="submit" value="" />
        </form>
    );
}



