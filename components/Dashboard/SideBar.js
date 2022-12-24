import { IconPlus } from "@tabler/icons";
import React from "react";
import DashNav from "../Nav/DashNav";

export default function Sidebar() {
  return (
    <>
      <div className="min-h-screen p-4 lg:w-1/5  w-20 border-r border-gray-200 shadow-md">
        <DashNav />
        <div className="flex sm:flex-col flex-row justify-center items-center lg:block">
          <button className="w-full text-white bg-purple-600 py-2 rounded-md shadow-md hover:bg-purple-800 transition mb-3 lg:block hidden">
            Create New
          </button>
          <button className="text-white bg-purple-600 rounded-md shadow-md hover:bg-purple-800 transition mb-3 p-3 lg:hidden block">
            <IconPlus />
          </button>
          <hr />
        </div>
        <div className="flex flex-col items-center lg:justify-center justify-start space-y-4 mt-4">
          <a className="w-full inline-flex space-x-2 items-center cursor-pointer hover:bg-purple-50 px-4 py-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
              />
            </svg>
            <span className="font-semibold text-lg lg:block hidden">
              Dashboard
            </span>
          </a>
          <a className="w-full inline-flex space-x-2 items-center cursor-pointer hover:bg-purple-50 px-4 py-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>

            <span className="font-semibold text-lg lg:block hidden">Links</span>
          </a>
        </div>
        <div className="absolute bottom-3">
          <a className="w-full inline-flex space-x-2 items-center cursor-pointer hover:bg-purple-50 px-4 py-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            <span className="font-semibold lg:block hidden">Signout</span>
          </a>
        </div>
      </div>
    </>
  );
}
