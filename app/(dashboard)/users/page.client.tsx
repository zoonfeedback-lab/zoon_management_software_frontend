"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GhostButton } from "@/components/ui";

import { api } from "@/lib/api";

interface User {
  id: string;
  fullName: string;
  email: string;
  isActive: boolean;
  role: {
    key: string;
    name: string;
  };
  createdAt: string;
}

export default function UsersClient() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const res = await response.json();
        setUsers(res.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="flex h-[400px] items-center justify-center text-mute uppercase tracking-[0.2em]">Synchronizing User Database...</div>;
  }

  return (
    <div className="grid gap-8">
      {/* Top Header / Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9897a1]/40" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded border border-white/10 bg-[#0b0b0d] py-2.5 pl-12 pr-4 text-sm text-white focus:border-brand/30 focus:ring-1 focus:ring-brand/20 outline-none"
          />
        </div>
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-4">
              <button className="text-[#9897a1] hover:text-white transition-colors">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              </button>
              <button className="text-[#9897a1] hover:text-white transition-colors">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </button>
           </div>
           <Link href="/users/create" className="bg-black text-white px-6 py-2.5 text-sm font-bold uppercase tracking-wider border border-white/20 hover:bg-white/5 transition-colors">
              + Add New User
           </Link>
        </div>
      </div>

      <div className="flex justify-between items-end">
         <div>
            <h1 className="display-title text-4xl text-white">User Management</h1>
            <p className="mt-2 text-[#9897a1] text-sm uppercase tracking-widest font-medium">Manage terminal access and authorization protocols.</p>
         </div>
         <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9897a1]">System Status</span>
            <div className="flex items-center gap-1.5">
               <div className="h-2 w-2 rounded-full bg-[#ff2026] animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-white">Live</span>
            </div>
         </div>
      </div>

      {error && (
        <div className="bg-brand/10 border border-brand/20 p-4 rounded text-brand text-xs font-bold uppercase tracking-widest">
          Error: {error}
        </div>
      )}

      {/* Main Table */}
      <div className="overflow-hidden border border-[#5c4033]/30 bg-[#171719]/40 rounded-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#5c4033]/10 border-b border-[#5c4033]/30">
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Name</th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Email Address</th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Clearance Role</th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Status</th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Created Date</th>
                <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-[0.2em] text-[#9897a1]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5c4033]/20">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-6 py-5 text-sm font-bold text-white/90">{user.fullName}</td>
                  <td className="px-6 py-5 text-xs font-medium text-[#9897a1]">{user.email}</td>
                  <td className="px-6 py-5 text-xs font-medium text-[#9897a1]">{user.role.name}</td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      user.isActive 
                        ? 'bg-success/10 text-success border-success/20' 
                        : 'bg-brand/10 text-brand border-brand/20'
                    }`}>
                      {user.isActive ? "Active" : "Suspended"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-[11px] font-medium text-[#9897a1]">
                    {new Date(user.createdAt).toISOString().replace('T', ' ').substring(0, 16)}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-3">
                       <button className="text-[#9897a1] hover:text-white transition-colors p-1">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                       </button>
                       <button className="text-[#9897a1] hover:text-white transition-colors p-1">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-xs font-black uppercase tracking-widest text-[#9897a1]/40">
                    No matching authorized profiles found in database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer / Pagination */}
        <div className="flex items-center justify-between border-t border-[#5c4033]/30 bg-[#5c4033]/5 px-6 py-4">
           <span className="text-[10px] font-bold uppercase tracking-widest text-[#9897a1]/60">Showing 1-{filteredUsers.length} of {users.length} users</span>
           <div className="flex gap-2">
              <button className="h-8 w-8 rounded border border-white/10 flex items-center justify-center text-[#9897a1] hover:bg-white/5 disabled:opacity-30">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button className="h-8 w-8 rounded border border-white/10 flex items-center justify-center text-[#9897a1] hover:bg-white/5">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
