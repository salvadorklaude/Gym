"use client";

import { useState } from "react";
import { post } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
  
    try {
      const res = await post("login", form); // call to backend
  
      // Debug: log the response
      console.log("Login response:", res);
  
      if (!res || !res.user) {
        setError("Unexpected response from server.");
        return;
      }
  
      // <<< This is where you store the token and role >>>
      localStorage.setItem("auth_token", res.token);      // save auth token
      localStorage.setItem("user_role", res.user.role);   // save user role ('admin' or 'user')
  
      // Redirect based on role
      if (res.user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err?.response?.data?.message || err.message || "Login failed");
    }
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-96 space-y-4"
      >
        <h1 className="text-xl font-bold text-center">Login</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        {/* Sign-up link */}
        <p className="text-center text-sm text-gray-500">
          No account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
