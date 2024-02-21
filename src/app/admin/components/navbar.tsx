import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Mails, Bell } from "lucide-react";

import { axiosInstance, rgbToHex } from "~/lib/utils";

function Navbar() {
  const { data, isFetching } = useQuery({
    queryKey: ["admin"],
    queryFn: () => {
      return axiosInstance.post("/auth/is-auth");
    },
    staleTime: 1000 * 60 * 60
  });
  return (
    <div className="flex w-full shadow-md px-8 py-5">
      <ul className="ml-auto flex gap-x-4 items-center">
        <li>
          <Link href="#" className="block rounded-full bg-slate-200 p-2">
            <Mails color={rgbToHex("82,82,91")} />
          </Link>
        </li>
        <li>
          <Link href="#" className="block rounded-full bg-slate-200 p-2">
            <Bell color={rgbToHex("82,82,91")} />
          </Link>
        </li>
        <li>
          <h4 className="font-semibold text-lg">{data?.data.email}</h4>
          <p className="text-sm">{data?.data.role}</p>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
