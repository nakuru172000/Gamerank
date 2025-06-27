import { useState } from 'react';
import GameCard from "../components/GameCard";

export default function Home({ games, loading, error }) {
    const [currentPage, setCurrentPage] = useState(1);
    const gamesPerPage = 10;
    const randomGame = games.length > 0 ? Math.floor(Math.random() * games.length) : 0;
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);
    const totalPages = Math.ceil(games.length / gamesPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <h4 className="text-4xl text-amber-400">Trending now</h4>
            {games.length > 0 && (
                <div
                    className="relative h-64 md:h-96 bg-cover bg-center shadow-md shadow-amber-900 rounded-lg mb-9 mt-9 flex items-end p-6"
                    style={{ backgroundImage: `url(${games[randomGame].background_image})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80 rounded-lg"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
                            {games[randomGame].name}
                        </h2>
                        <p className="text-lg text-gray-300">
                            {games[randomGame].genres.map(g => g.name).join(', ')}
                        </p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {!loading && !error && currentGames.map(game => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>

            {/* Pagination  */}
            {games.length > gamesPerPage && (
                <div className="flex justify-center mt-8 space-x-2">           
                    <button
                        onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-md ${currentPage === 1
                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                : 'bg-amber-500 hover:bg-amber-600 text-black'
                            }`}
                    >
                        Prev
                    </button>      
                    {[...Array(totalPages).keys()].map(number => (
                        <button
                            key={number + 1}
                            onClick={() => paginate(number + 1)}
                            className={`px-4 py-2 rounded-md ${currentPage === number + 1
                                    ? 'bg-amber-500 text-black font-bold'
                                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                                }`}
                        >
                            {number + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-md ${currentPage === totalPages
                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                : 'bg-amber-500 hover:bg-amber-600 text-black'
                            }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    )
}