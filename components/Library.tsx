"use client";

import useAuthModal from "@/Hooks/useAuthModal";
import useUploadModal from "@/Hooks/useUploadModal";
import { useUser } from "@/Hooks/useUser";
import { Song } from "@/types";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import MediaItem from "./MediaItem";
import useOnPlay from "@/Hooks/useOnPlay";

interface LibraryProps {
   songs: Song[];
}

const Library: React.FC<LibraryProps> = ({
   songs
}) => {
   const uploadModal = useUploadModal();
   const authModal = useAuthModal();
   const { user } = useUser();
   const onPlay = useOnPlay(songs);

   const onClick = () => {
      //handel upload later
      if ( !user ){
         return authModal.onOpen();
      }

      return uploadModal.onOpen();
   };
   return ( 
      <div className="flex flex-col">
         <div className="flex item-center justify-between px-5 pt-4">
            <div className="inline-flex item-center gap-x-2">
               <TbPlaylist className="text-neutral-400" size={26}/>
               <p className="text-neutral-400 font-medium text-md">
                  Your Library
               </p>
            </div>
            <AiOutlinePlus onClick={onClick} size={20} className="text-neutral-400 cursor-pointer hover:text-white transition" />
         </div>
         <div className="flex flex-col gap-y-2 mt-4 px-3">
            {songs.map((item) => (
               <MediaItem onClick={(id: string) => onPlay(id)} key={item.id} data={item} />
            ))}
         </div>
      </div>
    );
}
 
export default Library;