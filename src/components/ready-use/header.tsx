import Link from "next/link";

import { ShoppingCart, Heart, User } from "lucide-react";
import { useWindowScroll } from "@uidotdev/usehooks";
import { SearchInput } from "~/components/ready-use/search-input";
import { cn } from "~/lib/utils";

function Header() {
  const [{ y }] = useWindowScroll();

  return (
    <header>
      <div className="bg-primary py-[10px] text-white">
        <div className="container flex justify-between max-w-full">
          <span>Cari kebutuhan ibadahmu</span>
          <span>21 Januari 2023</span>
        </div>
      </div>

      <div
        className={cn(
          'container max-w-full flex items-center justify-between uppercase font-semibold py-11',
          y &&
            (y > 400
              ? "fixed shadow-md -top-12 transition duration-500 translate-y-[48px] max-w-full"
              : "")
        )}
      >
        <div>Logo</div>
        <ul className="flex gap-x-5">
          <li className="group relative">
            <Link
              href="/"
              className={cn(
                "group-hover:text-primary transition-all text-[13px]",
                "after:absolute after:content-[''] after:h-[2px] after:transition-all after:duration-300 after:w-full after:scale-x-0 after:origin-left after:bg-primary after:right-0 after:-bottom-1 after:group-hover:scale-x-100"
              )}
            >
              Home
            </Link>
          </li>
          <li className="group relative">
            <Link
              href="/kategori"
              className={cn(
                "group-hover:text-primary transition-all text-[13px]",
                "after:absolute after:content-[''] after:h-[2px] after:transition-all after:duration-300 after:w-full after:scale-x-0 after:origin-left after:bg-primary after:right-0 after:-bottom-1 after:group-hover:scale-x-100"
              )}
            >
              Kategori
            </Link>
          </li>
          <li className="group relative">
            <Link
              href="/produk"
              className={cn(
                "group-hover:text-primary transition-all text-[13px]",
                "after:absolute after:content-[''] after:h-[2px] after:transition-all after:duration-300 after:w-full after:scale-x-0 after:origin-left after:bg-primary after:right-0 after:-bottom-1 after:group-hover:scale-x-100"
              )}
            >
              Produk
            </Link>
          </li>
          <li className="group relative">
            <Link
              href="/about-us"
              className={cn(
                "group-hover:text-primary transition-all text-[13px]",
                "after:absolute after:content-[''] after:h-[2px] after:transition-all after:duration-300 after:w-full after:scale-x-0 after:origin-left after:bg-primary after:right-0 after:-bottom-1 after:group-hover:scale-x-100"
              )}
            >
              About Us
            </Link>
          </li>
          <li className="group relative">
            <Link
              href="/contact"
              className={cn(
                "group-hover:text-primary transition-all text-[13px]",
                "after:absolute after:content-[''] after:h-[2px] after:transition-all after:duration-300 after:w-full after:scale-x-0 after:origin-left after:bg-primary after:right-0 after:-bottom-1 after:group-hover:scale-x-100"
              )}
            >
              Contact Us
            </Link>
          </li>
        </ul>

        <ul className="flex gap-x-5">
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
      </div>
      <div className="container max-w-full flex justify-between flex-wrap">
        <SearchInput className="w-[58%]" />
        <p>Hubungi: 085-232-517-546</p>
      </div>
    </header>
  );
}

export default Header;
