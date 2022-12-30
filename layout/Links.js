
import React from "react";
import LinksHeader from "../components/Dashboard/LinksHeader";

export default function Links({ children }) {
  return (
    <>
      <div>
        <LinksHeader dateChecked={true} />
        <div className="mt-4 max-w-screen-md mx-auto">
          {children}
        </div>
      </div>
    </>
  );
}
