"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingCart } from "lucide-react";

import { useMediaQuery } from "~/hooks";
import Header from "~/components/ready-use/header";
import HeaderMobile from "~/components/ready-use/header-mobile";

export default function UserLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      {isDesktop ? (
        <Header />
      ) : (
        <HeaderMobile
          toggled={toggled}
          setToggled={setToggled}
          setBroken={setBroken}
        />
      )}

      <main>
        {broken && !isDesktop ? (
          <div className="mt-7 container flex max-w-full justify-between h-fit">
            <div>Logo</div>

            <ul className="bg flex items-center gap-x-5">
              <li className="relative">
                <Link href="keranjang">
                  <ShoppingCart className="text-gray" width={22} size={22} />
                </Link>
                <span className="absolute rounded-full bg-primary w-5 h-5 block leading-5 text-[12px] text-center -bottom-3 -right-3 text-white">
                  6
                </span>
              </li>
              <button className="" onClick={() => setToggled(!toggled)}>
                <Menu size={22} />
              </button>
            </ul>
          </div>
        ) : (
          ""
        )}
        {children}
      </main>
    </>
  );
}
