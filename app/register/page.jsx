"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
const Register = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPassword = e.target[3].value;
    console.log({
      username,
      email,
      password,
      confirmPassword,
    });

    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill all the input fields");
      return;
    } else if (password !== confirmPassword) {
      toast.error("password dosent match");
      return;
    }
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
        }),
      });
      if (res.status === 400) {
        toast.error("This email is already registerd");
      } else if (res.status === 201) {
        router.push("/login");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.push("/");
    }
  }, [sessionStatus, router]);

  if (sessionStatus === "loading") {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center flex-col">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="card bg-base-100 w-96 shadow-xl p-5 ">
            <div className="mb-4 flex flex-col gap-4">
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
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="password"
                  className="grow"
                  placeholder="Confirm Password"
                />
              </label>
            </div>
            <div className="flex gap-2 flex-row-reverse">
              <button type="submit" className="btn btn-outline btn-success">
                Submit
              </button>
              <span>
                Already have a account?{" "}
                <Link
                  href={"login"}
                  className="text-center text-blue-500 hover:underline mt-2"
                >
                  Login
                </Link>
              </span>
              <button type="button" className="btn btn-outline btn-warning">
                Cancle
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  );
};

export default Register;
