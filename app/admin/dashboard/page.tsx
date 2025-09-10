"use client";

import { useState } from "react";
import { Home, Users, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminDashboardPage() {
  const [active, setActive] = useState("overview");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Admin</h1>
        <nav className="space-y-2 flex-1">
          <Button
            variant={active === "overview" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActive("overview")}
          >
            <Home className="mr-2 h-4 w-4" /> Overview
          </Button>
          <Button
            variant={active === "users" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActive("users")}
          >
            <Users className="mr-2 h-4 w-4" /> Users
          </Button>
          <Button
            variant={active === "settings" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActive("settings")}
          >
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
        </nav>
        <Button variant="destructive" className="mt-auto">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {active === "overview" && (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold text-lg">Users</h2>
                <p className="text-gray-600">150 registered users</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold text-lg">Donations</h2>
                <p className="text-gray-600">$12,340 total</p>
              </CardContent>
            </Card>
          </div>
        )}

        {active === "users" && (
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg mb-4">Manage Users</h2>
              <p className="text-gray-600">User list and actions go here...</p>
            </CardContent>
          </Card>
        )}

        {active === "settings" && (
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg mb-4">Settings</h2>
              <p className="text-gray-600">Admin settings form goes here...</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
