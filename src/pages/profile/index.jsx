import { useContext } from "react";
import SessionContext from "../../context/SessionContext";
import FavoritesContext from "../../context/FavoritesContext";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router";

export default function ProfilePage() {
  const { session } = useContext(SessionContext);
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <div className="container flex flex-col justify-center items-center mx-auto p-6 max-w-md">
      <h4 className="text-amber-400 text-2xl mb-4  text-center">
        Welcome {session?.user.user_metadata.first_name}
      </h4>

      <div className="nearblack py-6 px-9 rounded-lg shadow-xl shadow-amber-900 min-w-xl lg:min-w-3xl flex-col  justify-center">
        <h5 className="text-gray-300 text-lg mb-4 text-center sm:text-start">Your favorite games:</h5>

        {favorites.length === 0 ? (
          <p className="text-gray-400 text-sm">No favorites yet!...</p>
        ) : (
          <ul className="space-y-4 ">
            {favorites.map((game) => (
              <li name="link"
                key={game.game_id}
                className="flex  justify-between mx-auto  bg-gray-600/50 p-1 px-3 rounded  max-w-4/6 md:max-w-none "
              >
                <div className="flex items-center  gap-4">
                  <img
                    src={game.game_image}
                    alt={game.game_name}
                    width={100}
                    height={100}
                    className="rounded object-cover shadow"
                  />
                  <p className="text-gray-100 font-medium text-sm">
                    {game.game_name}
                  </p>


                </div>
                <div className="flex items-center">
                  <Link title="more info"
                    to={`/games/${game.slug}/${game.id}`}
className="mx-3 transition-transform duration-300 transform hover:scale-125 active:scale-90"
                  >
                    <svg
                      className="w-8 h-8 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.75-3 2.75-3 5z" />
                    </svg>
                  </Link>
                  <button
                    onClick={() => removeFavorite(game.game_id)}
                    className="text-red-400 hover:text-red-600 transition-transform duration-300 transform hover:scale-125 active:scale-90"
                    title="Remove from favorites"
                  >

                    <FaTrashAlt className="text-lg" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
