import GameCard from "../components/GameCard"

export default function Home({ games, loading, error }) {
    // Generate random index based on games array length
    const randomGame = games.length > 0 ? Math.floor(Math.random() * games.length) : 0;
    
    return (<>
        <h1 className="text-5xl text-center my-9 font-bold">Home</h1>

        {games.length > 0 && (
            <div
                className="relative h-64 md:h-96 bg-cover bg-center rounded-lg shadow-xl mb-8 flex items-end p-6"
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
            {!loading && !error && games.map(game => (
                <GameCard key={game.id} game={game} />
            ))}
        </div>
    </>
    )
}