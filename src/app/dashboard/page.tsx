"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  LogOut, 
  FileText, 
  Upload, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function DashboardPage() {
  const router = useRouter();
  const { user, userData, loading } = useAuth();
  const [registrationNumber, setRegistrationNumber] = useState("Memuat...");
  const [progress, setProgress] = useState({ biodata: false, dokumen: false, pembayaran: false });
  const [status, setStatus] = useState("draft");
  
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (userData && userData.role === 'admin') {
        router.push("/admin");
      }
    }
  }, [user, userData, loading, router]);

  useEffect(() => {
    const fetchApplicantData = async () => {
      if (user) {
        try {
          const docRef = doc(db, "applicants", user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            setRegistrationNumber(data.registrationNumber);
            if (data.progress) setProgress(data.progress);
            if (data.status) setStatus(data.status);
          } else if (userData?.role !== 'admin') {
            // Self-healing: Jika dokumen pendaftar belum ada (karena error rules sebelumnya), buatkan otomatis
            const { setDoc } = await import("firebase/firestore");
            const newRegNum = `PMB${new Date().getFullYear()}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
            
            await setDoc(doc(db, "applicants", user.uid), {
              uid: user.uid,
              registrationNumber: newRegNum,
              status: "draft",
              progress: { biodata: false, dokumen: false, pembayaran: false }
            });
            
            // Juga buat dokumen users jika hilang
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              name: user.displayName || user.email?.split('@')[0] || "Peserta",
              email: user.email,
              role: "applicant",
              createdAt: new Date()
            }, { merge: true });
            
            setRegistrationNumber(newRegNum);
          }
        } catch (error) {
          console.error("Error fetching applicant data:", error);
          setRegistrationNumber("Gagal memuat");
        }
      }
    };
    fetchApplicantData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Memuat...</div>;
  }

  const applicantName = user.displayName || userData?.name || user.email?.split('@')[0] || "Peserta";
  
  const getStepStatus = (stepId: number) => {
    if (stepId === 1) return progress.biodata ? 'completed' : 'current';
    if (stepId === 2) {
      if (progress.dokumen) return 'completed';
      if (progress.biodata) return 'current';
      return 'upcoming';
    }
    if (stepId === 3) {
      if (progress.pembayaran) return 'completed';
      if (progress.dokumen) return 'current';
      return 'upcoming';
    }
    if (stepId === 4) {
      if (status === 'lulus') return 'completed';
      if (progress.pembayaran) return 'current';
      return 'upcoming';
    }
    return 'upcoming';
  };

  const steps = [
    { id: 1, name: 'Biodata', status: getStepStatus(1), icon: FileText, href: '/dashboard/formulir' },
    { id: 2, name: 'Upload Dokumen', status: getStepStatus(2), icon: Upload, href: '/dashboard/dokumen' },
    { id: 3, name: 'Pembayaran', status: getStepStatus(3), icon: CreditCard, href: '/dashboard/pembayaran' },
    { id: 4, name: 'Verifikasi', status: getStepStatus(4), icon: CheckCircle, href: '#' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Logo ICP" width={32} height={32} className="object-contain" />
              <span className="font-bold text-xl text-slate-900 tracking-tight">Dashboard Peserta</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700 hidden sm:block">Halo, {applicantName}</span>
              <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-md transition cursor-pointer">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:block">Keluar</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-green-700 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
              <h1 className="text-2xl font-bold mb-2">Selamat Datang di PMB ICP</h1>
              <p className="text-green-100 mb-6">
                Nomor Pendaftaran Anda: <span className="font-mono bg-white/20 px-2 py-1 rounded ml-1">{registrationNumber}</span>
              </p>
              <div className="bg-white/10 rounded-xl p-4 border border-white/20 flex items-start gap-3 backdrop-blur-sm">
                <AlertCircle className="w-6 h-6 text-yellow-300 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-white">Langkah Selanjutnya</h3>
                  <p className="text-sm text-green-50 mt-1">
                    {!progress.biodata ? "Silakan isi formulir biodata lengkap Anda." :
                     !progress.dokumen ? "Anda perlu mengunggah dokumen kelengkapan berupa Foto, KTP/KK, dan Ijazah/SKL." :
                     !progress.pembayaran ? "Selesaikan pendaftaran dengan melampirkan bukti pembayaran PMB." :
                     status === 'lulus' ? "Selamat! Pendaftaran Anda telah diverifikasi dan dinyatakan Lulus." :
                     "Mohon tunggu. Dokumen dan pembayaran Anda sedang diverifikasi oleh panitia."}
                  </p>
                  {!progress.pembayaran && status !== 'lulus' && (
                    <Link href={!progress.biodata ? "/dashboard/formulir" : !progress.dokumen ? "/dashboard/dokumen" : "/dashboard/pembayaran"} className="inline-block mt-3 bg-white text-green-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-green-50 transition">
                      Lanjutkan Proses
                    </Link>
                  )}
                  {status === 'lulus' && (
                    <Link href="/dashboard/kartu-ujian" className="inline-block mt-3 bg-yellow-400 text-yellow-900 px-6 py-2 rounded-md text-sm font-bold hover:bg-yellow-300 transition shadow-sm">
                      Cetak Kartu Ujian
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Tracker */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Progress Pendaftaran</h2>
              <div className="relative">
                {/* Connector Line */}
                <div className="absolute top-5 left-8 right-8 h-0.5 bg-slate-200 hidden sm:block -z-10"></div>
                
                <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-0">
                  {steps.map((step, index) => (
                    <Link href={step.href} key={step.name} className="relative flex flex-row sm:flex-col items-center group">
                      {step.status === 'completed' ? (
                        <div className="h-10 w-10 rounded-full bg-yellow-500 text-white flex items-center justify-center shrink-0 z-10 ring-4 ring-white">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                      ) : step.status === 'current' ? (
                        <div className="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 z-10 ring-4 ring-white ring-offset-2 ring-offset-green-100">
                          <step.icon className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 z-10 ring-4 ring-white border border-slate-200 group-hover:border-green-300 transition">
                          <step.icon className="w-5 h-5" />
                        </div>
                      )}
                      
                      <div className="ml-4 sm:ml-0 sm:mt-3 text-left sm:text-center">
                        <p className={`text-sm font-medium ${step.status === 'current' ? 'text-green-700' : step.status === 'completed' ? 'text-slate-900' : 'text-slate-500'}`}>
                          {step.name}
                        </p>
                        <p className="text-xs text-slate-500 sm:hidden">
                          {step.status === 'completed' ? 'Selesai' : step.status === 'current' ? 'Sedang berlangsung' : 'Belum dimulai'}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-700" />
                Jadwal Penting
              </h2>
              <ul className="space-y-4">
                <li className="relative pl-6 border-l-2 border-green-600 pb-4">
                  <div className="absolute w-3 h-3 bg-green-600 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
                  <p className="text-sm font-semibold text-slate-900">Pendaftaran Gelombang 1</p>
                  <p className="text-xs text-slate-500 mt-1">1 Feb - 30 Apr 2026</p>
                </li>
                <li className="relative pl-6 border-l-2 border-slate-200 pb-4">
                  <div className="absolute w-3 h-3 bg-slate-300 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
                  <p className="text-sm font-semibold text-slate-500">Batas Upload Dokumen</p>
                  <p className="text-xs text-slate-400 mt-1">15 Mei 2026</p>
                </li>
                <li className="relative pl-6 border-l-2 border-slate-200">
                  <div className="absolute w-3 h-3 bg-slate-300 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
                  <p className="text-sm font-semibold text-slate-500">Pengumuman Hasil</p>
                  <p className="text-xs text-slate-400 mt-1">1 Juni 2026</p>
                </li>
              </ul>
            </div>

            {/* Bantuan */}
            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <h2 className="text-base font-bold text-green-900 mb-2">Butuh Bantuan?</h2>
              <p className="text-sm text-green-700 mb-4">
                Jika Anda mengalami kendala selama proses pendaftaran, silakan hubungi panitia PMB.
              </p>
              <button className="w-full bg-white text-green-700 border border-green-200 py-2 rounded-md text-sm font-semibold hover:bg-green-50 transition">
                Hubungi via WhatsApp
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
