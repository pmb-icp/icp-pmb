"use client";

import { useState, useEffect } from "react";
import { Users, FileCheck, CreditCard, Clock, CheckCircle, XCircle } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    menunggu: 0,
    dokumen: 0,
    lulus: 0
  });
  const [recentApplicants, setRecentApplicants] = useState<any[]>([]);
  const [needsAction, setNeedsAction] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "applicants"));
        const applicants = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
        
        let total = applicants.length;
        let menunggu = 0;
        let dokumen = 0;
        let lulus = 0;
        
        const actionItems: any[] = [];
        
        applicants.forEach(app => {
          const status = app.status?.toLowerCase();
          if (status === 'lulus') lulus++;
          if (status === 'dokumen' || status === 'verifikasi') menunggu++;
          if (status === 'dokumen') dokumen++;
          
          if (status === 'dokumen' || status === 'verifikasi') {
            actionItems.push(app);
          }
        });
        
        setStats({ total, menunggu, dokumen, lulus });
        
        // Sort dummy implementation (in reality should use timestamp)
        setRecentApplicants(applicants.slice(0, 4));
        setNeedsAction(actionItems.slice(0, 5));
        
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    
    fetchStats();
  }, []);

  const statCards = [
    { name: "Total Pendaftar", value: stats.total, icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { name: "Perlu Verifikasi", value: stats.menunggu, icon: Clock, color: "text-amber-600", bg: "bg-amber-100" },
    { name: "Sedang Cek Dokumen", value: stats.dokumen, icon: FileCheck, color: "text-green-600", bg: "bg-green-100" },
    { name: "Pembayaran Lulus", value: stats.lulus, icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-100" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Ringkasan data pendaftaran mahasiswa baru.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</h3>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">Aktivitas Terbaru</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-6">
              {recentApplicants.length === 0 ? (
                <p className="text-sm text-slate-500">Belum ada aktivitas.</p>
              ) : (
                recentApplicants.map((app, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{app.biodata?.namaLengkap || 'Pendaftar'} menyelesaikan {app.status}</p>
                      <p className="text-xs text-slate-500 mt-1">{app.registrationNumber} &bull; Jalur {app.biodata?.jalur || 'Reguler'}</p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* Needs Action */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Perlu Tindakan</h2>
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-full">45 Tertunda</span>
          </div>
          <div className="p-0">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-medium">Nama</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {needsAction.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-sm text-slate-500">Tidak ada pendaftar yang perlu verifikasi.</td>
                  </tr>
                ) : (
                  needsAction.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">{app.biodata?.namaLengkap || 'Tanpa Nama'}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{app.registrationNumber}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3.5 h-3.5" />
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/admin/pendaftar/${app.id}`} className="text-green-600 hover:text-green-700 font-medium text-sm">
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
