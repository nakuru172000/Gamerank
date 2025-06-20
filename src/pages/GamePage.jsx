import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function GamePage() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const initialUrl = `https://api.rawg.io/api/games/${id}?key=92691957491e44539d7a2d10ce87ab15`;

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
            {error && <h1>{error}</h1>}
            <div className="style-gamepage">
                <div className="style-game-info">
                    <p>{data && data.released}</p>
                    <h1>{data && data.name}</h1>
                    <p>Rating: {data && data.rating}</p>
                    <p>About:</p>
                    <p>{data && data.description_raw}</p>
                </div>
                <div className="style-game-image">
                    <img src={data && data.background_image} alt="" />
                </div>
            </div>
        </>
    );
}











// import { useParams } from "react-router";
// import { useEffect, useState } from "react";

// export default function GamePage() {
//     const [data, setData] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const { id } = useParams();

//     useEffect(() => {
//         const load = async () => {
//             try {
//                 setLoading(true);
//                 // Corrected the API endpoint - you need to fetch a specific game by ID
//                 const response = await fetch(
//                     `https://api.rawg.io/api/games/${id}?key=40bd261d04944873a0081e285d07a619`
//                 );
//                 if (!response.ok) {
//                     throw new Error(response.statusText);
//                 }
//                 const json = await response.json();
//                 setData(json);
//                 setError(null);
//             } catch (error) {
//                 setError(error.message);
//                 setData(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         load();
//     }, [id]);

//     if (loading) {
//         return <div className="text-center text-white">Loading...</div>;
//     }

//     return (
//         <>
//             {error && <h1 className="text-red-600 text-2xl font-bold text-center my-4">{error}</h1>}
//             {data && (
//                 <div className="flex flex-col lg:flex-row gap-8 p-6 max-w-7xl mx-auto">
//                     <div className="lg:w-1/2 space-y-4">
//                         <p className="text-gray-500 text-sm">
//                             {new Date(data.released).toLocaleDateString()}
//                         </p>
//                         <h1 className="text-4xl font-bold text-white">{data.name}</h1>
                        
//                         <div className="flex items-center gap-2">
//                             <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
//                                 {data.rating?.toFixed(1)}
//                             </div>
//                             <span className="text-white">Rating</span>
//                         </div>

//                         <div className="space-y-2">
//                             <h2 className="text-2xl font-semibold text-white">About</h2>
//                             <p className="text-gray-300 leading-relaxed">
//                                 {data.description_raw || data.description}
//                             </p>
//                         </div>
//                     </div>
                    
//                     <div className="lg:w-1/2">
//                         <img 
//                             src={data.background_image} 
//                             alt={data.name}
//                             className="w-full h-auto rounded-lg shadow-xl object-cover"
//                         />
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }