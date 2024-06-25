"use client";

import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import useAuthModal from "@/Hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/Hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import usePlayer from "@/Hooks/usePlayer";

interface HeaderProps {
   children: React.ReactNode;
   className?: string;
}

const Header: React.FC<HeaderProps> = ({
   children,
   className
}) => {
   const player = usePlayer();
   const AuthModal = useAuthModal();
   const router = useRouter();

   const supabaseClient = useSupabaseClient();
   const { user } = useUser();

   const handleLogout = async () => {
      //handle logout
      const { error } = await supabaseClient.auth.signOut();
      //Reset any playing songs
      player.reset();
      router.refresh();

      if (error) {
         toast.error(error.message);
      } else {
         toast.success('Logged out!');
      }
   }
   return (
      <div className={twMerge("h-fill bg-gradient-to-b from-red-800  p-6", className)}>
         <div className="w-full mb-4 flex items-center justify-between">
            <div className="hidden md:flex gap-x-2 items-center">
               <button className=" rounded-full flex bg-black items-center justify-center hover:opacity-75 transition">
                  <RxCaretLeft onClick={() => router.back()} className="text-white" size={35} />
               </button>
               <button className=" rounded-full flex bg-black items-center justify-center hover:opacity-75 transition">
                  <RxCaretRight onClick={() => router.forward()} className="text-white" size={35} />
               </button>
            </div>
            <div className="flex md:hidden gap-x-2 items-center">
               <button className=" rounded-full p-2 flex bg-white items-center justify-center hover:opacity-75 transition">
                  <Button onClick={() => router.push('/')}>
                     <HiHome className="text-black" size={20} />
                  </Button>
               </button>
               <button className=" rounded-full p-2 flex bg-white items-center justify-center hover:opacity-75 transition">
                  <Button onClick={() => router.push('/search')}>
                     <BiSearch className="text-black" size={20} />
                  </Button>
               </button>
            </div>
            <div className="flex justify-between items-center gap-x-4">
               {user ? (
                  <div className="flex gap-x-4 items-center">
                     <Button onClick={handleLogout} className="bg-white px-6 py-2">
                        Logout
                     </Button>
                     <Button onClick={() => router.push('/account')}>
                        <FaUserAlt />
                     </Button>
                  </div>
               ) : (
                  <>
                     <div>
                        <Button onClick={AuthModal.onOpen} className="bg-white px-6 py-2">
                           Sign Up
                        </Button>
                     </div>
                     <div>
                        <Button onClick={AuthModal.onOpen} className="px-6 py-2">
                           Log in
                        </Button>
                     </div>
                  </>
               )}
            </div>
         </div>
         {children}
      </div>
   );
}

export default Header;