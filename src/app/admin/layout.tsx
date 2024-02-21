"use client";
import { useState } from "react";
import Sidebar from "~/components/ready-use/sidebar2";
import Navbar from "./components/navbar";
import { Toaster } from "react-hot-toast";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toggledSidbear, setToggledSidebar] = useState(false);
  const [broken, setBroken] = useState(false);
  return (
    <main className="flex h-full">
      <Sidebar
        toggled={toggledSidbear}
        setToggled={setToggledSidebar}
        setBroken={setBroken}
      />
      {broken && (
        <button
          className="fixed right-0 top-0"
          onClick={() => setToggledSidebar(!toggledSidbear)}
        >
          Buka
        </button>
      )}
      <div className="w-full h-screen overflow-y-scroll">
        <Navbar />
        {children}
      </div>
    </main>
  );
}
