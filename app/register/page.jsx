"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Register = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.push("/");
    }
  }, [sessionStatus, router]);
  return (
    sessionStatus !== "authenticated" && (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center flex-col">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form>
          <div className="card bg-base-100 w-96 shadow-xl p-5">
            <div className="mb-4">
              <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Email" />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Username" />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="password"
                  className="grow"
                  placeholder="Password"
                />
              </label>
            </div>
            <div cla>
              <button className="btn btn-outline btn-success">Submit</button>
              <button className="btn btn-outline btn-warning">Cancle</button>
            </div>
          </div>
        </form>
      </div>
    )
  );
};

export default Register;
