"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { QRCodeSVG } from "qrcode.react";
import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function KartuUjianPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [applicantData, setApplicantData] = useState<any>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          // Ambil data pendaftar
          const docRef = doc(db, "applicants", user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists() && docSnap.data().status === 'lulus') {
            setApplicantData(docSnap.data());
          } else {
            // Jika belum lulus, tendang ke dashboard
            router.push("/dashboard");
          }

          // Ambil foto profil (base64)
          const photoRef = doc(db, "applicant_files", `${user.uid}_foto`);
          const photoSnap = await getDoc(photoRef);
          if (photoSnap.exists()) {
            setPhotoUrl(photoSnap.data().data);
          }
        } catch (error) {
          console.error("Error fetching data for exam card:", error);
        }
      }
    };
    fetchData();
  }, [user, router]);

  if (loading || !applicantData) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50">Memuat Kartu Ujian...</div>;
  }

  const qrValue = JSON.stringify({
    uid: user?.uid,
    regNum: applicantData.registrationNumber
  });

  return (
    <div className="min-h-screen bg-slate-100 py-8 font-sans print:bg-white print:py-0">
      <div className="max-w-3xl mx-auto px-4 print:p-0">
        
        {/* Tombol Aksi (Sembunyi saat di-print) */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition font-medium bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </Link>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-green-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-800 transition shadow-md"
          >
            <Printer className="w-5 h-5" />
            Cetak Kartu
          </button>
        </div>

        {/* Kertas Kartu Ujian */}
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden print:shadow-none print:border-2 print:border-slate-800">
          
          {/* Header */}
          <div className="border-b-4 border-yellow-500 flex items-center gap-6 p-6 bg-green-800 text-white print:bg-white print:text-slate-900 print:border-b-2 print:border-slate-800">
            <div className="bg-white p-2 rounded-lg shrink-0 print:border print:border-slate-300">
              <Image src="/logo.png" alt="Logo ICP" width={70} height={70} className="object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold uppercase tracking-wide">Kartu Tanda Peserta Ujian PMB</h1>
              <h2 className="text-lg font-medium text-green-100 print:text-slate-700">Institut Cokroaminoto Pinrang</h2>
              <p className="text-sm opacity-80 mt-1">Tahun Akademik {new Date().getFullYear()} / {new Date().getFullYear() + 1}</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 flex flex-col md:flex-row gap-8">
            {/* Foto & QR */}
            <div className="flex flex-col items-center gap-6 shrink-0 md:w-1/4">
              <div className="w-32 h-40 border-4 border-slate-200 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center relative shadow-inner print:border-slate-400">
                {photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photoUrl} alt="Foto Peserta" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-slate-400 text-center px-2">Foto Tidak Tersedia</span>
                )}
              </div>
              
              <div className="bg-white p-3 rounded-lg border-2 border-slate-200 shadow-sm">
                <QRCodeSVG value={qrValue} size={110} level="H" />
              </div>
              <p className="text-[10px] text-slate-500 text-center font-mono print:text-black">Scan untuk validasi</p>
            </div>

            {/* Data Peserta */}
            <div className="flex-1">
              <div className="grid grid-cols-1 gap-y-5">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Nomor Peserta</p>
                  <p className="text-2xl font-mono font-bold text-slate-900 bg-slate-50 inline-block px-3 py-1 border border-slate-200 rounded print:bg-transparent print:border-none print:p-0">{applicantData.registrationNumber}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Nama Lengkap</p>
                    <p className="font-semibold text-lg text-slate-900">{applicantData.biodata?.namaLengkap || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Nomor Induk Kependudukan (NIK)</p>
                    <p className="font-medium text-slate-700">{applicantData.biodata?.nik || '-'}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Program Studi Pilihan 1</p>
                  <p className="font-bold text-green-700 text-lg print:text-slate-900">{applicantData.biodata?.prodi1 || '-'}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200 print:bg-transparent print:border print:border-slate-400 mt-2">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Jadwal Ujian</p>
                    <p className="font-semibold text-slate-900">Senin, 10 Juni 2026</p>
                    <p className="text-sm text-slate-600">08:00 WITA - Selesai</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Lokasi Ujian</p>
                    <p className="font-semibold text-slate-900">Kampus Institut Cokroaminoto</p>
                    <p className="text-sm text-slate-600">Ruang Aula Utama (Lantai 2)</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-dashed border-slate-300">
                  <p className="text-xs font-bold text-slate-900 mb-2">TATA TERTIB PESERTA:</p>
                  <ul className="text-xs text-slate-600 list-disc list-outside ml-4 space-y-1 print:text-black">
                    <li>Peserta wajib membawa cetakan asli Kartu Tanda Peserta Ujian ini.</li>
                    <li>Wajib membawa Kartu Identitas asli (KTP/Kartu Pelajar).</li>
                    <li>Hadir 30 menit sebelum jadwal ujian dimulai.</li>
                    <li>Berpakaian rapi dan sopan (Kemeja berkerah dan bersepatu).</li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
          
          {/* Footer Cut Line */}
          <div className="border-t-2 border-dashed border-slate-300 bg-slate-50 p-4 text-center text-xs text-slate-400 hidden print:block">
            Gunting pada garis putus-putus ini
          </div>
        </div>

      </div>
    </div>
  );
}
