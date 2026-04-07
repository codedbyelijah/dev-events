"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  Briefcase,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";
import Image from "next/image";
import { IUser } from "@/database";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="animate-pulse h-10 w-10 bg-gray-600 rounded-full"></div>
    );
  }

  if (session) {
    const user = session.user;
    const initials = user?.name
      ? user.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "U";

    return (
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <div className="w-10 h-10 bg-linear-to-br from-[#5dfeca] to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
            {user?.image ? (
              <Image
                src={user.image}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover"
                width={50}
                height={50}
              />
            ) : (
              <span className="text-sm">{initials}</span>
            )}
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-300 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-secondary-foreground rounded-lg shadow-lg border-none overflow-hidden z-50">
            {/* User Info */}
            <div className="p-4 bg-black/40 backdrop-blur-md">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-linear-to-br from-[#5dfeca] to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt="Avatar"
                      className="w-full h-full rounded-full object-cover"
                      width={50}
                      height={50}
                    />
                  ) : (
                    <span>{initials}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user?.name || "Unknown User"}
                  </p>
                  {user?.email && (
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  )}
                  {(user as IUser)?.organization && (
                    <div className="flex items-center space-x-1 mt-1">
                      <Briefcase className="w-3 h-3 text-gray-400" />
                      <p className="text-xs text-gray-600 truncate">
                        {(user as IUser).organization}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Menu Items */}
            <div className="py-2">
              <Link
                href="/profile"
                className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-800 transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-800 transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>

              <button
                onClick={() => {
                  signOut({ callbackUrl: "/login" });
                  setIsDropdownOpen(false);
                }}
                className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="px-10 py-2 text-sm font-medium text-white bg-white/5 backdrop-blur-md border border-white/20 rounded-md hover:bg-white/10 transition-colors"
    >
      Sign in
    </Link>
  );
}
