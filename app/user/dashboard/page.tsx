"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const role = localStorage.getItem("user_role");

    if (!token || role !== "user") router.replace("/login");
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <p>Welcome, regular user!</p>
    </div>
  );
}
