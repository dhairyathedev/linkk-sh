import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import LinksCard from "../../components/Dashboard/LinksCard";
import Dashboard from "../../layout/Dashboard";
import Links from "../../layout/Links";
import { supabase } from "../../lib/supabase";

export default function LinksPage() {
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
  const router = useRouter();
  useEffect(() => {
    async function loadSession() {
      const { data: autheticated } = await supabase.auth.getSession();
      if (autheticated.session !== null) {
        const { data: users } = await supabase.auth.getUser();
        if (users) {
          const res = users.user;
          setUid(res.id);
          setEmail(res.email);
          setUserLoading(false);
        }
      } else {
        router.push("/login");
      }
    }
    loadSession();
  }, [router]);
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
  async function removeLinkExpiry(id) {
    const confirmRemove = confirm(
      "You are about to remove the link expiration, are you sure? \n P.S Link will not be deleted"
    );
    if (confirmRemove) {
      const { data: res, error } = await supabase
        .from("link")
        .update({ expiresAt: null })
        .match({ linkId: id });
      
      window.location.reload();
    }
  }
  return (
    <>
      <Toaster />
      <Dashboard>
        <Links>
          {links.length > 0 ? (
            <LinksCard
              links={links}
              deleteLink={deleteLink}
              removeLinkExpiry={removeLinkExpiry}
            />
          ) : (
            <div className="flex justify-center items-center mt-48">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="animate-spin"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 3a9 9 0 1 0 9 9"></path>
              </svg>
            </div>
          )}
        </Links>
      </Dashboard>
    </>
  );
}
