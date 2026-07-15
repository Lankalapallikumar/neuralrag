"use client";

import { useState } from "react";

export default function LoginPage() {

  const [isSignup, setIsSignup] =
    useState(false);

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


  // LOGIN
  const handleLogin = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await fetch(
        "http://127.0.0.1:8000/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      // INVALID USER
      if (data.error) {

        setError(
          "User not found. Please Sign Up."
        );

        setLoading(false);

        return;
      }

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        data.access_token
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // OPEN APP
      window.location.href =
        "/chat";

    } catch (error) {

      console.log(error);

      setError(
        "Backend connection failed"
      );

    }

    setLoading(false);
  };


  // SIGNUP
  const handleSignup = async () => {

    try {

      setLoading(true);

      setError("");

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

        setError(
          data.error
        );

        setLoading(false);

        return;
      }

      // AUTO LOGIN
      const loginResponse =
        await fetch(
          "http://127.0.0.1:8000/auth/login",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

      const loginData =
        await loginResponse.json();

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        loginData.access_token
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(
          loginData.user
        )
      );

      // OPEN APP
      window.location.href =
        "/chat";

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

          {isSignup
            ? "Sign Up"
            : "Login"}

        </h1>


        {/* ERROR */}
        {error && (

          <div className="bg-red-600 text-white p-3 rounded-xl mb-4 text-sm">

            {error}

          </div>

        )}


        <div className="space-y-4">

          {/* USERNAME */}
          {isSignup && (

            <input
              suppressHydrationWarning
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              className="w-full p-4 rounded-xl bg-zinc-800 outline-none"
            />

          )}


          {/* EMAIL */}
          <input
            suppressHydrationWarning
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full p-4 rounded-xl bg-zinc-800 outline-none"
          />


          {/* PASSWORD */}
          <input
            suppressHydrationWarning
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full p-4 rounded-xl bg-zinc-800 outline-none"
          />


          {/* MAIN BUTTON */}
          <button
            suppressHydrationWarning
            onClick={
              isSignup
                ? handleSignup
                : handleLogin
            }
            className="w-full bg-blue-600 hover:bg-blue-700 transition p-4 rounded-xl"
          >

            {loading
              ? "Loading..."
              : isSignup
              ? "Create Account"
              : "Login"}

          </button>


          {/* TOGGLE BUTTON */}
          <button
            suppressHydrationWarning
            onClick={() => {

              setIsSignup(
                !isSignup
              );

              setError("");

            }}
            className="w-full bg-zinc-700 hover:bg-zinc-600 transition p-4 rounded-xl"
          >

            {isSignup
              ? "Back to Login"
              : "Sign Up"}

          </button>

        </div>

      </div>

    </div>
  );
}