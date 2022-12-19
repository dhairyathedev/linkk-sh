import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";
import { getIp } from "../lib/api/ipFetch";
import { getISODate } from "../lib/date";
import Image from "next/image";
import HomeNav from "../components/Nav/HomeNav";
import { useRouter } from "next/router";
import Background from "../components/Background";
import Meta from "../components/Meta";
import { checkUserExists } from "../lib/authentication/users";
export default function Home({ip}) {
  const [confirmSignUpLoad, setConfirmSignUpLoad] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newUser, isNewUser] = useState(true);
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [lastSignIn, setLastSignIn] = useState("");
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  useEffect(() => {
    async function loadSession() {
      const { data: dataUser } = await supabase.auth.getUser();
      if (dataUser) {
        setEmail(dataUser.user.email);
        setUid(dataUser.user.id);
        setLastSignIn(dataUser.user.last_sign_in_at);
        dataUser.user.id ? setIsAuthenticated(true) : setIsAuthenticated(false);
        console.log(`Signed in as ${dataUser.user.email}`);
        const users = await checkUserExists(dataUser.user.id);
        if (users.length > 0) {
          if (isAuthenticated && users[0].uid) {
            isNewUser(false);
            console.log("User exisited");
            const { data: signinData, error } = await supabase
              .from("users")
              .update({ lastSignIn: getISODate(), lastSignInIp: ip })
              .match({ uid: users[0].uid });
            console.log(`Signin data`, signinData);
          }
        }
        if (users.length === 0) {
          setConfirmSignUpLoad(true);
        }
        setLoading(false)
    }
  }
    loadSession();
  }, [isAuthenticated, ip, confirmSignUpLoad]);
  const confirmSignUp = async () => {
    try {
      console.log(email);
      const input = {
        email: email,
        uid: uid,
        lastSignIn: lastSignIn,
        lastSignInIp: ip,
        accountCreateIp: ip,
      };
      if (newUser && confirmSignUpLoad) {
        const { data, error } = await supabase.from("users").insert(input);
        isNewUser(false);
        console.log(data);
        router.push("/app")
        if (error) throw error;
      } else if (confirmSignUpLoad) {
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
    <div className="bg-gray-50">
      <Meta />
      <HomeNav isNewUser={confirmSignUpLoad} onClick={() => confirmSignUp()} isLoading={loading}/>
      <Background />
      <div className="z-10 mx-auto mt-20 mb-10 max-w-md px-2.5 text-center sm:max-w-lg sm:px-0 brightness-100">
        <a
          href="https://supabase.com/"
          target="_blank"
          rel="noreferrer"
          className="mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-purple-100 px-7 py-2 transition-all hover:bg-purple-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#8E2DE1]"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3"></polyline>
          </svg>
          <p className="text-sm font-semibold text-[#8E2DE1]">
            Powered by Supabase
          </p>
        </a>
        <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl sm:leading-[1.15]">
          Short Links with
          <br />
          <span className="bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 bg-clip-text text-transparent">
            Magical Powers
          </span>
        </h1>
        <h2 className="mt-5 text-lg text-gray-600 sm:text-xl">
          <span className="font-medium">linkk.sh</span> is an opensource link shortener and management tool for create, shorten and track.
        </h2>
        <div className="mx-auto mt-10 flex max-w-fit space-x-4">
          <Link
            className="rounded-full border border-black bg-black py-2 px-5 text-sm text-white shadow-lg transition-all hover:bg-white hover:text-black"
            href="/app"
          >
            Start For Free
          </Link>
          <a
            className="flex items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white py-2 px-5 shadow-lg transition-all hover:border-gray-800"
            href={process.env.NEXT_PUBLIC_PROD_URL + "github"}
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-5 w-5 text-black"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
            </svg>
            <p className="text-sm">Star on GitHub</p>
          </a>
        </div>
      </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  let ip;

  const { req } = context;

  if (req.headers["x-forwarded-for"]) {
    ip = req.headers["x-forwarded-for"].split(',')[0]
  } else if (req.headers["x-real-ip"]) {
    ip = req.connection.remoteAddress
  } else {
    ip = req.connection.remoteAddress
  }

  console.log(ip)
  return {
    props: {
      ip,
    },
  }
}