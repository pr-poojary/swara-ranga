"use client";

import { useUser } from "@/Hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AccountContent = () => {
   const router = useRouter();
   const { isLoading, user } = useUser();
   const [loading,setLoading] = useState(false);

   useEffect(() => {
      if(!isLoading && !user ){
         router.replace('/');
      }
   },[isLoading,user,router]);

   return ( 
      <div className="mb-7 px-6">
         AccountConent 
      </div>
    );
}
 
export default AccountContent;