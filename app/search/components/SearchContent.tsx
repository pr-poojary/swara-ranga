"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/Hooks/useOnPlay";
import { Song } from "@/types";

interface SearchContentProps {
   songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({
   songs
}) => {
   const onPlay = useOnPlay(songs);
   if( songs.length === 0 ) {
      return(
         <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
            No songs found
         </div>
      )
   }

   return ( 
      <div className="flex flex-col gap-y-2 w-full px-4">
         {songs.map((song) => (
            <div key={song.id} className="flex items-center gap-x-4 wifull">
               <div className="flex-1">
                  <MediaItem 
                     onClick={(id: string) => onPlay(id)}
                     data={song}
                  />
               </div>
               {/* Like Button Here */}
               <LikeButton songId={song.id} />
            </div>
         ))}
      </div>
    );
}
 
export default SearchContent;