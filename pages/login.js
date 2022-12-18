import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import { supabase } from "../lib/supabase";
export default function Home() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  useEffect(() => {
    async function loadSession() {
      const { data: autheticated } = await supabase.auth.getSession();
      if (autheticated.session !== null) {
        router.push("/app");
      }
    }
    loadSession();
  }, [router]);
  const signInWithEmail = async () => {
    try {
      if(email){
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
      });
      if (data && email) {
        alert("Email has been sent!");
        console.log(data);
      } else if (error) {
        alert(error);
      }
    }else{
      alert("Please enter email!")
    }
    } catch (error) {
      throw error;
    }
  };
  const signOut = async () => {
    try {
      const { error } = supabase.auth.signOut();
      if (!error) {
        alert("You have been signout!");
      } else {
        throw error;
      }
    } catch (error) {}
  };
  return (
    <>
    <Background />  
      <div className="z-10 mx-auto max-w-md px-2.5 sm:max-w-lg sm:px-0 brightness-100 w-full min-h-screen">
        <div className="flex justify-center items-center min-h-screen max-w-screen-sm mx-auto">
          <div className="w-full bg-white shadow-2xl rounded-md p-4">
            <div className="flex flex-col space-y-2">
              <div className="text-center">
                <div className="flex justify-center items-center">
                  <Image
                    src="/assets/images/logo.svg"
                    width={36}
                    height={36}
                    className="w"
                    alt="logo"
                  />
                </div>
                <h1 className="text-xl font-bold mt-2">Welcome to linkk.sh</h1>
                <p>Enter your email address to login</p>
              </div>
              <div>
                <label className="block">
                  <input
                    type="email"
                    className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
                  "
                    placeholder="john@apple.com"
                    data-ddg-inputtype="identities.email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </label>
              </div>
              <button
                className="border-black bg-black text-white hover:bg-white hover:text-black flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
                onClick={signInWithEmail}
              >
                <p>Send magic link</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
