"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { useBrand } from "@/components/providers/BrandProvider";
import { useUser } from "@/components/providers/UserProvider";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    label: "Brand",
    href: "/brand",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Calendar",
    href: "/calendar",
    badge: "30",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Editor",
    href: "/editor",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/settings",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
      </svg>
    ),
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { brand } = useBrand();
  const { user } = useUser();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-transparent relative z-10 overflow-hidden">
      {/* Mobile overlay backdrop */}
      {!collapsed && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Sidebar - floating slightly or full height but shadowed */}
      <aside
        className={`
          flex flex-col bg-white/90 backdrop-blur-xl border-r border-white shadow-clayCard z-40
          transition-all duration-300 flex-shrink-0 absolute md:relative h-full
          ${collapsed ? "-translate-x-full md:translate-x-0 w-20" : "translate-x-0 w-64"}
        `}
      >
        {/* Logo + collapse */}
        <div className={`flex items-center h-20 px-6 border-b border-white/40 ${collapsed ? "justify-center" : "justify-between"}`}>
          {!collapsed && (
            <Link href="/" className="flex items-center gap-3 cursor-pointer group">
              {brand.logo?.iconUrl ? (
                <img src={brand.logo.iconUrl} className="w-10 h-10 rounded-[14px] object-contain shadow-sm" alt="Brand Logo" />
              ) : (
                <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-clayButton transition-transform group-hover:scale-105 shrink-0" style={{ background: brand.colors?.primary }}>
                  <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
                    <path d="M9 2L15 6V12L9 16L3 12V6L9 2Z" fill="white" opacity="1"/>
                    <circle cx="9" cy="9" r="3" fill="white"/>
                  </svg>
                </div>
              )}
              <span className="font-black text-xl tracking-tight text-clay-foreground line-clamp-1">{brand.logo?.text || "Lana"}</span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors text-slate-500"
            aria-label="Toggle sidebar"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {collapsed
                ? <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                : <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              }
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`
                  flex items-center gap-4 px-4 py-3 rounded-[16px] text-sm font-bold tracking-wide
                  transition-all duration-200 cursor-pointer group
                  ${isActive
                    ? "bg-white border border-white text-clay-accent shadow-clayPressed"
                    : "text-clay-muted hover:text-clay-foreground hover:bg-white/60 hover:shadow-sm"
                  }
                  ${collapsed ? "justify-center" : ""}
                `}
              >
                <span className={`flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-clay-accent drop-shadow-sm" : "text-clay-muted"}`}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge variant="warning" size="md" className="shadow-sm">{item.badge}</Badge>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User info at bottom */}
        <div className={`p-4 border-t border-white/40 ${collapsed ? "flex justify-center" : ""}`}>
          {collapsed ? (
            <Avatar name={user.name} size="sm" status="online"/>
          ) : (
            <div className="flex items-center gap-3 p-3 rounded-[20px] bg-white/40 hover:bg-white border border-transparent hover:border-white hover:shadow-sm cursor-pointer transition-all">
              <Avatar name={user.name} size="sm" status="online"/>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-black text-clay-foreground tracking-tight truncate">{user.name}</div>
                <div className="text-xs font-bold text-clay-accent tracking-wide uppercase truncate">{user.plan}</div>
              </div>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="text-clay-muted">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Topbar */}
        <header className="h-16 md:h-20 bg-white/60 backdrop-blur-3xl border-b border-white shadow-sm flex items-center justify-between px-4 md:px-8 flex-shrink-0 z-10 sticky top-0">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-white/60 text-clay-muted shadow-sm"
              onClick={() => setCollapsed(false)}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/></svg>
            </button>
            <button onClick={() => router.back()} className="hidden md:block p-2 -ml-2 rounded-full hover:bg-white/60 transition-colors text-clay-muted hover:text-clay-foreground" title="Go Back">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div className="hidden md:flex items-center gap-2.5 text-sm font-bold tracking-wide uppercase">
              <span className="text-clay-muted line-clamp-1 max-w-[120px]">{brand.logo?.text || "Lana"}</span>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="text-clay-muted/50">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-black text-clay-foreground">
                {pathname.replace("/", "") || "Dashboard"}
              </span>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-5">
            {/* Search */}
            <button className="hidden md:flex items-center gap-2 bg-white border border-white/60 shadow-clayPressed text-clay-muted px-4 py-2 rounded-full text-sm font-bold cursor-text transition-all focus-within:shadow-clayCard focus-within:bg-white w-64">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/>
              </svg>
              Search...
            </button>

            {/* Notifications */}
            <button className="relative p-2.5 rounded-[14px] bg-white/60 hover:bg-white border border-white hover:border-white shadow-sm hover:shadow-clayButtonHover cursor-pointer transition-all text-clay-foreground" aria-label="Notifications">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full shadow-sm border border-white"/>
            </button>

            {/* New post button */}
            <Link href="/editor" className="ml-1 md:ml-2">
              <button className="flex items-center gap-1.5 bg-white text-clay-accent px-3 py-2 md:px-5 md:py-2.5 rounded-[16px] md:rounded-[20px] text-xs md:text-sm font-black cursor-pointer shadow-clayButton hover:-translate-y-1 transition-transform border border-white">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" className="hidden md:block">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
                </svg>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" className="block md:hidden">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
                </svg>
                <span className="hidden md:inline">New Post</span>
                <span className="md:hidden">Post</span>
              </button>
            </Link>

            <Link href="/settings">
              <Avatar name={user.name} size="md" status="online" className="ml-1 cursor-pointer hover:scale-105 transition-transform"/>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-0">
          {children}
        </main>
      </div>
    </div>
  );
}
