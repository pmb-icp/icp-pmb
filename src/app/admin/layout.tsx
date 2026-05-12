"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  FileCheck, 
  CreditCard, 
  LogOut,
  Settings,
  Search
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, userData, loading } = useAuth();

  // Role-Based Access Control (RBAC) Check
  if (!loading) {
    if (!user) {
      router.push("/login");
      return null;
    }
    if (userData && userData.role !== 'admin') {
      router.push("/dashboard");
      return null;
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Data Pendaftar", icon: Users, href: "/admin/pendaftar" },
    { name: "Scan QR Ujian", icon: Search, href: "/admin/scan" },
    { name: "Pengaturan", icon: Settings, href: "/admin/settings" },
  ];

  if (loading || !userData || userData.role !== 'admin') {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">Memverifikasi akses Admin...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex fixed h-full z-20">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="bg-white p-1 rounded-md">
            <Image src="/logo.png" alt="Logo ICP" width={32} height={32} className="object-contain" />
          </div>
          <div>
            <span className="font-bold text-lg block leading-none">Admin PMB</span>
            <span className="text-xs text-slate-400">Institut Cokroaminoto</span>
          </div>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive 
                    ? "bg-green-600 text-white" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-left text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl transition">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top Header Mobile */}
        <header className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="bg-white p-1 rounded-md">
              <Image src="/logo.png" alt="Logo ICP" width={24} height={24} className="object-contain" />
            </div>
            <span className="font-bold text-lg">Admin PMB</span>
          </div>
          <button className="p-2 bg-slate-800 rounded-md">
            <LayoutDashboard className="w-5 h-5" />
          </button>
        </header>

        <div className="p-6 md:p-8 flex-1 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
