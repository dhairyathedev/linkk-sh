import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function SignOut() {
    const [err, setErr] = useState("")
    const router = useRouter()
    useEffect(() =>{
        async function singOut(){
            const {error} = await supabase.auth.signOut();
            if(error){
            setErr(err)
            }
            router.push("/")
        }
        singOut()
    }, [err, router])

  return (
    <div>{err.length > 0 ? err : "Signing you out..."}</div>
  )
}
