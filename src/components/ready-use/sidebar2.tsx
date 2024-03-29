"use client";
import { useEffect, useState } from "react";
import { Sidebar as SidebarComponent, Menu, MenuItem } from "react-pro-sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GripVertical, Warehouse, GanttChartSquare, Power } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { axiosInstance, rgbToHex } from "~/lib/utils";

type Theme = "light" | "dark";

interface SidebarProps {
  toggled: boolean;
  setToggled: (toggled: boolean) => void;
  setBroken: (broken: boolean) => void;
}

function Sidebar({ toggled, setToggled, setBroken }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  // const [toggled, setToggled] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => {
      return axiosInstance.delete("/auth/logout");
    },
    onSuccess: () => {
      router.replace("/auth/login");
    },
  });
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <SidebarComponent
      backgroundColor="#1f2937"
      collapsed={collapsed}
      toggled={toggled}
      onBackdropClick={() => setToggled(false)}
      breakPoint="md"
      onBreakPoint={setBroken}
      rootStyles={{
        color: "#8A8C91",
        // height: '100%'
      }}
    >
      <div className="p-6 bg-zinc-600 flex justify-between">
        <h1
          className={`font-bold text-xl text-nowrap text-stone-300 ${
            collapsed ? "hidden" : ""
          }`}
        >
          Admin Page
        </h1>
        <button type="button" onClick={() => setCollapsed(!collapsed)}>
          <GripVertical className="text-stone-400 hover:text-stone-300" />
        </button>
      </div>
      <Menu
        menuItemStyles={{
          button: {
            ":hover": {
              backgroundColor: "#1f2937",
              ["& > .ps-menu-icon, & > .ps-menu-label"]: {
                color: rgbToHex("214,211,209"),
              },
            },
            ["&.ps-active"]: {
              ["& > .ps-menu-icon, & > .ps-menu-label"]: {
                color: rgbToHex("214,211,209"),
              },
            },
          },
          label: {
            marginTop: "3px",
            opacity: collapsed ? 0 : 1,
          },
        }}
      >
        <MenuItem
          component={<Link href="/admin" />}
          icon={<Warehouse size={20} />}
          active={pathname === "/admin"}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          component={<Link href="/admin/category" />}
          icon={<GanttChartSquare size={20} />}
          active={pathname === "/admin/category"}
        >
          Category
        </MenuItem>
        <MenuItem component={<Link href="/" />}> Produk</MenuItem>
        <MenuItem icon={<Power />} onClick={() => logoutMutation.mutate()}>
          Logout
        </MenuItem>
      </Menu>
    </SidebarComponent>
  );
}

export default Sidebar;
