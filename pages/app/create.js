import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Dashboard from "../../layout/Dashboard";
import { supabase } from "../../lib/supabase";
import { generateKey } from "../../lib/api/links";
import { DateRangePicker } from "@tremor/react";
import moment from "moment-timezone";
import { getDateTimeLocal, getUTCDate } from "../../lib/date";
export default function Create() {
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
  const [title, setTitle] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
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
    e.preventDefault()
    isLoading(true);
    await axios
      .post("/api/links/create", {
        userId: uid,
        key: key ? key : await generateKey(),
        url: url,
        password: await encryptPassword(),
        title: title,
        expiresAt: scheduleDate ? scheduleDate : null,
      })
      .then((res) => {
        if (res.data && res.data.isUrl === undefined) {
          console.log(res);
          toast.success("URL Created");
          router.push("/app/links");
          isLoading(false);
          e.target.reset();
        } else if (!res.data.isUrl) {
          toast.error("Invalid URL");
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
  return (
    <div>
      <Toaster />
      <Dashboard>
        <div className="max-w-2xl mx-auto w-full mt-20 font-secondary">
          <h1 className="font-secondary font-bold sm:text-3xl text-2xl">
            Create new
          </h1>
          <hr className="my-4" />
          <form className="mt-6" onSubmit={createUrl} action="" method="POST">
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
                onChange={(e) => setUrl(e.target.value)}
                value={url}
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
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <h1 className="font-secondary font-bold sm:text-2xl mt-10">
              Additional Settings
            </h1>
            <div className="mt-4">
              <h1 className="font-semibold">
                Custom back-half
                <span className="font-light"> (optional)</span>
              </h1>
              <input
                type="text"
                className="mt-1
                  block
                  w-full
                  rounded-sm
                  border-gray-300
                  shadow-sm
                  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  placeholder:text-gray-400
                  placeholder:font-light
                  text-sm"
                placeholder="twittercampaign"
                pattern="[a-zA-Z0-9\-]+"
                aria-invalid="true"
                aria-describedby="key-error"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <h1 className="font-semibold">
                Password Protection{" "}
                <span className="font-light">(optional)</span>
              </h1>
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
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="mt-4">
              <h1 className="font-semibold mb-2">
                Schedule Delete <span className="font-light">(optional)</span>
              </h1>
              <input
            type="date"
            id="expiresAt"
            name="expiresAt"
            min={getDateTimeLocal()}
            onChange={(e) => {
              setScheduleDate(new Date(e.target.value))
            }}
            className="mt-1
            block
            w-full
            rounded-sm
            border-gray-300
            shadow-sm
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
            placeholder:text-gray-400
            placeholder:font-light
            text-sm"
          />
            </div>
            <button
              className={`w-full text-white bg-purple-600 py-2 rounded-md shadow-md hover:bg-purple-800 transition mb-3 mt-6 ${
                loading ? "opacity-80" : "opacity-100"
              }`}
              disabled={loading}
            >
              Create
            </button>
          </form>
          <div></div>
        </div>
      </Dashboard>
    </div>
  );
}
