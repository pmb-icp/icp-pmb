"use client";

import Link from "next/link";
import { ArrowLeft, UploadCloud, File, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { compressImage, fileToBase64 } from "@/lib/fileUtils";

export default function UploadDokumenPage() {
  const { user } = useAuth();
  const [uploading, setUploading] = useState<string | null>(null);
  const [files, setFiles] = useState({
    foto: null as string | null,
    kk: null as string | null,
    ijazah: null as string | null,
  });

  useEffect(() => {
    const fetchDocs = async () => {
      if (user) {
        const docSnap = await getDoc(doc(db, "applicants", user.uid));
        if (docSnap.exists() && docSnap.data().documents) {
          setFiles(prev => ({ ...prev, ...docSnap.data().documents }));
        }
      }
    };
    fetchDocs();
  }, [user]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (!e.target.files || e.target.files.length === 0 || !user) return;
    
    const file = e.target.files[0];
    
    // Validasi ukuran PDF maks 800KB (karena Base64 akan memperbesar ukuran ~30%, dan limit Firestore 1MB)
    if (file.type === "application/pdf" && file.size > 800 * 1024) {
      alert("Maaf, ukuran file PDF terlalu besar. Maksimal 800 KB untuk menjaga kestabilan database gratis.");
      return;
    }

    setUploading(type);
    
    try {
      let base64Data = "";
      if (file.type.startsWith("image/")) {
        base64Data = await compressImage(file);
      } else {
        base64Data = await fileToBase64(file);
      }

      // Simpan Base64 ke collection terpisah 'applicant_files' agar tidak memberatkan collection utama 'applicants'
      await setDoc(doc(db, "applicant_files", `${user.uid}_${type}`), {
        uid: user.uid,
        type: type,
        fileName: file.name,
        fileType: file.type,
        data: base64Data,
        uploadedAt: new Date()
      });

      // Update status di collection 'applicants'
      await updateDoc(doc(db, "applicants", user.uid), {
        [`documents.${type}`]: true,
        "progress.dokumen": true,
        status: "pembayaran"
      });

      setFiles(prev => ({ ...prev, [type]: true }));
      setUploading(null);
    } catch (error) {
      console.error("Gagal mengompres/menyimpan file:", error);
      alert("Gagal mengunggah file. Pastikan ukurannya tidak terlalu besar.");
      setUploading(null);
    }
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
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${files.foto ? 'bg-emerald-100 text-emerald-600' : 'bg-green-100 text-green-700'}`}>
                  {files.foto ? <CheckCircle className="w-6 h-6" /> : <File className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Pas Foto Formal</h3>
                  <p className="text-sm text-slate-500 mt-1">Latar belakang merah atau biru, kemeja putih rapi.</p>
                  {files.foto && <span className="inline-block mt-2 text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Telah diunggah</span>}
                </div>
              </div>
              <label className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-sm w-full md:w-auto transition cursor-pointer ${uploading === 'foto' ? 'bg-slate-100 text-slate-400' : files.foto ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}>
                {uploading === 'foto' ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                {uploading === 'foto' ? 'Mengunggah...' : files.foto ? 'Ganti File' : 'Upload File'}
                <input type="file" className="hidden" accept="image/*,.pdf" onChange={(e) => handleUpload(e, 'foto')} disabled={uploading === 'foto'} />
              </label>
            </div>

            {/* Dokumen: KK */}
            <div className="border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${files.kk ? 'bg-emerald-100 text-emerald-600' : 'bg-green-100 text-green-700'}`}>
                  {files.kk ? <CheckCircle className="w-6 h-6" /> : <File className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Kartu Keluarga (KK)</h3>
                  <p className="text-sm text-slate-500 mt-1">Scan asli atau fotokopi legalisir yang jelas terbaca.</p>
                  {files.kk && <span className="inline-block mt-2 text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Telah diunggah</span>}
                </div>
              </div>
              <label className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-sm w-full md:w-auto transition cursor-pointer ${uploading === 'kk' ? 'bg-slate-100 text-slate-400' : files.kk ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}>
                {uploading === 'kk' ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                {uploading === 'kk' ? 'Mengunggah...' : files.kk ? 'Ganti File' : 'Upload File'}
                <input type="file" className="hidden" accept="image/*,.pdf" onChange={(e) => handleUpload(e, 'kk')} disabled={uploading === 'kk'} />
              </label>
            </div>

            {/* Dokumen: Ijazah */}
            <div className="border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${files.ijazah ? 'bg-emerald-100 text-emerald-600' : 'bg-green-100 text-green-700'}`}>
                  {files.ijazah ? <CheckCircle className="w-6 h-6" /> : <File className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Ijazah / Surat Keterangan Lulus</h3>
                  <p className="text-sm text-slate-500 mt-1">Scan Ijazah asli atau SKL resmi dari sekolah.</p>
                  {files.ijazah && <span className="inline-block mt-2 text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Telah diunggah</span>}
                </div>
              </div>
              <label className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-sm w-full md:w-auto transition cursor-pointer ${uploading === 'ijazah' ? 'bg-slate-100 text-slate-400' : files.ijazah ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}>
                {uploading === 'ijazah' ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                {uploading === 'ijazah' ? 'Mengunggah...' : files.ijazah ? 'Ganti File' : 'Upload File'}
                <input type="file" className="hidden" accept="image/*,.pdf" onChange={(e) => handleUpload(e, 'ijazah')} disabled={uploading === 'ijazah'} />
              </label>
            </div>

          </div>

          <div className="mt-8 bg-amber-50 p-4 rounded-xl flex items-start gap-3 border border-amber-100">
            <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              Pastikan semua dokumen jelas terbaca dan sesuai dengan aslinya. Panitia berhak membatalkan pendaftaran jika ditemukan indikasi pemalsuan dokumen.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
            <Link href="/dashboard/pembayaran" className={`px-6 py-3 rounded-lg font-bold text-white transition ${files.foto && files.kk && files.ijazah ? 'bg-green-700 hover:bg-green-800' : 'bg-slate-300 cursor-not-allowed'}`}>
              Lanjut ke Pembayaran
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
