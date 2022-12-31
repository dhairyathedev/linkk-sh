import React from "react";
import Dashboard from "../../layout/Dashboard";
import Balancer from 'react-wrap-balancer'
import Link from "next/link";

export default function DashboardPage() {
  return (
    <>
      <Dashboard>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-center sm:text-5xl text-4xl font-black bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-purple-800 via-violet-900 to-purple-800 bg-clip-text text-transparent lg:w-[600px] md:w-[600px]">
            Dashboard is currently in developement stage. It will be visible soon :)
          </h1>
          <Balancer className="mt-4 text-xl text-center sm:text-2xl">Till then create a <Link href="/app/create" className="bg-clip-text text-transparent bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-purple-800 via-violet-900 to-purple-800 italic font-semibold font-primary border-b-2 border-purple-400 hover:border-purple-500 hover:border-b-4 duration-300">new link</Link></Balancer>
        </div>
      </Dashboard>
    </>
  );
}
