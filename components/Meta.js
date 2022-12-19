import { NextSeo } from "next-seo";
import React from "react";

export default function Meta() {
  return (
    <>
      <NextSeo
        title="Linkk - Link Management and shortener"
        description="linkk.sh is an opensource link shortener and management tool for create, shorten and track."
        canonical="https://linkk-sh.vercel.app/"
      />
    </>
  );
}
