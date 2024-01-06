"use client";

import { useFormState } from "react-dom";
import { login } from "./action";

export default function Page() {
  const initState = {
    message: "",
  };

  const [state, formAction] = useFormState(login, initState);

  return (
    <>
      <div className=" h-screen flex items-center justify-center bg-slate-500 font-semibold">
        <div className="bg-slate-300 border p-4 w-full max-w-md ">
          <form action={formAction}>
            <div className=" flex flex-col max-w-md flex-1 gap-1">
              <div>Email :</div>{" "}
              <div className="shadow">
                {" "}
                <input
                  className="rounded-md w-full"
                  type="email"
                  name="email"
                  id=""
                />
              </div>
              <div>Password :</div>{" "}
              <div className="shadow">
                <input
                  className="rounded-md w-full"
                  type="password"
                  name="password"
                  id=""
                />
              </div>
              <div> Message : {state?.message}</div>
              <button className="rounded-md font-bold shadow p-2 bg-blue-500 text-white ">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
