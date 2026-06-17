"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Map, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Leads", icon: Users, exact: false },
  { href: "/admin/trips", label: "Trips", icon: Map, exact: false },
];

export function AdminNav() {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col w-60 shrink-0 border-r border-ink/10 bg-cream h-screen sticky top-0">
        <Link href="/admin" className="px-6 h-16 flex items-center border-b border-ink/10">
          <span className="font-display font-black text-xl text-ink">nomichi</span>
          <span className="text-[10px] uppercase tracking-wider text-ink/40 ml-2 mt-1">team</span>
        </Link>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-colors",
                  active ? "bg-ink text-cream" : "text-ink/70 hover:bg-ink/5"
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-ink/10">
          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium text-ink/60 hover:bg-ink/5 transition-colors"
          >
            <LogOut className="size-4" />
            Sign out
          </Link>
        </div>
      </aside>

      {/* Mobile bottom bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-cream border-t border-ink/10 flex items-stretch h-16">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors",
                active ? "text-rust" : "text-ink/50"
              )}
            >
              <item.icon className="size-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
