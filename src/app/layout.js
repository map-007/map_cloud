"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import SideNavbar from "@/components/SideNavbar";
import SearchBar from "@/components/SearchBar";
import { ToastContent } from "@/context/ToastContext";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import NextAuthSessionProvider from "../providers/SessionProvider";
import { ParentFolderIdContext } from "@/context/ParentFolderIdContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  const [showToastMsg, setShowToastMsg] = useState();
  const [parentFolderId, setParentFolderId] = useState();

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthSessionProvider>
          <ParentFolderIdContext.Provider
            value={{ parentFolderId, setParentFolderId }}
          >
            <ToastContent.Provider value={{ showToastMsg, setShowToastMsg }}>
              <div className="flex">
                <SideNavbar />
                <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-3 w-full">
                  <div className="p-5 col-span-2">
                    <SearchBar />
                    {children}
                  </div>
                  <div className="bg-white p-5">storage</div>
                </div>
              </div>
              {showToastMsg ? <Toaster /> : null}
            </ToastContent.Provider>
          </ParentFolderIdContext.Provider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
