import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import Sidebar from '../components/Dashboard/SideBar'
import { supabase } from '../lib/supabase';

export default function Dashboard({children}) {
  const router = useRouter();
  useEffect(() => {
    async function loadSession() {
      const {data: autheticated} = await supabase.auth.getSession()
      if(autheticated.session === null){
        router.push("/login")
      }
    }
    loadSession();
  
  }, [router]);
  return (
    <div className="flex flex-row">
        <Sidebar />
        <div className="w-full m-2 p-4 sm:m-0 sm:p-0">
            {children}
        </div>
    </div>
  )
}
