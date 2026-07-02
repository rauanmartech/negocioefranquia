"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, LayoutDashboard, FileText, Image as ImageIcon } from "lucide-react";
import { logout } from "./actions";
import { Suspense } from "react";

function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/nef-admin", icon: LayoutDashboard },
    { name: "Nova Notícia", href: "/nef-admin/new", icon: FileText },
    { name: "Biblioteca de Mídia", href: "/nef-admin/media", icon: ImageIcon },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">CMS</h2>
        <p className="text-sm text-gray-500">Negócio &amp; Franquia</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/nef-admin"
              ? pathname === "/nef-admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center gap-3 px-3 py-2 w-full text-left text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <LogOut size={18} />
            Sair
          </button>
        </form>
      </div>
    </aside>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar envelopado em Suspense por causa do usePathname na renderizacao estática */}
      <Suspense fallback={<aside className="w-64 bg-white border-r border-gray-200 flex flex-col" />}>
        <AdminSidebar />
      </Suspense>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
