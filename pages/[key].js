import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
export default function Key({ accessKey, destination }) {
  const [password, setPassword] = useState("");
  async function checkPassword(){
      if(password){
      const res = await axios.post("/api/utils/ispasswordvalid", {
        password,
        hash: accessKey
      })
      return res.data
    }
      return ""
  }
  async function validate(e) {
    e.preventDefault()
    if (await checkPassword()) {
      window.location.href = destination;
    } else {
      toast.error("Incorrect password");
    }
  }
  return (
    <>
      <Toaster />
      {/* <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={validate}>Submit</button> */}
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="max-w-screen-sm mx-auto w-full bg-white rounded-md shadow-md">
          <div className="w-full p-4">
            <h1 className="text-center font-bold sm:text-2xl text-lg">
              Password Required!
            </h1>
            <p className="text-center text-sm text-gray-600 font-light mt-2 font-secondary">
              This link is password protected. You will need to enter password
              to view the link.
            </p>
            <hr className="my-4" />
            <form method="POST" action="" onSubmit={validate}>
            <label className="uppercase font-bold font-secondary ml-1 text-gray-800">
              Password
            </label>
            <input
              type="password"
              className="border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500 block w-full rounded-md text-sm focus:outline-none mt-2"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className={`border-black mt-4 bg-black text-white hover:bg-white hover:text-black flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
            >
              <p class="text-sm">Authenticate</p>
            </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const content = null;
  const res = await axios.post(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : process.env.PRODUCTION_URL
    }api/links/redirectInfo`,
    {
      key: context.query.key,
    }
  );
  await axios.post(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : process.env.PRODUCTION_URL
    }api/links/updateclick`,
    {
      key: context.query.key,
      clicks: res.data.clicks,
    }
  );
  const destination = res.data.url;
  const password = res.data.password;
  if (password) {
    return {
      props: {
        accessKey: password,
        destination,
      },
    };
  } else if (destination) {
    return {
      redirect: {
        permanent: true,
        destination: destination,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}
