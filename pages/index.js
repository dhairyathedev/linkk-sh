import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { getIp } from "../lib/api/ipFetch";
import Links from "../components/links";
import {getISODate} from '../lib/date'
export default function Home() {
  const [confirmSignUpLoad, setConfirmSignUpLoad] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newUser, isNewUser] = useState(true);
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [lastSignIn, setLastSignIn] = useState("");
  useEffect(() => {
    async function loadSession() {
      const { data: dataUser } = await supabase.auth.getUser();
      if (dataUser) {
        setEmail(dataUser.user.email);
        setUid(dataUser.user.id);
        setLastSignIn(dataUser.user.last_sign_in_at);
        dataUser.user.id ? setIsAuthenticated(true) : setIsAuthenticated(false);
        console.log(`Signed in as ${dataUser.user.email}`);

        const { data: users, error } = await supabase
          .from("users")
          .select("uid")
          .eq("uid", dataUser.user.id);
          console.log(users)
        if (users) {
          if (isAuthenticated && users[0].uid) {
            isNewUser(false);
            console.log("User exisited");
            const {data: signinData, error} = await supabase.from("users").update({lastSignIn: getISODate(), lastSignInIp: await getIp()}).match({uid: users[0].uid})
            console.log(`Signin data`, signinData)
          }
        }
        if(users.length === 0){
          setConfirmSignUpLoad(true)
        }
      }
    }
    loadSession();
  }, [isAuthenticated]);
  const confirmSignUp = async () => {
    try {
      console.log(email);
      const input = {
        email: email,
        uid: uid,
        lastSignIn: lastSignIn,
        lastSignInIp: await getIp(),
        accountCreateIp: await getIp(),
      };
      if (newUser && confirmSignUpLoad) {
        const { data, error } = await supabase.from("users").insert(input);
        isNewUser(false);
        console.log(data);
        if (error) throw error;
      } else if (!confirmSignUpLoad) {
        alert("Data is loading! please wait");
      } else {
        alert("User exists");
        window.location.reload();
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <div className="m-2 p-4">
        <div className="flex justify-between">
        <h1 className="text-3xl">linkk.sh</h1>
        <Links />
        </div>

        <div className={`mt-8 ${confirmSignUpLoad ? "block" : "hidden"}`}>
          <button className="text-blue-500 underline" onClick={confirmSignUp}>
            {" "}
            Confirm Signup
          </button>
        </div>

      </div>
    </>
  );
}
