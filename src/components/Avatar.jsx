import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase-client";

export default function Avatar({ url, size, onUpload }) {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (url) downloadImage(url);
    }, [url]);

    const downloadImage = async (path) => {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path);
            if (error) throw error;
            const url = URL.createObjectURL(data);
            setAvatarUrl(url);
        } catch (error) {
            console.log('Error downloading image: ', error.message);
        }
    };

    const uploadAvatar = async (event) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            let { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, { upsert: true });

            if (uploadError) throw uploadError;

            // Clear the previous avatar URL to force refresh
            setAvatarUrl(null);
            
            // Download the new image immediately
            await downloadImage(filePath);
            
            // Notify parent component
            onUpload(event, filePath);
            
        } catch (error) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            {avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="avatar image rounded-xl mb-4"
                    style={{ 
                        height: size, 
                        width: size, 
                        boxShadow: "3px 3px 8px orange",
                        objectFit: 'cover'
                    }}
                />
            ) : (
                <div 
                    className="avatar no-image mb-4 bg-gray-700 rounded-xl flex items-center justify-center"
                    style={{ height: size, width: size }}
                >
                    <span className="text-white">No Avatar</span>
                </div>
            )}
            
            <div style={{ width: size }} className="relative">
                <input
                    type="file"
                    id="single"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <label 
                    htmlFor="single"
                    className={`inline-block relative px-4 m-auto w-full  text-center rounded-lg font-medium text-black
                        bg-amber-400 hover:bg-amber-500
                        border-b-4 border-amber-600
                        transition-all duration-200 ease-out
                        transform hover:-translate-y-1 active:translate-y-0
                        active:border-b-2 active:mt-[2px]
                        shadow-lg hover:shadow-xl
                        focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50
                        ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {uploading ? 'Uploading...' : 'Change Avatar'}
                </label>
            </div>
        </div>
    );
}