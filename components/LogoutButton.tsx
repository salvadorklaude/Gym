"use client";

export default function LogoutButton() {
  async function handleLogout() {
    try {
      await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.removeItem("token");
      window.location.href = "/login"; // redirect after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
    >
      Logout
    </button>
  );
}
