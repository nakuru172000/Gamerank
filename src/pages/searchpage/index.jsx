import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useFetch from "../../customHooks/useFetch";
import GameCard from "../../components/GameCard";

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const gameQuery = searchParams.get("query");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchError, setSearchError] = useState(null);

    const initialUrl = `https://api.rawg.io/api/games?key=40bd261d04944873a0081e285d07a619&search=${gameQuery}&page=${currentPage}`;
    const { loading, data, error, updateUrl } = useFetch(initialUrl);

    useEffect(() => {
        // Validate search query
        if (!gameQuery || gameQuery.trim() === "") {
            setSearchError("Please enter a search term");
            navigate("/"); // Redirect to home or search page without query
            return;
        }
        
        setSearchError(null);
        updateUrl(initialUrl);
    }, [gameQuery, initialUrl, updateUrl, navigate]);

    const hasResults = data?.results?.length > 0;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-5xl text-center my-9 font-bold">
                Search Results for: {gameQuery}
            </h1>

            {searchError && (
                <div className="text-red-500 text-center my-8 text-xl">
                    {searchError}
                </div>
            )}

            {loading && <p>Loading...</p>}

            {error && (
                <div className="text-red-500 text-center my-8">
                    Error: {error.message || "Failed to fetch games"}
                </div>
            )}

            {!loading && !error && !hasResults && !searchError && (
                <div className="text-center my-8 text-xl">
                    No games found matching "{gameQuery}"
                </div>
            )}

            {hasResults && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {data.results.map((game) => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>
                    <div className="flex justify-center mt-8 space-x-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-amber-400 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2">
                            Page {currentPage}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            disabled={!data.next}
                            className="px-4 py-2 bg-amber-400 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}