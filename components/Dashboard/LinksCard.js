import { IconAlarm, IconDotsVertical, IconTrash } from '@tabler/icons';
import copy from 'copy-to-clipboard';
import Image from 'next/image';
import React from 'react'
import { toast, Toaster } from 'react-hot-toast';
import { timeAgo } from '../../lib/date';
import FormatInt from '../../lib/validations/format-num';

export default function LinksCard({links, deleteLink}) {
  return (
    <div className="mt-4 max-w-screen-md mx-auto">
      <Toaster />
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
                            <span className={`${!data.title ? "hidden" : "block"} max-w-[150px] truncate font-secondary sm:max-w-sm`}>
                              {data.title}
                            </span>
                            <span className={`${data.title ? "hidden" : "block"} max-w-[150px] truncate font-secondary sm:max-w-sm`}>
                            linkk.sh/{data.key}
                            </span>
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
                              className="text-gray-700 transition-all group-hover:text-blue-800"
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
                              <p className="whitespace-nowrap text-sm text-gray-500">
                                {FormatInt(data.clicks)}
                                <span className="ml-1 hidden sm:inline-block">
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
  )
}
