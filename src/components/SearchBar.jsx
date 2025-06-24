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
                placeholder="Cerca giochi"
            />
            <input type="submit" value="" />
        </form>
    );
}




//  <input
//              type="text"
//                 name="search"
//                 value={search}
//                 onChange={(event) => setSearch(event.target.value)}
//                 aria-invalid={ariaInvalid ? "true" : "false"}
//                 placeholder="Cerca giochi"
//               className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-600 transition-all"
//             />
          
//             <svg
//               className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
//             </svg> */}