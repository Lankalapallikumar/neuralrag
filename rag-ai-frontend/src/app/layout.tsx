import type { Metadata } from "next";

import "./globals.css";

import Script from "next/script";


export const metadata: Metadata = {

  title: "NeuralRAG",

  description: "AI Workspace",

};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html lang="en">

      <body>

        {children}

        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />

      </body>

    </html>
  );
}