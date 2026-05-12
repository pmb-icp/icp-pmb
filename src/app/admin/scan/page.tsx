"use client";

import { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CheckCircle, AlertCircle, XCircle, Search, User, CreditCard } from "lucide-react";

export default function AdminScanPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [applicantData, setApplicantData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  
  // To track scanner instance so we can clear it when component unmounts
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    // Initialize Scanner only on the client side
    scannerRef.current = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 }, supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA] },
      /* verbose= */ false
    );

    scannerRef.current.render(onScanSuccess, onScanFailure);

    return () => {
      // Cleanup scanner on unmount
      if (scannerRef.current) {
        scannerRef.current.clear().catch(e => console.error("Failed to clear scanner", e));
      }
    };
  }, []);

  const onScanSuccess = async (decodedText: string, decodedResult: any) => {
    // Pause scanner temporarily while processing
    if (scannerRef.current) {
      scannerRef.current.pause(true);
    }
    
    setScanResult(decodedText);
    setLoading(true);
    setError(null);
    setApplicantData(null);
    setAttendanceMarked(false);

    try {
      // Parse QR JSON payload
      let payload;
      try {
        payload = JSON.parse(decodedText);
      } catch (e) {
        throw new Error("Format QR Code tidak valid (Bukan dari sistem PMB ICP)");
      }

      if (!payload.uid) {
        throw new Error("Format QR Code tidak valid (UID tidak ditemukan)");
      }

      // Fetch data from Firestore
      const docRef = doc(db, "applicants", payload.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setApplicantData(data);
        
        // Cek jika statusnya lulus
        if (data.status !== 'lulus') {
          setError(`Peserta ini belum lulus verifikasi. (Status: ${data.status})`);
        }
      } else {
        throw new Error("Data pendaftar tidak ditemukan di database.");
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat membaca QR Code.");
    } finally {
      setLoading(false);
    }
  };

  const onScanFailure = (error: any) => {
    // We don't show an error state for scan failure because it fires every frame it doesn't see a QR
  };

  const resumeScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.resume();
    }
    setScanResult(null);
    setApplicantData(null);
    setError(null);
    setAttendanceMarked(false);
  };

  const markAttendance = async () => {
    if (!applicantData || !applicantData.uid) return;
    
    setLoading(true);
    try {
      await updateDoc(doc(db, "applicants", applicantData.uid), {
        isAttended: true,
        attendedAt: new Date()
      });
      setAttendanceMarked(true);
      setApplicantData({ ...applicantData, isAttended: true });
    } catch (err) {
      console.error("Error marking attendance:", err);
      alert("Gagal mencatat kehadiran.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Validasi Kartu Ujian (Scan QR)</h1>
        <p className="text-slate-500 mt-1">Arahkan kamera ke QR Code yang ada di Kartu Ujian pendaftar.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Scanner Area */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2">
              <Search className="w-5 h-5" />
              Kamera Scanner
            </h2>
          </div>
          <div className="p-6">
            <div id="reader" className="w-full max-w-md mx-auto rounded-lg overflow-hidden border-2 border-slate-200"></div>
            
            {scanResult && (
              <div className="mt-6 text-center">
                <button 
                  onClick={resumeScanning}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2 rounded-lg font-medium transition"
                >
                  Scan Ulang
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Result Area */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5" />
              Hasil Scan Data Peserta
            </h2>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-center">
            
            {loading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-500 font-medium">Memproses data...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Scan Gagal</h3>
                <p className="text-red-600 bg-red-50 p-4 rounded-lg inline-block text-sm max-w-sm">{error}</p>
              </div>
            ) : applicantData ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-green-50 p-4 rounded-xl border border-green-100">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-green-900">Peserta Valid</h3>
                    <p className="text-sm text-green-700">Data pendaftar ditemukan dan terverifikasi.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Nomor Peserta</p>
                    <p className="font-mono font-bold text-lg text-slate-900">{applicantData.registrationNumber}</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Nama Lengkap</p>
                    <p className="font-semibold text-slate-900">{applicantData.biodata?.namaLengkap}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Pilihan Prodi 1</p>
                    <p className="font-medium text-slate-700">{applicantData.biodata?.prodi1}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Status Kehadiran</p>
                    {attendanceMarked || applicantData.isAttended ? (
                       <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                        <CheckCircle className="w-4 h-4" /> Telah Hadir
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-600">
                        Belum Hadir
                      </span>
                    )}
                  </div>
                </div>

                {!(attendanceMarked || applicantData.isAttended) && (
                  <div className="pt-6 border-t mt-6">
                    <button 
                      onClick={markAttendance}
                      className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-bold text-lg transition shadow-md"
                    >
                      Tandai Hadir Ujian
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16 opacity-50">
                <Search className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                <p className="text-slate-500 font-medium">Belum ada data hasil scan.</p>
                <p className="text-sm text-slate-400 mt-1">Arahkan QR Code ke kamera untuk memindai.</p>
              </div>
            )}
            
          </div>
        </div>

      </div>
    </div>
  );
}
