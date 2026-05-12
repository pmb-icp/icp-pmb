"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Filter, Eye, MoreVertical } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AdminPendaftarPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "applicants"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setApplicants(data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, []);

  const getStatusBadge = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'lulus':
        return <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium">Lulus Verifikasi</span>;
      case 'pembayaran':
        return <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-xs font-medium">Cek Pembayaran</span>;
      case 'dokumen':
        return <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-medium">Cek Dokumen</span>;
      case 'verifikasi':
        return <span className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full text-xs font-medium">Proses Verifikasi</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-medium">Draft</span>;
    }
  };

  const filteredApplicants = applicants.filter(app => 
    app.registrationNumber?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.biodata?.namaLengkap?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    if (filteredApplicants.length === 0) {
      alert("Tidak ada data untuk diexport");
      return;
    }

    // Define CSV Headers
    const headers = [
      "No. Pendaftaran", "NIK", "Nama Lengkap", "Jenis Kelamin", "Agama", 
      "Tempat Lahir", "Tanggal Lahir", "No. HP", "Email", "Alamat",
      "Asal Sekolah", "Jurusan Sekolah", "Tahun Lulus", "Nilai Rata-rata",
      "Pilihan Prodi 1", "Pilihan Prodi 2", "Jalur Pendaftaran", "Status"
    ];

    // Map data to CSV rows
    const csvRows = filteredApplicants.map(app => {
      const b = app.biodata || {};
      const row = [
        app.registrationNumber || '-',
        b.nik || '-',
        b.namaLengkap || '-',
        b.jenisKelamin === 'L' ? 'Laki-laki' : b.jenisKelamin === 'P' ? 'Perempuan' : '-',
        b.agama || '-',
        b.tempatLahir || '-',
        b.tanggalLahir || '-',
        b.noHp || '-',
        b.email || '-',
        `"${b.alamat || '-'}"`, // Quote strings that might contain commas
        b.asalSekolah || '-',
        b.jurusanSekolah || '-',
        b.tahunLulus || '-',
        b.nilaiRata || '-',
        b.prodi1 || '-',
        b.prodi2 || '-',
        b.jalur || '-',
        app.status || '-'
      ];
      return row.join(",");
    });

    // Combine headers and rows
    const csvString = [headers.join(","), ...csvRows].join("\n");
    
    // Create and download Blob
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Data_Pendaftar_PMB_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Data Pendaftar</h1>
          <p className="text-slate-500 mt-1">Kelola dan verifikasi seluruh data pendaftar PMB.</p>
        </div>
        <button 
          onClick={exportToCSV}
          className="bg-green-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-800 transition shadow-sm"
        >
          Export Data (CSV)
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
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">Memuat data...</td>
                </tr>
              ) : filteredApplicants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">Tidak ada data pendaftar ditemukan.</td>
                </tr>
              ) : (
                filteredApplicants.map((peserta) => (
                  <tr key={peserta.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                      <span className="font-mono font-medium text-slate-900">{peserta.registrationNumber}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{peserta.biodata?.namaLengkap || 'Belum diisi'}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{peserta.biodata?.nik || '-'}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {peserta.biodata?.prodi1 || '-'}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      Baru Saja
                    </td>
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
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-600 bg-slate-50">
          <div>Menampilkan total {filteredApplicants.length} pendaftar</div>
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
