import { useContext } from "react";
import SessionContext from "../../context/SessionContext";
import FavoritesContext from "../../context/FavoritesContext";
import { FaTrashAlt } from "react-icons/fa";

export default function ProfilePage() {
  const { session } = useContext(SessionContext);
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h4 className="text-amber-400 text-2xl mb-4 ps-4">
        Ciao {session?.user.user_metadata.first_name} 👋🏼
      </h4>

      <div className="nearblack p-6 rounded-lg shadow-xl shadow-amber-900">
        <h5 className="text-gray-300 text-lg mb-4">I tuoi giochi preferiti:</h5>

        {favorites.length === 0 ? (
          <p className="text-gray-400 text-sm">Non ci sono favoriti al momento...</p>
        ) : (
          <ul className="space-y-4">
            {favorites.map((game) => (
              <li
                key={game.game_id}
                className="flex items-center justify-between gap-4 bg-gray-600/50 p-3 rounded shadow-md"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={game.game_image}
                    alt={game.game_name}
                    width={50}
                    height={50}
                    className="rounded object-cover shadow"
                  />
                  <p className="text-gray-100 font-medium text-sm">
                    {game.game_name}
                  </p>
                </div>
                <button
                  onClick={() => removeFavorite(game.game_id)}
                  className="text-red-400 hover:text-red-600 transition-transform duration-300 transform hover:scale-125 active:scale-90"
                  title="Rimuovi dai preferiti"
                >
                  <FaTrashAlt className="text-lg" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
