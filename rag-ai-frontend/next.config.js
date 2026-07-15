/** @type {import('next').NextConfig} */

const nextConfig = {

  allowedDevOrigins: [

    "192.168.0.6",

    "localhost"

  ],

  async rewrites() {

    return [

      {

        source: "/api/:path*",

        destination:
          "http://127.0.0.1:8000/:path*",

      },

    ];

  },

};

module.exports = nextConfig;