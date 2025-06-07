'use client';
import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { LuBox } from "react-icons/lu";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: <IoHomeOutline />, label: "หน้าหลัก", href: "/" },
  { icon: <LuBox />, label: "เมนู", href: "/menu" },
  { icon: <HiOutlineBuildingOffice  />, label: "สินเชื่อ", href: "/loan" },
  { icon: <BiMessageSquareDetail />, label: "แจ้งเตือน", href: "/notification" },
  { icon: <FiSettings  />, label: "ตั้งค่า", href: "/setting" },
];

export default function MobileNavbar() {
  const pathname = usePathname();
  return (
    <nav style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      background: "#fff",
      borderTop: "1px solid #eee",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      height: 70,
      zIndex: 1000,
    }}>
      {navItems.map((item) => {
        let isActive = pathname === item.href;
        if (item.href === "/menu" && (pathname.startsWith("/menu") || pathname.startsWith("/financial"))) {
          isActive = true;
        }
        return (
          <Link key={item.label} href={item.href} style={{ textDecoration: "none" }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: isActive ? "#FF7A00" : "#888",
            }}>
              <div style={{ fontSize: 24 }}>{item.icon}</div>
              <span style={{ fontSize: 14, marginTop: 4, color: isActive ? "#FF7A00" : "#888" }}>{item.label}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
} 