"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type Member = {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  membershipType?: string;
  expiresAt: string;
};

export default function GymMembersPage() {
  const router = useRouter();

  const [members, setMembers] = useState<Member[]>([]);
  const [newMember, setNewMember] = useState<Partial<Member>>({
    name: "",
    email: "",
    status: "Active",
    membershipType: "",
    expiresAt: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingMember, setEditingMember] = useState<Partial<Member>>({});
  const [nextTempId, setNextTempId] = useState(-1);

  useEffect(() => {
    fetch("http://localhost:8000/api/members")
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((err) => console.error("Failed to fetch members:", err));
  }, []);

  const handleAdd = async () => {
    if (!newMember.name || !newMember.email || !newMember.expiresAt) {
      alert("Please fill in all required fields.");
      return;
    }

    const tempId = nextTempId;
    setNextTempId((prev) => prev - 1);

    const memberToAdd: Member = {
      id: tempId,
      name: newMember.name!,
      email: newMember.email!,
      status: newMember.status as "Active" | "Inactive",
      membershipType: newMember.membershipType,
      expiresAt: newMember.expiresAt!,
    };

    setMembers((prev) => [...prev, memberToAdd]);

    setNewMember({ name: "", email: "", status: "Active", membershipType: "", expiresAt: "" });

    try {
      const res = await fetch("http://localhost:8000/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memberToAdd),
      });

      if (!res.ok) throw new Error("Failed to add member");

      const data = await res.json();

      setMembers((prev) =>
        prev.map((m) => (m.id === tempId ? data : m))
      );
    } catch (err) {
      console.error("Failed to save member to backend:", err);
      alert("Failed to save member to backend. Check console for details.");
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8000/api/members/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingMember),
      });

      if (!res.ok) throw new Error("Failed to update member");

      const data = await res.json();

      setMembers((prev) => prev.map((m) => (m.id === id ? data : m)));
      setEditingId(null);
      setEditingMember({});
    } catch (err) {
      console.error("Failed to update member:", err);
      alert("Failed to update member. Check console for details.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this member?")) return;

    setMembers((prev) => prev.filter((m) => m.id !== id));

    try {
      await fetch(`http://localhost:8000/api/members/${id}`, { method: "DELETE" });
    } catch (err) {
      console.error("Failed to delete member from backend:", err);
      alert("Failed to delete member from backend. Check console for details.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#0a0a0a] to-[#111] min-h-screen p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Manage Gym Members</h1>
        <Button className="bg-red-600 hover:bg-red-700" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      {/* Add member */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-6">
        <Input
          placeholder="Name"
          value={newMember.name}
          onChange={(e) => setNewMember((prev) => ({ ...prev, name: e.target.value }))}
          className="bg-[#111] border border-gray-700 text-white placeholder:text-gray-400"
        />
        <Input
          placeholder="Email"
          value={newMember.email}
          onChange={(e) => setNewMember((prev) => ({ ...prev, email: e.target.value }))}
          className="bg-[#111] border border-gray-700 text-white placeholder:text-gray-400"
        />
        <Select
          value={newMember.status}
          onValueChange={(value) => setNewMember((prev) => ({ ...prev, status: value as "Active" | "Inactive" }))}
        >
          <SelectTrigger className="bg-[#111] border border-gray-700 text-white placeholder:text-gray-400">
            <SelectValue className="text-white" placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border border-gray-700 text-white">
            <SelectItem value="Active" className="text-white">Active</SelectItem>
            <SelectItem value="Inactive" className="text-white">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="date"
          placeholder="Membership Expiry"
          value={newMember.expiresAt}
          onChange={(e) => setNewMember((prev) => ({ ...prev, expiresAt: e.target.value }))}
          className="bg-[#111] border border-gray-700 text-white placeholder:text-gray-400"
        />
        <Button className="bg-red-600 hover:bg-red-700" onClick={handleAdd}>
          Add Member
        </Button>
      </div>

      {/* Members table */}
      <Table className="bg-[#111] border border-gray-700 text-white">
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Expires At</TableHead>
            <TableHead className="text-right text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id} className="hover:bg-gray-900">
              <TableCell className="text-white">{member.id}</TableCell>
              <TableCell>
                {editingId === member.id ? (
                  <Input
                    value={editingMember.name}
                    onChange={(e) => setEditingMember((prev) => ({ ...prev, name: e.target.value }))}
                    className="bg-[#111] border border-gray-700 text-white placeholder:text-gray-400"
                  />
                ) : (
                  <span className="text-white">{member.name}</span>
                )}
              </TableCell>
              <TableCell>
                {editingId === member.id ? (
                  <Input
                    value={editingMember.email}
                    onChange={(e) => setEditingMember((prev) => ({ ...prev, email: e.target.value }))}
                    className="bg-[#111] border border-gray-700 text-white placeholder:text-gray-400"
                  />
                ) : (
                  <span className="text-white">{member.email}</span>
                )}
              </TableCell>
              <TableCell>
                {editingId === member.id ? (
                  <Select
                    value={editingMember.status}
                    onValueChange={(value) => setEditingMember((prev) => ({ ...prev, status: value as "Active" | "Inactive" }))}
                  >
                    <SelectTrigger className="bg-[#111] border border-gray-700 text-white placeholder:text-gray-400">
                      <SelectValue className="text-white" placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border border-gray-700 text-white">
                      <SelectItem value="Active" className="text-white">Active</SelectItem>
                      <SelectItem value="Inactive" className="text-white">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge className={member.status === "Active" ? "bg-green-600" : "bg-red-700"}>
                    {member.status}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {editingId === member.id ? (
                  <Input
                    type="date"
                    value={editingMember.expiresAt}
                    onChange={(e) => setEditingMember((prev) => ({ ...prev, expiresAt: e.target.value }))}
                    className="bg-[#111] border border-gray-700 text-white placeholder:text-gray-400"
                  />
                ) : (
                  <span className="text-white">{member.expiresAt}</span>
                )}
              </TableCell>
              <TableCell className="text-right space-x-2">
                {editingId === member.id ? (
                  <>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleUpdate(member.id)}>Save</Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingId(member.id);
                        setEditingMember(member);
                      }}
                    >
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(member.id)}>
                      Delete
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
