import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "../../lib/supabase";
import axios from "axios";
import { QRCode } from "react-qrcode-logo";
import Link from "next/link";
import NoContent from "../../components/sections/NoContent";
import Skeleton from "react-loading-skeleton";
import "animate.css";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";
import copy from "copy-to-clipboard";
import { IconDotsVertical, IconTrash, IconAlarm } from "@tabler/icons";
import {timeAgo} from "../../lib/date"
export default function Index() {
  const [loading, isLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [linksLoading, setLinksLoading] = useState(true);
  const [uid, setUid] = useState("");
  const [url, setUrl] = useState("");
  const [key, setKey] = useState("");
  const [links, setLinks] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [keyLoading, setKeyLoading] = useState(false);
  useEffect(() => {
    async function loadSession() {
      const { data: user } = await supabase.auth.getUser();
      if (user) {
        const res = user.user;
        setUid(res.id);
        setEmail(res.email);
        setUserLoading(false);
      }
    }
    loadSession();
  }, []);
  useEffect(() => {
    async function loadLinks() {
      if (uid) {
        const res = await axios.post("/api/links/usercreatedlinks", {
          uid: uid,
        });
        // res.data.map((data) => {
        //   console.log(data.clicks)
        // })
        if (res) {
          setLinks(res.data);
          setLinksLoading(false);
        }
      }
    }
    loadLinks();
  }, [uid]);
  async function encryptPassword() {
    if (password) {
      const res = await axios.post("/api/utils/sealpassword", {
        password,
      });
      return res.data;
    }
    return "";
  }
  async function createUrl(e) {
    e.preventDefault();
    isLoading(true);
    await axios
      .post("/api/links/create", {
        userId: uid,
        key: key,
        url: url,
        password: await encryptPassword(),
      })
      .then((res) => {
        if (res.data && res.data.isUrl === undefined) {
          console.log(res);
          setModalOpen(false);
          toast.success("URL Created");
          isLoading(false);
          e.target.reset();
        } else if (!res.data.isUrl) {
          toast.error("Invalid URL");
        } else if (!res.data.keyPresent) {
          toast.error("Empty key");
        } else {
          toast.error("URL creation failed");
          isLoading(false);
          e.target.reset();
        }
        isLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 429) {
          toast.error("Too many requests, please try again in few minutes");
        }
      });
  }
  async function generateKey() {
    setKeyLoading(true);
    await axios
      .get("/api/links/random")
      .then((res) => {
        if (res) {
          setKey(res.data);
          setKeyLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 429) {
          alert("Too many requests");
        }
      });
  }
  async function deleteLink(id) {
    await axios
      .post("/api/links/delete", {
        linkId: id,
      })
      .then((res) => {
        if (res) {
          toast.success("Link Deleted");
          window.location.reload();
        }
      });
  }
  return (
    <>
      <Toaster />
      <div className="lg:m-0 lg:p-0 m-2 p-4">
        <div
          className={`top-0 left-0 w-full z-[5]  ${
            modalOpen
              ? "blur-sm fixed m-2 p-4 sm:m-0 sm:p-0 pointer-events-none"
              : "duration-500 blur-none block"
          }`}
        >
          <div className="max-w-screen-lg mx-auto mt-10">
            <div className="flex justify-between items-center">
              <div className="flex flex-row space-x-4 items-center">
                <h1 className="font-primary text-3xl">
                  linkk.<span className="font-bold">sh</span>
                </h1>
                <h2 className="text-2xl font-extralight sm:block hidden">/</h2>
                {userLoading ? (
                  <div className="w-48">
                    <Skeleton />
                  </div>
                ) : (
                  <h1 className="font-primary text-xl font-light mt-1 hidden sm:block">
                    {email}
                  </h1>
                )}
              </div>
              <div className="flex flex-row space-x-4 items-center">
                <Link
                  href="/app/settings"
                  className="font-primary font-light text-xl"
                >
                  settings
                </Link>
                <Link
                  href="/app/profile"
                  className="font-primary font-light text-xl sm:block hidden"
                >
                  profile
                </Link>
              </div>
            </div>
          </div>
          <hr className="mt-8" />
          <div className="pt-8 max-w-screen-lg mx-auto">
            <div className="flex justify-between">
              <h3 className="text-[#515151] font-semibold text-2xl">
                My Shortened Links
              </h3>
              <button
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                onClick={() => setModalOpen(true)}
              >
                Add
              </button>
            </div>
          </div>
          {/* LINKS MAPPING */}
          <div className="mt-4 max-w-screen-md mx-auto">
            {links.map((data) => (
                <div
                  key={data.id}
                  className="mt-4 w-full p-2 px-4 shadow-md font-secondary hover:shadow-lg border rounded-full"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex flex-row space-x-2 items-center">
                      <div>
                        <Image
                          src={`https://www.google.com/s2/favicons?domain=${
                            data.url
                          }&sz=${64}`}
                          width={48}
                          height={48}
                          alt=""
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row space-x-2 items-center">
                          <a
                            href={`/${data.key}`}
                            className="font-secondary font-semibold text-blue-600"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            linkk.sh/{data.key}
                          </a>
                          <button
                            className="group rounded-full bg-gray-100 p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-95"
                            onClick={() => {
                              copy(
                                `${process.env.NEXT_PUBLIC_PROD_URL}${data.key}`
                              );
                              toast.success("Link copied!");
                            }}
                          >
                            <span className="sr-only">Copy</span>
                            <svg
                              fill="none"
                              shapeRendering="geometricPrecision"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              viewBox="0 0 24 24"
                              width="14"
                              height="14"
                              class="text-gray-700 transition-all group-hover:text-blue-800"
                            >
                              <path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z"></path>
                            </svg>
                          </button>
                          <div>
                            <div className="flex items-center space-x-1 rounded-md bg-gray-100 px-2 py-0.5 transition-all duration-75 hover:scale-105 active:scale-95">
                              <svg
                                fill="none"
                                shapeRendering="geometricPrecision"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                width="14"
                                height="14"
                                className="h-4 w-4"
                              >
                                <path d="M12 20V10"></path>
                                <path d="M18 20V4"></path>
                                <path d="M6 20v-4"></path>
                              </svg>
                              <p class="whitespace-nowrap text-sm text-gray-500">
                                {data.clicks}
                                <span class="ml-1 hidden sm:inline-block">
                                  clicks
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <a
                          href={`/${data.key}`}
                          className="max-w-[200px] truncate text-sm font-secondary font-medium text-gray-700 sm:max-w-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {data.url}
                        </a>
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <p className="text-sm text-gray-500 hidden sm:block">{timeAgo(data.created_at)}</p>
                    <div className="dropdown sm:dropdown-bottom dropdown-left">
                      <div tabIndex={0}>
                        <IconDotsVertical className="text-gray-500 cursor-pointer" />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <a className="flex flex-row text-gray-400 sm:p-4 p-2 space-x-2 cursor-pointer hover:opacity-80 hover:bg-[#d1d5db] rounded-lg sm:hidden" >
                          <IconAlarm />
                          {timeAgo(data.created_at)}
                        </a>
                        <a className="flex flex-row text-red-400 sm:p-4 p-2 space-x-2 cursor-pointer hover:opacity-80 hover:bg-[#d1d5db] rounded-lg" onClick={() => deleteLink(data.linkId)}>
                          <IconTrash />
                          Delete Link
                        </a>
                      </ul>
                    </div>
                    </div>
                  </div>
                </div>
            ))}
          </div>
          {/* LINKS MAPPING END */}
          <div
            className={`max-w-screen-md mx-auto text-center ${
              linksLoading ? "block" : "hidden"
            }`}
          >
            <Skeleton count={5} />
          </div>
          <div
            className={`${
              !linksLoading ? (links.length > 0 ? "hidden" : "block") : "hidden"
            }`}
          >
            <NoContent />
          </div>
        </div>

        {/* CREATE LINK MODAL */}

        <div
          className={`${
            modalOpen ? "relative" : "hidden"
          } max-w-screen-sm mx-auto z-[10] bg-white border rounded-md shadow-sm p-4 mt-20 animate__animated animate__zoomIn`}
        >
          <h1 className="text-center font-primary font-bold text-xl">
            Create Links
          </h1>
          <div
            className="absolute right-3 top-3 p-2 hover:bg-gray-100 rounded-full cursor-pointer transition"
            onClick={() => setModalOpen(false)}
          >
            <svg
              fill="none"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="14"
              height="14"
              className="h-5 w-5"
            >
              <path d="M18 6L6 18"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </div>
          <form
            className="mt-4 flex flex-col space-y-4 font-secondary"
            onSubmit={createUrl}
            action=""
            method="POST"
          >
            <div>
              <h3 className="font-secondary text-gray-700 font-semibold mb-2">
                &nbsp;Destination URL
              </h3>
              <input
                type="url"
                className="border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500 block w-full rounded-md text-sm focus:outline-none"
                placeholder="https://github.com/dhairyathedev"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <h3 className="font-secondary text-gray-700 font-semibold mb-2">
                  &nbsp;Short link
                </h3>
                <button
                  className="text-sm cursor-pointer text-gray-500 flex flex-row space-x-1 items-center"
                  onClick={generateKey}
                  disabled={keyLoading}
                >
                  {keyLoading ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="animate-spin"
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
                      <path d="M3 12a9 9 0 0 0 9 9a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9"></path>
                      <path d="M17 12a5 5 0 1 0 -5 5"></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-arrows-shuffle"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M18 4l3 3l-3 3"></path>
                      <path d="M18 20l3 -3l-3 -3"></path>
                      <path d="M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5"></path>
                      <path d="M21 7h-5a4.978 4.978 0 0 0 -2.998 .998m-4.002 8.003a4.984 4.984 0 0 1 -3 .999h-3"></path>
                    </svg>
                  )}
                  <span>{keyLoading ? "Generating" : "Randomize"}</span>
                </button>
              </div>
              <div className="flex flex-row items-center">
                <div className="whitespace-nowrap rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-5 text-sm text-gray-500 py-2">
                  linkk.sh
                </div>
                <input
                  type="text"
                  className="border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500 block w-full rounded-r-md text-sm focus:outline-none"
                  placeholder="twitter-campaign"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  pattern="[^' ']+"
                  aria-invalid="true"
                  aria-describedby="key-error"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-secondary text-gray-700 font-semibold mb-2">
                  &nbsp;Password Protection{" "}
                  <span className="text-sm font-light text-gray-500">
                    (optional)
                  </span>
                </h3>
                <div className="relative mt-3 rounded-md shadow-sm opacity-100">
                  <input
                    name="password"
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    className="block w-full rounded-md border-gray-300 text-sm text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500"
                    placeholder="Enter password"
                    aria-invalid="true"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <svg
                        fill="none"
                        shapeRendering="geometricPrecision"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="h-4 w-4 text-gray-400"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    ) : (
                      <svg
                        fill="none"
                        shapeRendering="geometricPrecision"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="h-4 w-4 text-gray-400"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"></path>
                        <path d="M1 1l22 22"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <button
                className={`border-black mt-4 bg-black text-white hover:bg-white hover:text-black flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none ${
                  loading ? "opacity-80" : "opacity-100"
                }`}
                disabled={loading}
              >
                <p className="text-sm">{loading ? "Saving link..." : "Add link"}</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
