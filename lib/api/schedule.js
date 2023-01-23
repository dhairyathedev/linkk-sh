import { supabase } from "../supabase"


export async function fetchAllLinksExpireDate(date){
    const {data: res, error} = await supabase.from("link").select("expiresAt")
    return res
}

export async function scheduleLinkDelete(date){
    const {data: res, error} = await supabase.from("link").delete().eq("expiresAt", date)
    return res
}