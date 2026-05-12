"use client";

import Link from "next/link";
import { ArrowLeft, UploadCloud, File, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function UploadDokumenPage() {
  const [files, setFiles] = useState({
    foto: null as string | null,
    kk: null as string | null,
    ijazah: null as string | null,
  });

  const handleUpload = (type: string) => {
    // Mock upload
    setFiles(prev => ({ ...prev, [type]: 'uploaded' }));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition font-medium w-fit">
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Upload Dokumen Persyaratan</h1>
          <p className="text-slate-500 mb-8">Unggah dokumen persyaratan dalam format JPG, PNG, atau PDF. Maksimal ukuran file 2MB.</p>

          <div className="space-y-6">
            
            {/* Dokumen: Foto Formal */}
            <div className="border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${files.foto ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                  {files.foto ? <CheckCircle className="w-6 h-6" /> : <File className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Pas Foto Formal</h3>
                  <p className="text-sm text-slate-500 mt-1">Latar belakang merah atau biru, kemeja putih rapi.</p>
                  {files.foto && <span className="inline-block mt-2 text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Telah diunggah</span>}
                </div>
              </div>
              <button 
                onClick={() => handleUpload('foto')}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-sm w-full md:w-auto transition ${files.foto ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
              >
                <UploadCloud className="w-4 h-4" />
                {files.foto ? 'Ganti File' : 'Upload File'}
              </button>
            </div>

            {/* Dokumen: KK */}
            <div className="border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${files.kk ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                  {files.kk ? <CheckCircle className="w-6 h-6" /> : <File className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Kartu Keluarga (KK)</h3>
                  <p className="text-sm text-slate-500 mt-1">Scan asli atau fotokopi legalisir yang jelas terbaca.</p>
                  {files.kk && <span className="inline-block mt-2 text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Telah diunggah</span>}
                </div>
              </div>
              <button 
                onClick={() => handleUpload('kk')}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-sm w-full md:w-auto transition ${files.kk ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
              >
                <UploadCloud className="w-4 h-4" />
                {files.kk ? 'Ganti File' : 'Upload File'}
              </button>
            </div>

            {/* Dokumen: Ijazah */}
            <div className="border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${files.ijazah ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                  {files.ijazah ? <CheckCircle className="w-6 h-6" /> : <File className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Ijazah / Surat Keterangan Lulus</h3>
                  <p className="text-sm text-slate-500 mt-1">Scan Ijazah asli atau SKL resmi dari sekolah.</p>
                  {files.ijazah && <span className="inline-block mt-2 text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Telah diunggah</span>}
                </div>
              </div>
              <button 
                onClick={() => handleUpload('ijazah')}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-sm w-full md:w-auto transition ${files.ijazah ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
              >
                <UploadCloud className="w-4 h-4" />
                {files.ijazah ? 'Ganti File' : 'Upload File'}
              </button>
            </div>

          </div>

          <div className="mt-8 bg-blue-50 p-4 rounded-xl flex items-start gap-3 border border-blue-100">
            <AlertCircle className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              Pastikan semua dokumen jelas terbaca dan sesuai dengan aslinya. Panitia berhak membatalkan pendaftaran jika ditemukan indikasi pemalsuan dokumen.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
            <Link href="/dashboard/pembayaran" className={`px-6 py-3 rounded-lg font-bold text-white transition ${files.foto && files.kk && files.ijazah ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-300 cursor-not-allowed'}`}>
              Lanjut ke Pembayaran
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
