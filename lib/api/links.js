import {supabase} from '../supabase'
import {nanoid} from 'nanoid'
import {RESERVED_KEYS} from '../constants/reservedkey'
import { getISODate } from '../date';
export async function generateKey(){
    // Recursive function till the random key generates
    const key = nanoid(7);
    const {data: response, error} = await supabase.from("link").select("key").eq("key", key)
    if(!response){
      // if the key experience collision with duplicates
      return await generateKey();
    }else{
      return key
    }
        
}

export async function checkIfKeyExists(key){
  if(RESERVED_KEYS.has(key)){
    return true;    
  }
  const {data: res, error} = await supabase.from("link").select("key").eq("key", key)
  return !!res[0]
}

export async function createLink(dataObj){
  if(RESERVED_KEYS.has(dataObj.key)){
    return false;
  }
  const {data: res, error} = await supabase.from("link").insert(dataObj)
  return !error
}

export async function linkRedirectInfo(key){
  const {data: res, error} = await supabase.from("link").select("*").eq("key", key)
  return res[0]
}

export async function updateClicks(key, clicks){
  const {data: res, error} = await supabase.from("link").update({clicks: clicks+1, clickUpdatedAt: getISODate()}).match({key: key})
  return res
}

export async function fetchUserCreatedLinks(uid){
  const {data: res, error} = await supabase.from("link").select("*").eq("userId", uid).order('id', {ascending: false})
  return res
}

export async function deleteLink(linkid){
  const {data: res, error} = await supabase.from("link").delete().eq("linkId", linkid)
  return !error
}