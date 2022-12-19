import { supabase } from "../supabase";

export async function checkUserExists(uid){
    const { data: users, error } = await supabase
          .from("users")
          .select("uid")
          .eq("uid", uid);
    return users
}