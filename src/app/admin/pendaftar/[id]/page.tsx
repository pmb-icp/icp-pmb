"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, User, FileText, CheckCircle, XCircle, File, Download } from "lucide-react";

export default function DetailPendaftarPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/pendaftar" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition mb-4">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Data Pendaftar
        </Link>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              Siti Aminah
              <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">Menunggu Verifikasi</span>
            </h1>
            <p className="text-slate-500 mt-1 font-mono">PMB2026041 &bull; S1 Sistem Informasi</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg font-medium hover:bg-red-100 transition">
              Tolak Pendaftaran
            </button>
            <button className="px-4 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition shadow-sm">
              Terima & Luluskan
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Biodata */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
              <User className="w-5 h-5 text-slate-500" />
              <h2 className="font-bold text-slate-900">Biodata Peserta</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-sm text-slate-500">Nomor Induk Kependudukan (NIK)</p>
                <p className="font-medium text-slate-900 mt-1">7304123456789012</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Tempat, Tanggal Lahir</p>
                <p className="font-medium text-slate-900 mt-1">Pinrang, 15 Agustus 2006</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Jenis Kelamin</p>
                <p className="font-medium text-slate-900 mt-1">Perempuan</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Agama</p>
                <p className="font-medium text-slate-900 mt-1">Islam</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-slate-500">Alamat Lengkap</p>
                <p className="font-medium text-slate-900 mt-1">Jl. Pendidikan No. 45, Kecamatan Watang Sawitto, Kabupaten Pinrang, Sulawesi Selatan</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-500" />
              <h2 className="font-bold text-slate-900">Riwayat Pendidikan</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-sm text-slate-500">NISN</p>
                <p className="font-medium text-slate-900 mt-1">0061234567</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Asal Sekolah</p>
                <p className="font-medium text-slate-900 mt-1">SMAN 1 Pinrang</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Jurusan</p>
                <p className="font-medium text-slate-900 mt-1">MIPA</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Tahun Lulus & Nilai</p>
                <p className="font-medium text-slate-900 mt-1">2024 (Rata-rata: 88.5)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Dokumen & Verifikasi */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <h2 className="font-bold text-slate-900">Dokumen Lampiran</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="border border-slate-200 rounded-xl p-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <File className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-slate-900">Pas Foto</p>
                      <button className="text-xs text-blue-600 hover:underline">Lihat file</button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700">Valid</button>
                  <button className="flex-1 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200">Revisi</button>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                      <File className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-slate-900">Kartu Keluarga</p>
                      <button className="text-xs text-blue-600 hover:underline">Lihat file</button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700">Valid</button>
                  <button className="flex-1 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200">Revisi</button>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                      <File className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-slate-900">Ijazah / SKL</p>
                      <button className="text-xs text-blue-600 hover:underline">Lihat file</button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700">Valid</button>
                  <button className="flex-1 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200">Revisi</button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <h2 className="font-bold text-slate-900">Pembayaran</h2>
            </div>
            <div className="p-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
                  <File className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-sm text-slate-900">Bukti Transfer BSI</p>
                  <p className="text-xs text-slate-500 mt-0.5">Rp 250.000 (12 Mei 2026)</p>
                  <button className="text-xs text-blue-600 hover:underline mt-1">Lihat file</button>
                </div>
              </div>
              <button className="w-full py-2 bg-green-700 text-white rounded-lg font-medium text-sm hover:bg-green-800 transition">
                Konfirmasi Pembayaran
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
