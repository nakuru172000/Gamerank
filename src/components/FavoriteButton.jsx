import { useContext } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
// import { supabase } from "../supabase/supabase-client";
// import SessionContext from "../context/SessionContext";
import FavoritesContext from "../context/FavoritesContext";

export default function FavoriteButton({ game }) {
    const {favorites,addFavorites,removeFavorite}=useContext(FavoritesContext);
    const isFavorite=()=>favorites.find((el)=>+el.game_id === game?.id)


  return (
    <div>
      {isFavorite() ? (
        <button  onClick={() => removeFavorite(game)}  style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '24px',
                color: isFavorite() ? '#ffc107' : '#ccc',
                transition: 'color 1s ease-in-out',     
            }} >
         <FaStar style={{ display: 'inline-block !important' }} className='text-3xl' />
        </button>
      ) : (
        <button onClick={() => addFavorites(game)}>
          <FaRegStar style={{ transition: 'all 0.5s ease-in-out', }} className='text-amber-300 text-3xl rounded-3xl' />
        </button>
      )}
    </div>
  );
}

//   const { session } = useContext(SessionContext);
//   const [favorites, setFavorites] = useState([]);

//   const isFavorite = () => favorites.find((el) => +el.game_id === game.id);

//   const addFavorites = async (game) => {
//     const { data, error } = await supabase
//       .from("favorites")
//       .insert([
//         {
//           user_id: session?.user.id,
//           game_id: game.id,
//           game_name: game.name,
//           game_image: game.background_image,
//         },
//       ])
//       .select();
//     if (error) {
//       alert(error);
//     } else {
//       setFavorites(data);
//     }
//   };

//   const removeFavorite = async (game) => {
//     const { error } = await supabase
//       .from("favorites")
//       .delete()
//       .eq("game_id", game.id)
//       .eq("user_id", session?.user.id);
//     if (error) {
//       alert(error);
//     } else {
//       setFavorites((prev) =>
//         prev.filter(
//           (el) => el.game_id !== game.id && el.user_id !== session?.user.id
//         )
//       );
//     }
//   };