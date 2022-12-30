import React from "react";

export default function LinksHeader({dateChecked}) {
  return (
    <>
    <div className="flex flex-col space-y-4 mb-4 mx-8 mt-4">
      <h1 className="text-3xl font-extrabold">Links</h1>
      <div className="flex flex-row space-x-4 items-center">
        <div className="flex flex-row space-x-2 items-center">
          <input type="radio" checked={dateChecked !== null ? dateChecked : true} readOnly/>
          <p>Date created</p>
        </div>
        <div className="flex flex-row space-x-2 items-center">
          <input type="radio" checked={dateChecked === null ? false : !dateChecked} readOnly/>
          <p>Most popular</p>
        </div>
      </div>
    </div>
    <hr />
    </>
  );
}
