'use client'

import { UserButton, useClerk } from "@clerk/nextjs";

const AdminNavbar = () => {

    const {user} = useClerk()
return (  
    
        <div className="border-b">
            <div className="flex h-20  items-center px-4">
            <div> <span className="text-2xl text-green-500"> {user?.primaryEmailAddress?.emailAddress}</span></div>
             <div className="ml-auto flex items-center space-x-4 p- ">
                <UserButton afterSignOutUrl="/" />
             </div>
            </div>
        </div>
    );
}
 
export default AdminNavbar;