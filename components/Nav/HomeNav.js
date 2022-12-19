import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
export default function HomeVav({isNewUser, onClick, isLoading}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getUser();
      if (data) {
        data.user.id ? setIsAuthenticated(true) : setIsAuthenticated(false);
        setLoading(false)
      }
    }
    loadSession();
  }, [isAuthenticated]);

  return (
    <nav
      aria-label="Site Nav"
      className="mx-auto flex max-w-screen-lg items-center justify-between p-4"
    >
      <Link href="/" className="rounded-lg inline-flex items-center space-x-2">
        <span className="sr-only">Logo</span>
        <Image
          src="/assets/images/logo.svg"
          width={36}
          height={36}
          className="w"
          alt="logo"
        />
        <span className="font-bold text-2xl font-primary">Linkk.sh</span>
      </Link>
      <ul className="flex items-center gap-2 text-sm font-medium text-gray-500">
        <li className={`${isNewUser ? "hidden" : "block"} cursor-pointer`}>
          <Link
            href="/app"
            className="font-secondary rounded-full border border-black bg-black py-1.5 px-5 text-sm text-white transition-all hover:bg-white hover:text-black"
            onClick={(e) => {
              if(isNewUser){
                e.preventDefault()
              }
            }}
          >
             {isAuthenticated && !isLoading || !loading ? "Dashboard" :  "SignIn"}
          </Link>
        </li>
        <li className={`${isNewUser && !isLoading ? "block" : "hidden"} cursor-pointer`}>
          <a
            className="font-secondary rounded-full border border-black bg-black py-1.5 px-5 text-sm text-white transition-all hover:bg-white hover:text-black"
            onClick={onClick}
          >
             Confirm Signup
          </a>
        </li>
      </ul>
    </nav>
  );
}
