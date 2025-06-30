import { useContext } from "react";
import { supabase } from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import RealtimeChat from "./RealtimeChat";

export default function Chatbox({ data }) {
    const { session } = useContext(SessionContext);

    const handleMessageSubmit = async (event) => {
        event.preventDefault();
        const inputMessage = event.currentTarget;
        const { message } = Object.fromEntries(new FormData(inputMessage));
                
        if (typeof message === "string" && message.trim().length !== 0) {
            const { error } = await supabase
                .from("messages")
                .insert({
                    profile_id: session?.user.id,
                    profile_username: session?.user.user_metadata.username,
                    game_id: data.id,
                    content: message,
                });
                            
            if (error) {
                console.log(error);
            } else {
                inputMessage.reset();
            }
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-2xl">
            <div className="nearblack p-6 rounded-lg shadow-lg shadow-amber-900/30">
                <div className="mb-6 rounded-lg min-h-[300px] ">
                    <RealtimeChat data={data && data} />
                </div>
                                
                <form onSubmit={handleMessageSubmit} className="space-y-4">
                    <fieldset role="group" className="space-y-4">
                        <div className="space-y-2">
                            <input
                                type="text"
                                name="message"
                                placeholder={session ? "Chat..." : "Please log in to chat"}
                                disabled={!session}
                                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>
                                                
                        {session && (
                            <button
                                type="submit"
                                className="w-full sm:w-auto relative px-4 rounded-lg font-medium text-black
                                    bg-amber-400 hover:bg-amber-500
                                    border-b-4 border-amber-600
                                    transition-all duration-200 ease-out
                                    transform hover:-translate-y-1 active:translate-y-0
                                    active:border-b-2 active:mt-[2px]
                                    shadow-lg hover:shadow-xl
                                    focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50"
                            >
                                Submit
                            </button>
                        )}
                    </fieldset>
                </form>
            </div>
        </div>
    );
}