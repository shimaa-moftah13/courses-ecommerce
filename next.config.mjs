/** @type {import('next').NextConfig} */
// const nextConfig = {
//     images:{
//         domains:['res.cloudinary.com']
//     }
// };



const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },


}
export default nextConfig;