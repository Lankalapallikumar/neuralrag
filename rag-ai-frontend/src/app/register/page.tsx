"use client";

export const dynamic =
  "force-dynamic";

import { useState } from "react";

export default function RegisterPage() {

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  // REGISTER
  const handleRegister = async () => {

    try {

      setLoading(true);

      setError("");

      setSuccess("");

      const response = await fetch(
        "http://127.0.0.1:8000/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      // ERROR
      if (data.error) {

        setError(data.error);

        setLoading(false);

        return;
      }

      // SUCCESS
      setSuccess(
        "Account created successfully"
      );

      // GO TO LOGIN
      setTimeout(() => {

        window.location.href =
          "/login";

      }, 1500);

    } catch (error) {

      console.log(error);

      setError(
        "Backend connection failed"
      );

    }

    setLoading(false);
  };


  return (

    <div className="flex items-center justify-center h-screen bg-black text-white">

      <div className="w-[400px] bg-zinc-900 p-8 rounded-2xl">

        <h1 className="text-3xl font-bold mb-6">

          Sign Up

        </h1>


        {/* ERROR */}
        {error && (

          <div className="bg-red-600 text-white p-3 rounded-xl mb-4 text-sm">

            {error}

          </div>

        )}


        {/* SUCCESS */}
        {success && (

          <div className="bg-green-600 text-white p-3 rounded-xl mb-4 text-sm">

            {success}

          </div>

        )}


        <div className="space-y-4">

          {/* USERNAME */}
          <input
            suppressHydrationWarning
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-zinc-800 outline-none"
          />


          {/* EMAIL */}
          <input
            suppressHydrationWarning
            type="email"
            placeholder="Email"
            value={email}
            autoComplete="off"
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-zinc-800 outline-none"
          />


          {/* PASSWORD */}
          <input
            suppressHydrationWarning
            type="password"
            placeholder="Password"
            value={password}
            autoComplete="new-password"
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-zinc-800 outline-none"
          />


          {/* CREATE ACCOUNT */}
          <button
            suppressHydrationWarning
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition p-4 rounded-xl"
          >

            {loading
              ? "Loading..."
              : "Create Account"}

          </button>


          {/* BACK TO LOGIN */}
          <button
            suppressHydrationWarning
            onClick={() => {

              window.location.href =
                "/login";

            }}
            className="w-full bg-zinc-700 hover:bg-zinc-600 transition p-4 rounded-xl"
          >

            Back to Login

          </button>

        </div>

      </div>

    </div>
  );
}