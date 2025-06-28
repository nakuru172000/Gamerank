import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router";
import FavoriteButton from "../components/FavoriteButton";
import Chatbox from "../components/Chatbox";
import SessionContext from "../context/SessionContext";

export default function GamePage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { session } = useContext(SessionContext);
  const rawgKey = import.meta.env.VITE_RAWG_API_KEY
  const initialUrl = `https://api.rawg.io/api/games/${id}?key=${rawgKey}`;

  const load = async () => {
    try {
      const response = await fetch(initialUrl);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error.message);
      setData(null);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  return (
    <>
      <h1 className="ms-5 text-4xl font-bold text-white">
        {data?.name || 'Game Title'}
      </h1>
      
      <div className="nearblack rounded-xl p-6 shadow-lg shadow-amber-900 mt-5">
        <div className="space-y-6 text-gray-100">
          <p className="text-sm text-gray-400">
            Released: {data?.released ? new Date(data.released).toLocaleDateString() : 'N/A'}
          </p>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
              {data?.rating?.toFixed(1) || '?'}
            </div>
            <span className="text-lg">Rating</span>
            {session && (
              <div className="relative flex items-center justify-center ms-5 z-10">
                <FavoriteButton game={data} />
                <p>Add to Favorites</p>
              </div>
            )}
          </div>  
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/2 space-y-6">
              {/* Image */}
              <img
                src={data?.background_image || 'https://via.placeholder.com/800x450?text=No+Image'}
                alt={data?.name || 'Game cover'}
                className="w-full h-auto rounded-lg object-cover shadow-lg"
              />
              <div className="hidden lg:block space-y-4">
                <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">About</h2>
                <p className="text-gray-300 leading-relaxed">
                  {data?.description_raw || 'No description available.'}
                </p>
                <Link 
                  to={"/"} 
                  className="inline-block px-6  rounded-lg font-medium text-black
                    bg-amber-400 hover:bg-amber-500
                    border-b-4 border-amber-600
                    transition-all duration-200 ease-out
                    transform hover:-translate-y-1 active:translate-y-0
                    active:border-b-2 active:mt-[2px]
                    shadow-lg hover:shadow-xl
                    focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50"
                >
                  Back
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <Chatbox data={data} />
            </div>
          </div>
          <div className="lg:hidden space-y-4">
            <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">About</h2>
            <p className="text-gray-300 leading-relaxed">
              {data?.description_raw || 'No description available.'}
            </p>
            <Link 
              to={"/"} 
              className="inline-block px-6  rounded-lg font-medium text-black
                bg-amber-400 hover:bg-amber-500
                border-b-4 border-amber-600
                transition-all duration-200 ease-out
                transform hover:-translate-y-1 active:translate-y-0
                active:border-b-2 active:mt-[2px]
                shadow-lg hover:shadow-xl
                focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}