"use client";

import Link from "next/link";
import { ArrowLeft, Copy, CreditCard, Building, UploadCloud, Info } from "lucide-react";
import { useState } from "react";

export default function PembayaranPage() {
  const [copied, setCopied] = useState(false);
  const [proofUploaded, setProofUploaded] = useState(false);
  
  const virtualAccount = "8899010002934882";
  const amount = 250000;

  const handleCopy = () => {
    navigator.clipboard.writeText(virtualAccount);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpload = () => {
    setProofUploaded(true);
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-slate-200">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Pembayaran Pendaftaran</h1>
              <p className="text-slate-500">Selesaikan pembayaran untuk memproses pendaftaran Anda.</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-lg font-medium text-sm inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              Status: Menunggu Pembayaran
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Info Pembayaran */}
            <div className="space-y-6">
              <div className="bg-green-700 rounded-xl p-6 text-white shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <CreditCard className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <p className="text-green-100 mb-1 text-sm font-medium">Total Tagihan</p>
                  <h2 className="text-3xl font-bold mb-6">Rp {amount.toLocaleString('id-ID')}</h2>
                  
                  <p className="text-green-100 mb-1 text-sm font-medium">Bank Tujuan</p>
                  <div className="flex items-center gap-2 mb-4">
                    <Building className="w-5 h-5" />
                    <span className="font-semibold text-lg">Bank BSI (Bank Syariah Indonesia)</span>
                  </div>

                  <p className="text-green-100 mb-1 text-sm font-medium">Nomor Virtual Account / Rekening</p>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xl tracking-wider">{virtualAccount}</span>
                    <button 
                      onClick={handleCopy}
                      className="p-2 hover:bg-white/20 rounded-md transition"
                      title="Salin nomor"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                    {copied && <span className="text-xs bg-white text-green-700 px-2 py-1 rounded">Tersalin!</span>}
                  </div>
                  <p className="text-xs text-green-200 mt-2">a.n. PMB Institut Cokroaminoto Pinrang</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-sm">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 text-green-700" />
                  Instruksi Pembayaran
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-slate-600">
                  <li>Buka aplikasi Mobile Banking atau ATM BSI Anda.</li>
                  <li>Pilih menu Transfer Antar Bank / Sesama BSI.</li>
                  <li>Masukkan nomor rekening <span className="font-mono text-slate-900">{virtualAccount}</span>.</li>
                  <li>Masukkan nominal persis <span className="font-semibold text-slate-900">Rp {amount.toLocaleString('id-ID')}</span>.</li>
                  <li>Simpan bukti transfer / struk pembayaran.</li>
                </ol>
              </div>
            </div>

            {/* Form Upload Bukti */}
            <div className="border border-slate-200 rounded-xl p-6 flex flex-col justify-center">
              <h3 className="font-bold text-slate-900 mb-2">Konfirmasi Pembayaran</h3>
              <p className="text-sm text-slate-500 mb-6">Jika sudah melakukan transfer, wajib mengunggah bukti pembayaran di bawah ini agar panitia dapat memverifikasi.</p>
              
              {!proofUploaded ? (
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition cursor-pointer" onClick={handleUpload}>
                  <div className="w-16 h-16 bg-green-50 text-green-700 rounded-full flex items-center justify-center mb-4 border border-green-100">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <p className="font-medium text-slate-900 text-center">Klik untuk memilih file bukti transfer</p>
                  <p className="text-sm text-slate-500 mt-1">Format JPG, PNG, atau PDF (Max. 2MB)</p>
                </div>
              ) : (
                <div className="border border-emerald-200 bg-emerald-50 rounded-xl p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                    <CreditCard className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-emerald-900 mb-1">Bukti Transfer Berhasil Diunggah</h4>
                  <p className="text-sm text-emerald-700 mb-6">Panitia sedang memverifikasi pembayaran Anda. Proses ini biasanya memakan waktu 1x24 jam kerja.</p>
                  <button className="text-emerald-600 text-sm font-medium hover:underline" onClick={() => setProofUploaded(false)}>
                    Unggah Ulang Dokumen
                  </button>
                </div>
              )}

              {proofUploaded && (
                <div className="mt-6">
                  <Link href="/dashboard" className="w-full flex justify-center items-center py-3 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition">
                    Kembali ke Dashboard
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
