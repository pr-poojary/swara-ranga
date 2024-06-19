import Header from "@/components/Header";
import AccountContent from "./components/AccountContent";
import getSongsByUserId from "@/actions/getSongsByUserId";
import DeleteSong from "./components/DeleteSong";

const Account = async () => {
   const songs = await getSongsByUserId();
   return (
      <div className="bg-neutral-900 rounded-md h-full w-full overflow-hidden overflow-y-auto">
         <Header className="from-bg-neutral-900">
            <div className="mb-2 flex flex-col gap-y-6">
               <h1 className="text-white text-3xl font-semibold">
                  Account Settings
               </h1>
            </div>
         </Header>
         {/* <AccountContent /> */}
         <DeleteSong songs={songs} />
      </div>
   );
}

export default Account;