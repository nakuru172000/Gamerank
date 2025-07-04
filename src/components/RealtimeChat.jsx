import { useEffect, useState, useRef, useCallback } from "react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { supabase } from '../supabase/supabase-client';
import { IoRadio } from "react-icons/io5";


dayjs.extend(relativeTime);

export default function RealtimeChat({ data }) {
    const [messages, setMessages] = useState([]);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [error, setError] = useState("");
    const messageRef = useRef(null);

    const scrollSmoothToBottom = () => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    };

    const getInitialMessages = useCallback(async () => {
        setLoadingInitial(true);
        const { data: messages, error } = await supabase
            .from("messages")
            .select("*")
            .eq("game_id", data?.id)
            .order("updated_at");

        if (error) {
            setError(error.message);
            return;
        }
        setLoadingInitial(false);
        setMessages(messages);
    }, [data?.id]);

    useEffect(() => {
        if (data) {
            getInitialMessages();
        }
    }, [data, getInitialMessages]);

    useEffect(() => {
        if (!data?.id) return;

        const channel = supabase
            .channel('public:messages', {
                config: {
                    broadcast: { self: true }
                }
            })
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "messages"
                },
                (payload) => {
                    console.log('Real-time update received:', payload);
                    if (payload.new?.game_id === data.id || payload.old?.game_id === data.id) {
                        if (payload.eventType === 'INSERT') {
                            console.log('Adding new message:', payload.new);
                            setMessages(prev => [...prev, payload.new]);
                        } else if (payload.eventType === 'UPDATE') {
                            setMessages(prev =>
                                prev.map(msg =>
                                    msg.id === payload.new.id ? payload.new : msg
                                )
                            );
                        } else if (payload.eventType === 'DELETE') {
                            setMessages(prev =>
                                prev.filter(msg => msg.id !== payload.old.id)
                            );
                        }
                    }
                }
            )
            // .subscribe((status) => {
            //     console.log('Subscription status:', status);
            // });
        const pollInterval = setInterval(() => {
            getInitialMessages();
        }, 4000);

        return () => {
            supabase.removeChannel(channel);
            clearInterval(pollInterval);
        };
    }, [data?.id, getInitialMessages]);

    useEffect(() => {
        scrollSmoothToBottom();
    }, [messages]);

    return (
        <div className="container mx-auto ">
            <div className="flex items-center justify-between px-4">
                <h4 className="text-2xl font-bold mb-1 text-amber-400">Live Chat </h4>
                <IoRadio className="text-amber-300 heartbeat text-3xl" />
            </div>
            <div className="nearblack p-1 rounded-lg">
                <div
                    ref={messageRef}
                    className="rounded-lg border border-gray-600 mb-4"
                >
                    {loadingInitial && (
                        <div className=" ">

                        </div>
                    )}
                    {error && (
                        <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg mb-4">
                            <p className="text-red-400">Error: {error}</p>
                        </div>
                    )}
                    {messages && messages.length > 0 ? (
                        <div className="space-y-3">
                            {messages.map((message) => (
                                <article
                                    key={message.id}
                                    className="bg-gray-800/50  px-3  border-gray-700 hover:bg-gray-800/70 transition-colors"
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="font-medium text-amber-400">
                                            {message.profile_username}
                                        </p>
                                        {/* {console.log('Updated at:', message.updated_at)} */}
                                        <small className="text-gray-400 text-xs">
                                            {message.updated_at
                                                ? dayjs(message.updated_at).fromNow()
                                                : "Not updated"}
                                        </small>

                                    </div>

                                    <p className="text-gray-200 font-thin tracking-widest text-sm">
                                        {message.content}
                                    </p>
                                </article>
                            ))}
                        </div>
                    ) : !loadingInitial && (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">No messages yet. Start the conversation!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}