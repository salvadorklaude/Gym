"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("role"); // save role on login
    if (userRole === "admin") setIsAdmin(true);
    if (userRole) setIsLoggedIn(true);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
  ];

  if (!isLoggedIn) links.push({ href: "/login", label: "Login" });
  if (isAdmin) links.push({ href: "/admin/dashboard", label: "Dashboard" });

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md flex items-center justify-between">
      <h1 className="text-xl font-bold">Mini Store</h1>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`hover:text-blue-400 transition ${
                pathname === link.href ? "text-blue-400 font-semibold" : ""
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
        {isLoggedIn && (
          <li>
            <button
              onClick={() => {
                localStorage.clear();
                location.href = "/login";
              }}
              className="hover:text-red-400 transition"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
