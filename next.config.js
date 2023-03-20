const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  runtimeCaching,
  buildExcludes: [/middleware-manifest\.json$/],
  scope: "/",
  sw: "service-worker.js",
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

// https://www.portaldolicenciamento.com/perguntas-e-respostas/confeccionar-alimentos-em-casa-particular.html

// https://weat.pt/como-comecar-um-negocio-de-food-delivery-em-portugal/
module.exports = withPWA({
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "img.icons8.com",
      "icons8.com",
      "i.ibb.co",
      "i.postimg.cc",
      "fakestoreapi.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "hips.hearstapps.com",
      "cdn.shopify.com",
      "",
    ],
  },
});

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// module.exports = withBundleAnalyzer({});
