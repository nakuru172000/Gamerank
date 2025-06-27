import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import FavoriteButton from "../components/FavoriteButton";

export default function GamePage() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const initialUrl = `https://api.rawg.io/api/games/${id}?key=40bd261d04944873a0081e285d07a619`;

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
    
      <h1 className=" ms-5 text-4xl font-bold text-white">
      {data?.name || 'Game Title'}
    </h1>
     <div className="flex flex-col lg:flex-row gap-8 nearblack rounded-xl p-6 shadow-2xl mt-5">

  <div className="lg:w-1/1 space-y-6 text-gray-100">
 
    <p className="text-sm text-gray-400">
      Released: {data?.released ? new Date(data.released).toLocaleDateString() : 'N/A'}
    </p>
   
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
        {data?.rating?.toFixed(1) || '?'}
      </div>
      <span className="text-lg">Rating</span>
      
    </div>
      <div className="lg:w-1/2">    
    <img 
      src={data?.background_image || 'https://via.placeholder.com/800x450?text=No+Image'} 
      alt={data?.name || 'Game cover'} 
      className="w-full h-auto rounded-lg object-cover shadow-lg"
    />
  </div>
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">About</h2>
      <p className="text-gray-300 leading-relaxed">
        {data?.description_raw || 'No description available.'}
      </p>
    
      <Link to={"/"}  className="
          relative px-3  my-9 ms-4 rounded-lg font-medium text-black
          bg-amber-400
          border-b-4 border-amber-600
          transition-all duration-200 ease-out
          transform hover:-translate-y-1 active:translate-y-0
          active:border-b-2 active:mt-[2px]
          shadow-lg hover:shadow-xl
          focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50
          group overflow-hidden
        ">Back</Link>
        <div className="relative buttom left-100 z-100"  ><FavoriteButton /></div>
   
    </div>
  </div>

</div>
         
  

        </>
    );
}











