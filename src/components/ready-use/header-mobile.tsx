import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ShoppingCart, Heart, User } from "lucide-react";
import { Sidebar, Menu, MenuItem, MenuItemStyles } from "react-pro-sidebar";
import { SearchInput } from "./search-input";

import { rgbToHex } from "~/lib/utils";

interface SidebarProps {
  toggled: boolean;
  setToggled: (toggled: boolean) => void;
  setBroken: (broken: boolean) => void;
}

function HeaderMobile({ toggled, setToggled, setBroken }: SidebarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Sidebar
      toggled={toggled}
      // rootStyles={{}}
      transitionDuration={500}
      backgroundColor="#fff"
      collapsed={false}
      onBackdropClick={() => setToggled(false)}
      breakPoint="md"
      width="300px"
      onBreakPoint={setBroken}
    >
      <div className="mx-4">
        <div className="flex mt-6">
          <button
            className="ms-auto group"
            type="button"
            onClick={() => setToggled(false)}
          >
            <X className="text-gray group-hover:text-red-500" />
          </button>
        </div>

        <div className="mt-10">
          <SearchInput />
        </div>

        <ul className="mt-4 flex gap-x-7 justify-center">
          <li>
            <Link href="favorit">
              <User className="text-gray" size={22} />
            </Link>
          </li>
          <li className="relative">
            <Link href="favorit">
              <Heart className="text-gray" size={22} />
            </Link>
            <span className="absolute rounded-full bg-primary w-5 h-5 block leading-5 text-[12px] text-center -bottom-3 -right-3 text-white">
              6
            </span>
          </li>
          <li className="relative">
            <Link href="keranjang">
              <ShoppingCart className="text-gray" size={22} />
            </Link>
            <span className="absolute rounded-full bg-primary w-5 h-5 block leading-5 text-[12px] text-center -bottom-3 -right-3 text-white">
              6
            </span>
          </li>
        </ul>

        <Menu
          className="mt-5"
          menuItemStyles={{
            button: {
              paddingLeft: 0,
              ":hover": {
                backgroundColor: "#fff",
              },
            },
            label: {
              transition: "all",
              transitionDuration: "200ms",
              ":hover": {
                color: "#89c74a",
              },
            },
          }}
        >
          <MenuItem component={<Link href="/" />}>Home</MenuItem>
        </Menu>
      </div>
    </Sidebar>
  );
}

export default HeaderMobile;
