"use client";

import {
  Bell,
  Menu,
  Plus,
  Search,
} from "lucide-react";

import { useAuthStore } from "@/store/auth.store";
import { useSidebarStore } from "@/store/sidebar.store";

export function Topbar() {
  const user =
    useAuthStore(
      (state) => state.user
    );

  const toggle =
    useSidebarStore(
      (state) => state.toggle
    );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">

      <div className="flex h-16 items-center justify-between px-6">

        {/* Left */}

        <div className="flex items-center gap-4">

          <button
            onClick={toggle}
            aria-label="Toggle Sidebar"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            <Menu size={20} />
          </button>

          <div>

            <h2 className="text-xl font-semibold text-slate-900">
              Dashboard
            </h2>

            <p className="text-sm text-slate-500">
              SmartPOS Platform
            </p>

          </div>

        </div>

        {/* Search */}

        <div className="mx-8 hidden max-w-xl flex-1 lg:block">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search merchants, terminals, transactions..."
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 caret-blue-600 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <div className="hidden xl:flex items-center gap-3">

            <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">

              <Plus
                size={16}
                className="text-white"
              />

              <span className="text-white">
                Merchant
              </span>

            </button>

            <button className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100">

              <Plus
                size={16}
                className="text-slate-700"
              />

              <span className="text-slate-700">
                Terminal
              </span>

            </button>

          </div>

          <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-100">

            <Bell
              size={20}
              className="text-slate-700"
            />

            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />

          </button>

          <div className="flex items-center gap-3 border-l border-slate-200 pl-4">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">

              {user?.name?.[0]}
              {user?.name?.[1]}

            </div>

            <div className="hidden md:block">

              <p className="font-semibold text-slate-900">

                {user?.name}

              </p>

              <p className="text-xs uppercase tracking-wide text-slate-500">

                {user?.role}

              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}