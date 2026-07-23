"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react";

import { navigation } from "@/config/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useSidebarStore } from "@/store/sidebar.store";

export function Sidebar() {

  const pathname =
    usePathname();

  const logout =
    useAuthStore(
      (state) => state.logout
    );

  const collapsed =
    useSidebarStore(
      (state) => state.collapsed
    );

  const [openGroup, setOpenGroup] =
    useState<string | null>("Operations");

  return (

    <aside
      className={`sticky top-0 flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300 ${
        collapsed
          ? "w-20"
          : "w-64"
      }`}
    >

      {/* Logo */}

      <div className="flex h-16 items-center border-b border-slate-200 px-6">

        {collapsed ? (

          <div className="mx-auto text-xl font-bold text-blue-600">
            SP
          </div>

        ) : (

          <div>

            <h1 className="text-xl font-bold text-slate-900">
              SmartPOS
            </h1>

            <p className="text-xs text-slate-500">
              Admin Platform
            </p>

          </div>

        )}

      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto px-3 py-4">

        <div className="space-y-1">

          {navigation.map((item) => {

            const Icon =
              item.icon;

            if (!item.children) {

              const active =
                pathname === item.href;

              return (

                <Link
                  key={item.title}
                  href={item.href}
                  className={`flex h-11 items-center gap-3 rounded-xl px-3 transition ${
                    active
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >

                  <Icon size={19} />

                  {!collapsed && (

                    <span className="truncate text-sm font-medium">

                      {item.title}

                    </span>

                  )}

                </Link>

              );

            }

            const opened =
              openGroup === item.title;

            return (

              <div key={item.title}>

                <button
                  onClick={() =>
                    setOpenGroup(
                      opened
                        ? null
                        : item.title
                    )
                  }
                  className="flex h-11 w-full items-center justify-between rounded-xl px-3 text-slate-700 transition hover:bg-slate-100"
                >

                  <div className="flex items-center gap-3">

                    <Icon size={19} />

                    {!collapsed && (

                      <span className="truncate text-sm font-medium">

                        {item.title}

                      </span>

                    )}

                  </div>

                  {!collapsed && (

                    opened
                      ? <ChevronDown size={16} />
                      : <ChevronRight size={16} />

                  )}

                </button>

                {!collapsed &&
                  opened && (

                    <div className="ml-7 mt-1 border-l border-slate-200 pl-3">

                      {item.children.map((child) => {

                        const ChildIcon =
                          child.icon;

                        const active =
                          pathname === child.href;

                        return (

                          <Link
                            key={child.title}
                            href={child.href}
                            className={`mb-1 flex h-10 items-center gap-3 rounded-lg px-3 transition ${
                              active
                                ? "bg-blue-50 font-medium text-blue-600"
                                : "text-slate-600 hover:bg-slate-100"
                            }`}
                          >

                            <ChildIcon size={16} />

                            <span className="truncate text-sm">

                              {child.title}

                            </span>

                          </Link>

                        );

                      })}

                    </div>

                  )}

              </div>

            );

          })}

        </div>

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-200 p-3">

        <button
          onClick={logout}
          className="flex h-11 w-full items-center gap-3 rounded-xl px-3 text-red-600 transition hover:bg-red-50"
        >

          <LogOut size={19} />

          {!collapsed && (

            <span className="font-medium">

              Logout

            </span>

          )}

        </button>

      </div>

    </aside>

  );

}