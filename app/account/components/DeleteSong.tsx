"use client";

import useAuthModal from "@/Hooks/useAuthModal";
import useUploadModal from "@/Hooks/useUploadModal";
import { useUser } from "@/Hooks/useUser";
import { Song } from "@/types";
import { AiOutlineMinus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import useOnPlay from "@/Hooks/useOnPlay";
import MediaItem from "@/components/MediaItem";
import { MdDeleteSweep } from "react-icons/md";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface DeleteSongProps {
   songs: Song[];
}

const DeleteSong: React.FC<DeleteSongProps> = ({ songs }) => {
   const uploadModal = useUploadModal();
   const authModal = useAuthModal();
   const { user } = useUser();
   const [isLoading, setIsLoading] = useState(false);
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
   const onPlay = useOnPlay(songs);

   const deleteSong = async (songId: any) => {
      try {
         if (!user) {
            toast.error("Missing fields");
            return;
         }
         setIsLoading(true);

         const { error } = await supabaseClient
            .from('songs')
            .delete()
            .eq('user_id', user.id)
            .eq('id', songId);

         if (error) {
            throw error;
         }

         toast.success('Song deleted successfully!');
         // Reload the page or update the song list after deletion
         router.refresh();
      } catch (error) {
         console.error('Error deleting song:', (error as Error).message);
         toast.error('Failed to delete song.');
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="flex flex-col">
         <div className="flex item-center justify-between px-5 pt-4">
            <div className="inline-flex item-center gap-x-2">
               <TbPlaylist className="text-neutral-400" size={26} />
               <p className="text-neutral-400 font-medium text-md">
                  Your Songs
               </p>
            </div>
         </div>
         <div className="flex flex-col gap-y-2 mt-4 px-3">
            {songs.map((item) => (
               <div key={item.id} className="flex items-center justify-evenly w-[80%]">
                  <MediaItem onClick={(id: string) => onPlay(id)} data={item} />
                  <MdDeleteSweep
                     onClick={() => deleteSong(item.id)}
                     size={20}
                     className="text-neutral-400 cursor-pointer hover:text-white transition"
                  />
               </div>
            ))}
         </div>
      </div>
   );
};

export default DeleteSong;
