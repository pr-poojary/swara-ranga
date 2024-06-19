"use client";

import qs from "query-string";

import useDebounce from "@/Hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "./Input";

const SearchItem = () => {
   const router = useRouter();
   const [value, setValue] = useState<string>("");
   const debounaceValue = useDebounce<string>(value, 500);

   useEffect(() => {
      const query = {
         title: debounaceValue,
      };

      const url = qs.stringifyUrl({
         url: '/search',
         query: query
      });

      router.push(url);
   }, [debounaceValue, router]);
   return ( 
      <Input 
      placeholder="What do you want to listen to?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      />
    );
}
 
export default SearchItem;