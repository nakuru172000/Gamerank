import { useState, useEffect, useContext, useCallback } from "react";
import { supabase } from "../supabase/supabase-client";
import SessionContext from "./SessionContext";
import FavoritesContext from "./FavoritesContext";

export default function FavoritesProvider({ children }) {
    const { session } = useContext(SessionContext);
    const [favorites, setFavorites] = useState([]);

    const getFavorites = useCallback(async () => {
        let { data: favourites, error } = await supabase
            .from("favorites")
            .select("*")
            .eq("user_id", session?.user.id);
        if (error) {
            console.log(error);
            console.log("Errore in console");
        } else {
            setFavorites(favourites);
        }
    }, [session]);
    const addFavorites = async (game) => {
        const { data, error } = await supabase
            .from("favorites")
            .insert([
                {
                    user_id: session?.user.id,
                    game_id: game.id,
                    game_name: game.name,
                    game_image: game.background_image,
                },
            ])
            .select();

        if (error) {
            alert(error.message);
        } else if (data) {
            setFavorites((prev) => [...prev, ...data]);
        }
    };

    const removeFavorite = async (gameId) => {
        const { error } = await supabase
            .from("favorites")
            .delete()
            .eq("game_id", gameId)
            .eq("user_id", session?.user.id);
        if (error) {
            console.error("Error removing favorite:", error);
            alert(`Errore nella rimozione: ${error.message}`);
        } else {
            setFavorites((prevFavorites) =>
                prevFavorites.filter((el) => el.game_id !== gameId)
            );
        }
    };

    useEffect(() => {
        if (session) {
            getFavorites();
        }
        const favorites = supabase
            .channel("favorites")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "favorites" },
                () => getFavorites()
            )
            .subscribe();

        return () => {
            if (favorites) {
                supabase.removeChannel(favorites);
            }
        };
    }, [getFavorites, session]);

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                setFavorites,
                addFavorites,
                removeFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}