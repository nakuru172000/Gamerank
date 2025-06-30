import { useState, useEffect, useContext } from 'react'
import { supabase } from '../../supabase/supabase-client'
import SessionContext from '../../context/SessionContext'
import Avatar from '../../components/Avatar';

export default function AccountPage() {
    const { session } = useContext(SessionContext);
    
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [avatar_Url, setAvatarUrl] = useState(null);

    useEffect(() => {
        let ignore = false

        const getProfile = async () => {
            if (!session?.user) return

            setLoading(true)
            const { user } = session

            const { data, error } = await supabase
                .from('profiles')
                .select('username, first_name, last_name,avatar_url')
                .eq('id', user.id)
                .single()

            if (!ignore) {
                if (error) {
                    console.log(error)
                } else if (data) {
                    setUsername(data.username || '');
                    setFirstName(data.first_name || '');
                    setLastName(data.last_name || '');
                    setAvatarUrl(data.avatar_url || "");
                }
            }
            setLoading(false)
        }

        getProfile()

        return () => {
            ignore = true
        }
    }, [session])

    const updateProfile = async (e, avatarUrl) => {
        e.preventDefault()

        if (!session?.user) return

        setLoading(true)
        const { user } = session

        const updates = {
            id: user.id,
            username,
            first_name,
            last_name,
            avatar_url: avatarUrl,
            updated_at: new Date(),
        };

        const { error } = await supabase.from('profiles').upsert(updates)

        if (error) {
            alert(error.message)
        }
        setLoading(false)
    }

    if (!session) {
        return <div className="container">Loading session...</div>
    }

    return (
        <div className="container mx-auto p-6 max-w-md text-white flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-6 text-amber-400">Profile Settings</h2>
            <form onSubmit={updateProfile} className="space-y-4 nearblack p-6 rounded-lg shadow-lg min-w-sm lg:min-w-3xl shadow-amber-900/30">
            <Avatar 
            url={avatar_Url}
            size={150}
            onUpload={(event,url)=>
                updateProfile(event,url)
            }
            />
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                    <input
                        id="email"
                        type="text"
                        value={session?.user?.email || ''}
                        disabled
                        className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-400 disabled:opacity-70"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
                    <input
                        id="username"
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-300">First name</label>
                    <input
                        id="first_name"
                        type="text"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-300">Last name</label>
                    <input
                        id="last_name"
                        type="text"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded font-medium transition-colors ${loading
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-amber-500 hover:bg-amber-600 text-black'
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : 'Update Profile'}
                    </button>
                </div>
            </form>
        </div>
    )
}