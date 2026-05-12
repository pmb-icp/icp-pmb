"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, Eye, MoreVertical } from "lucide-react";

export default function AdminPendaftarPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const mockData = [
    { id: "1", regNo: "PMB2026041", name: "Siti Aminah", phone: "081234567890", status: "Dokumen", program: "S1 Sistem Informasi", date: "12 Mei 2026" },
    { id: "2", regNo: "PMB2026042", name: "Budi Santoso", phone: "082345678901", status: "Pembayaran", program: "S1 Teknik Informatika", date: "11 Mei 2026" },
    { id: "3", regNo: "PMB2026043", name: "Andi Wijaya", phone: "083456789012", status: "Lulus", program: "S1 Agroteknologi", date: "10 Mei 2026" },
    { id: "4", regNo: "PMB2026044", name: "Rina Marlina", phone: "084567890123", status: "Draft", program: "-", date: "12 Mei 2026" },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Lulus':
        return <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium">Lulus Verifikasi</span>;
      case 'Pembayaran':
        return <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-xs font-medium">Cek Pembayaran</span>;
      case 'Dokumen':
        return <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-medium">Cek Dokumen</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-medium">Draft</span>;
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Data Pendaftar</h1>
          <p className="text-slate-500 mt-1">Kelola dan verifikasi seluruh data pendaftar PMB.</p>
        </div>
        <button className="bg-green-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-800 transition shadow-sm">
          Export Data (Excel)
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Cari nama atau nomor pendaftaran..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-green-600 focus:border-green-600 bg-white"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition bg-white w-full sm:w-auto justify-center">
            <Filter className="w-4 h-4" />
            Filter Status
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">No. Pendaftaran</th>
                <th className="px-6 py-4 font-semibold">Nama Peserta</th>
                <th className="px-6 py-4 font-semibold">Program Studi</th>
                <th className="px-6 py-4 font-semibold">Tanggal Daftar</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockData.map((peserta) => (
                <tr key={peserta.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4">
                    <span className="font-mono font-medium text-slate-900">{peserta.regNo}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{peserta.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{peserta.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{peserta.program}</td>
                  <td className="px-6 py-4 text-slate-600">{peserta.date}</td>
                  <td className="px-6 py-4">
                    {getStatusBadge(peserta.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link 
                        href={`/admin/pendaftar/${peserta.id}`}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition"
                        title="Lihat Detail"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <button className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-md transition">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-600 bg-slate-50">
          <div>Menampilkan 1-4 dari 248 pendaftar</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-300 rounded hover:bg-white transition disabled:opacity-50" disabled>Seb</button>
            <button className="px-3 py-1 bg-green-700 text-white rounded">1</button>
            <button className="px-3 py-1 border border-slate-300 rounded hover:bg-white transition">2</button>
            <button className="px-3 py-1 border border-slate-300 rounded hover:bg-white transition">3</button>
            <button className="px-3 py-1 border border-slate-300 rounded hover:bg-white transition">Sel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
