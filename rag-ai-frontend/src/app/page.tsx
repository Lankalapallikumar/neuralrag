"use client";

import { useEffect } from "react";

export default function HomePage() {

  useEffect(() => {

    const user =
      localStorage.getItem("user");

    // USER EXISTS
    if (
      user &&
      user !== "undefined"
    ) {

      window.location.href =
        "/chat";

    }

    // NO USER
    else {

      window.location.href =
        "/login";

    }

  }, []);

  return (

    <div className="h-screen flex items-center justify-center bg-black text-white">

      Loading...

    </div>

  );
}