import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {supabase} from '../lib/supabase'
export default function Links() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    useEffect(() => {
        async function loadSession(){
            const {data} = await supabase.auth.getUser()
            if(data){
                data.user.id ? setIsAuthenticated(true) : setIsAuthenticated(false)
            }
        }
        loadSession()
    }, [isAuthenticated])
    async function signout(){
        const { error } = await supabase.auth.signOut()
        alert("signed out")
        window.location.reload()
    }
  return (
    <>
        <Link href="/login" className={`${!isAuthenticated ?"block" : "hidden"}`}>
            Login
        </Link>
        <button className={`${isAuthenticated ?"block" : "hidden"}`} onClick={signout}>Signout</button>
    </>
  )
}
