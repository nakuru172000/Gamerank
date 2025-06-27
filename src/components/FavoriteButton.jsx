import { useContext } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
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

