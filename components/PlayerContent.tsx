"use client";

import useSound from "use-sound";
import { useEffect, useState, useCallback } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import { Song } from "@/types";
import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import usePlayer from "@/Hooks/usePlayer";
import Slider from "./Slider";

interface PlayerContentProps {
   song: Song;
   songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
   const player = usePlayer();
   const [volume, setVolume] = useState(1);
   const [isPlaying, setIsPlaying] = useState(false);

   const [currentPosition, setCurrentPosition] = useState<number>(0);
   const [duration, setDuration] = useState<number>(0);

   const Icon = isPlaying ? BsPauseFill : BsPlayFill;
   const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

   const onPlayNext = () => {
      if (player.ids.length === 0) {
         return;
      }

      const currentIndex = player.ids.findIndex((id) => id === player.activeId);
      const nextSong = player.ids[currentIndex + 1];

      if (!nextSong) {
         return player.setId(player.ids[0]);
      }

      player.setId(nextSong);
   }

   const onPlayPrevious = () => {
      if (player.ids.length === 0) {
         return;
      }

      const currentIndex = player.ids.findIndex((id) => id === player.activeId);
      const previousSong = player.ids[currentIndex - 1];

      if (!previousSong) {
         return player.setId(player.ids[player.ids.length - 1]);
      }

      player.setId(previousSong);
   }

   const [play, { pause, sound }] = useSound(
      songUrl,
      {
         volume: volume,
         onplay: () => setIsPlaying(true),
         onend: () => {
            setIsPlaying(false);
            onPlayNext();
         },
         onpause: () => setIsPlaying(false),
         format: ['mp3']
      }
   );

   // Update the duration and current position state
   useEffect(() => {
      if (sound) {
         setDuration(sound.duration() ?? 0);
         const intervalId = setInterval(() => {
            setCurrentPosition(sound.seek() ?? 0);
         }, 500);

         // Clean up the interval when the component unmounts
         return () => clearInterval(intervalId);
      }
   }, [sound]);

   useEffect(() => {
      sound?.play();

      return () => {
         sound?.unload();
      }
   }, [sound]);

   const handlePlay = () => {
      if (!isPlaying) {
         play();
      } else {
         pause();
      }
   }

   const handleSeek = () => { };

   const toggleMute = () => {
      if (volume === 0) {
         setVolume(1);
      } else {
         setVolume(0);
      }
   }

   return (
      <div className="grid grid-cols-2 md:grid-cols-3 h-full">
         <div className="flex w-full justify-start">
            <div className="flex items-center gap-x-4">
               <MediaItem data={song} />
               <LikeButton songId={song.id} />
            </div>
         </div>

         <div className="hidden md:flex col-auto w-full justify-end items-center">
            <div className="w-full flex flex-col items-center">
               <div className="flex items-center gap-x-4 w-full h-1">
                  <div className="text-sm text-neutral-500">
                     {new Date(currentPosition * 1000).toISOString().substring(14, 19)}
                  </div>
                  <Slider
                     value={currentPosition}
                     max={duration}
                     onChange={handleSeek}
                  />
                  <div className="text-sm text-neutral-500">
                     {new Date(duration * 1000).toISOString().substring(14, 19)}
                  </div>
               </div>
               {/* Second row: Play/Pause, Forward, and Backward buttons */}
               <div className="flex items-center gap-x-4 mt-2">
                  <AiFillStepBackward
                     onClick={onPlayPrevious}
                     size={30}
                     className="text-neutral-400 cursor-pointer hover:text-white transition"
                  />
                  <div
                     onClick={handlePlay}
                     className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
                  >
                     <Icon size={30} className="text-black" />
                  </div>
                  <AiFillStepForward
                     onClick={onPlayNext}
                     size={30}
                     className="text-neutral-400 cursor-pointer hover:text-white transition"
                  />
               </div>
            </div>
         </div>

         <div className="hidden md:flex w-full justify-end pr-2">
            <div className="flex items-center gap-x-2 w-[120px]">
               <VolumeIcon
                  onClick={toggleMute}
                  className="cursor-pointer"
                  size={34}
               />
               <Slider
                  value={volume}
                  onChange={setVolume}
               />
            </div>
         </div>
      </div>
   );
};

export default PlayerContent;
