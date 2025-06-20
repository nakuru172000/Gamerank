import CustomLazyLoadImage from "./CustomLazyLoadImage";
import { Link } from "react-router";

export default function GameCard({ game }) {
  const { background_image: image } = game;

  return (
    <div key={game.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
      {/* <img
        src={game.background_image || 'https://via.placeholder.com/400x225?text=No+Image'}
        alt={game.name}
        className="w-full h-48 object-cover"
      /> */}
      <CustomLazyLoadImage image={image} />

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-white truncate">{game.name}</h3>
        <div className="flex items-center text-sm text-gray-400 mb-2">
          {game.rating > 0 && (
            <span className="flex items-center mr-2">
              <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.725c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
              {game.rating} / 5
            </span>
          )}
          {game.metacritic && (
            <span className={`px-2 py-1 rounded text-xs font-semibold ${game.metacritic >= 75 ? 'bg-green-600' :
                game.metacritic >= 50 ? 'bg-yellow-600' : 'bg-red-600'
              }`}>
              {game.metacritic}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-400">
          Rilascio: {game.released || 'N/A'}
        </p>
        <p className="text-sm text-gray-400">
          Piattaforme: {game.platforms ? game.platforms.map(p => p.platform.name).join(', ') : 'N/A'}
        </p>
       
          <Link className=" bg-neutral-300 cursor-pointer rounded-3xl px-3 m-2" to={`/games/${game.slug}/${game.id}`}>more</Link>
        
      </div>
    </div>
  );
}