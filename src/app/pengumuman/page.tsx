"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Search, CheckCircle, XCircle, AlertCircle, Loader2, Clock } from "lucide-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function PengumumanPage() {
  const [regNumber, setRegNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regNumber.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const applicantsRef = collection(db, "applicants");
      const q = query(applicantsRef, where("registrationNumber", "==", regNumber.trim().toUpperCase()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Nomor pendaftaran tidak ditemukan. Pastikan Anda memasukkan nomor yang benar.");
      } else {
        const applicantData = querySnapshot.docs[0].data();
        setResult(applicantData);
      }
    } catch (err: any) {
      console.error("Error searching applicant:", err);
      if (err.code === 'permission-denied') {
        setError("Akses ditolak: Sistem pengumuman belum dibuka untuk publik.");
      } else {
        setError("Terjadi kesalahan saat mencari data. Silakan coba beberapa saat lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-green-700 transition font-medium">
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Beranda
          </Link>
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo ICP" width={32} height={32} />
            <span className="font-bold text-slate-900 hidden sm:block">PMB Cokroaminoto</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 flex flex-col items-center">
        
        <div className="w-full max-w-xl text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Cek Hasil Kelulusan PMB</h1>
          <p className="text-slate-600">
            Silakan masukkan Nomor Pendaftaran Anda untuk melihat hasil seleksi penerimaan mahasiswa baru.
          </p>
        </div>

        {/* Search Box */}
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden mb-8">
          <form onSubmit={handleSearch} className="p-6 sm:p-8">
            <label htmlFor="regNumber" className="block text-sm font-bold text-slate-700 mb-2">Nomor Pendaftaran</label>
            <div className="relative flex items-center mb-4">
              <Search className="w-5 h-5 absolute left-4 text-slate-400" />
              <input 
                id="regNumber"
                type="text" 
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                placeholder="Contoh: PMB2026123" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-lg font-mono tracking-wider focus:ring-2 focus:ring-green-500 focus:border-green-500 uppercase transition"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-70 shadow-md hover:shadow-lg"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Cek Hasil Sekarang"}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="w-full max-w-xl bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Result Area */}
        {result && (
          <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-4">
            {result.status === 'lulus' ? (
              <div className="bg-gradient-to-b from-green-50 to-white border-2 border-green-200 rounded-2xl p-8 text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-black text-green-800 mb-2 uppercase">Selamat, Anda Lulus!</h2>
                <p className="text-slate-600 mb-6">Anda telah dinyatakan lulus seleksi masuk Institut Cokroaminoto Pinrang.</p>
                
                <div className="bg-white border border-green-100 rounded-xl p-5 mb-6 text-left shadow-sm">
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                    <div className="col-span-2">
                      <p className="text-xs text-slate-500 font-bold uppercase">Nama Peserta</p>
                      <p className="font-semibold text-slate-900">{result.biodata?.namaLengkap || '-'}</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <p className="text-xs text-slate-500 font-bold uppercase">No. Pendaftaran</p>
                      <p className="font-mono text-slate-900 font-medium">{result.registrationNumber}</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <p className="text-xs text-slate-500 font-bold uppercase">Asal Sekolah</p>
                      <p className="text-slate-900">{result.pendidikan?.asalSekolah || '-'}</p>
                    </div>
                    <div className="col-span-2 pt-3 border-t border-dashed border-slate-200">
                      <p className="text-xs text-green-600 font-bold uppercase">Diterima di Program Studi</p>
                      <p className="text-lg font-bold text-green-700">{result.biodata?.prodi1 || '-'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-sm text-yellow-800 text-left flex gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>Langkah selanjutnya: Silakan <Link href="/login" className="font-bold underline">Login ke Dashboard</Link> Anda untuk mencetak Kartu Tanda Mahasiswa (KTM) sementara dan melihat instruksi Daftar Ulang.</p>
                </div>
              </div>
            ) : result.status === 'cadangan' ? (
              <div className="bg-gradient-to-b from-yellow-50 to-white border-2 border-yellow-200 rounded-2xl p-8 text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-yellow-500"></div>
                <AlertCircle className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-black text-yellow-800 mb-2 uppercase">Status Cadangan</h2>
                <p className="text-slate-600 mb-6">Status pendaftaran Anda saat ini adalah CADANGAN. Silakan periksa kembali secara berkala.</p>
                
                <div className="bg-white border border-yellow-100 rounded-xl p-4 mb-6">
                  <p className="text-sm font-bold text-slate-500 uppercase">Nama Peserta</p>
                  <p className="text-lg font-bold text-slate-900">{result.biodata?.namaLengkap || '-'}</p>
                  <p className="font-mono text-slate-600 mt-1">{result.registrationNumber}</p>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-b from-slate-100 to-white border-2 border-slate-200 rounded-2xl p-8 text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-slate-400"></div>
                <Clock className="w-20 h-20 text-slate-400 mx-auto mb-4" />
                <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase">Dalam Proses Verifikasi</h2>
                <p className="text-slate-600 mb-6">Mohon bersabar. Dokumen atau hasil ujian Anda masih dalam proses penilaian oleh panitia PMB.</p>
                
                <div className="bg-white border border-slate-200 rounded-xl p-4 text-left">
                  <p className="text-xs text-slate-500 font-bold uppercase">Nama Peserta</p>
                  <p className="font-semibold text-slate-900">{result.biodata?.namaLengkap || '-'}</p>
                  <p className="font-mono text-slate-600 mt-1 text-sm">{result.registrationNumber}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-white py-6 border-t border-slate-200 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} Panitia PMB Institut Cokroaminoto Pinrang
      </footer>
    </div>
  );
}
