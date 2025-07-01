import { useParams } from "react-router";
import { useState, useEffect } from "react";
import GameCard from "../../components/GameCard";

export default function GenrePage() {
    const { genre } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://api.rawg.io/api/games?key=40bd261d04944873a0081e285d07a619&genres=${genre}&page=1`
                );
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const json = await response.json();
                setData(json);
                setError(null);
            } catch (error) {
                setError(error.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [genre]);

    if (loading) {
        return <div className="loader"></div>
    }

    if (error) {
        return <div className="text-center text-red-400">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl text-center my-9 font-bold">Results for : <span className="text-amber-400"> {genre}</span> genre</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.results?.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </div>
    );
}