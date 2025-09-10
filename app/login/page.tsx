"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, User, Shield, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type UserRole = "admin" | "user";

type User = {
  id: number;
  email: string;
  password: string;
  role: UserRole;
  name: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const demoUsers: User[] = [
    { id: 1, email: "admin@powerhouse.com", password: "admin123", role: "admin", name: "Admin User" },
    { id: 2, email: "user@powerhouse.com", password: "user123", role: "user", name: "Regular User" },
    { id: 3, email: "john@example.com", password: "password", role: "user", name: "John Doe" }
  ];

  const handleSubmit = async () => {
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const user = demoUsers.find((u) => u.email === email && u.password === password);

      if (!user) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(user));

      if (user.role === "admin") router.push("/admin/dashboard");
      else router.push("/");

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
      <div className="bg-gray-900 p-10 rounded-2xl shadow-2xl w-full max-w-md">
        
        
<Button
  className="mb-4 bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
  onClick={() => router.back()}
>
  <ArrowLeft className="h-4 w-4" /> Back
</Button>


        <h1 className="text-3xl font-extrabold text-center mb-8">
          <span className="text-red-600">PowerHouse</span> Gym
        </h1>

        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        <div className="mb-6 space-y-3">
          <p className="text-sm text-gray-400 text-center">Demo Accounts:</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-red-500" />
                <span>admin@powerhouse.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="destructive" className="text-xs">Admin</Badge>
                <code className="text-gray-400">admin123</code>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-blue-500" />
                <span>user@powerhouse.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">User</Badge>
                <code className="text-gray-400">user123</code>
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-4 bg-red-900/20 border-red-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-200">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Form */}
        <div className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white placeholder:text-gray-400"
            disabled={isLoading}
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white placeholder:text-gray-400 pr-10"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <Button 
            onClick={handleSubmit} 
            className="bg-red-600 hover:bg-red-700 w-full"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </div>

        {/* Quick Login Buttons */}
        <div className="mt-6 space-y-2">
          <p className="text-xs text-gray-500 text-center">Quick Login:</p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEmail("admin@powerhouse.com");
                setPassword("admin123");
              }}
              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
              disabled={isLoading}
            >
              <Shield className="h-3 w-3 mr-1" />
              Admin
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEmail("user@powerhouse.com");
                setPassword("user123");
              }}
              className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
              disabled={isLoading}
            >
              <User className="h-3 w-3 mr-1" />
              User
            </Button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-gray-400 text-sm text-center mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-red-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
