"use client";
// import { Roboto } from "next/font/google";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { CartContext } from "./_context/CartContext";
import { useState } from "react";
import "./globals.css";
import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: ["500", "700", "900"],
  subsets: ['latin'],
})
 
// const inter = Roboto ({ subsets: ["latin"], weight: ["500", "700", "900"] });


export default function RootLayout({ children }) {
  const [cart, setCart] = useState([]);
  return (
    <ClerkProvider>
      <CartContext.Provider value={{ cart, setCart }}>
        <html lang="en">
        <head>
        <title>Ecommerce</title>
    
        </head>

          <body className={roboto.className}>
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </CartContext.Provider>
    </ClerkProvider>
  );
}
