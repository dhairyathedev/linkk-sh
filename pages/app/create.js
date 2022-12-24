import React from "react";
import Dashboard from "../../layout/Dashboard";

export default function create() {
  return (
    <div>
      <Dashboard>
        <div className="max-w-2xl mx-auto w-full mt-20 font-secondary">
          <h1 className="font-secondary font-bold sm:text-3xl text-2xl">Create new</h1>
          <hr className="my-4" />
          <form className="mt-6">
            <div>
              <h3 className="font-semibold">Destination</h3>
              <input
                type="url"
                className="
              mt-1
              block
              w-full
              rounded-sm
              border-gray-300
              shadow-sm
              focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
              placeholder:text-gray-400
              placeholder:font-light
              text-sm
            "
                placeholder="https://your_long_url.com"
                pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
              />
            </div>
            <div className="mt-5">
              <h3 className="font-semibold">
                Title <span className="font-light">(optional)</span>
              </h3>
              <input
                type="text"
                className="
              mt-1
              block
              w-full
              rounded-sm
              border-gray-300
              shadow-sm
              focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
              placeholder:text-gray-400
              placeholder:font-light
              text-sm
            "
                pattern="[a-zA-Z0-9\-]+"
              />
            </div>
            <h1 className="font-secondary font-bold sm:text-2xl mt-10">
              Additional Settings
            </h1>
            <div className="mt-4">
              <h1 className="font-semibold">Password Protection <span className="font-light">(optional)</span></h1>
              <input
                type="password"
                className="
              mt-1
              block
              w-full
              rounded-sm
              border-gray-300
              shadow-sm
              focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
              placeholder:text-gray-400
              placeholder:font-light
              text-sm
            "
              />
            </div>
          </form>
        </div>
      </Dashboard>
    </div>
  );
}
