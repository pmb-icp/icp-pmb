"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, User, FileText, CheckCircle, XCircle, File, Download, Loader2 } from "lucide-react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function DetailPendaftarPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [applicant, setApplicant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<any>({});
  const [loadingFiles, setLoadingFiles] = useState(true);

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const docSnap = await getDoc(doc(db, "applicants", resolvedParams.id));
        if (docSnap.exists()) {
          setApplicant({ id: docSnap.id, ...docSnap.data() });
          
          // Fetch files
          const types = ['foto', 'kk', 'ijazah', 'payment'];
          const loadedFiles: any = {};
          
          for (const type of types) {
            const fileSnap = await getDoc(doc(db, "applicant_files", `${resolvedParams.id}_${type}`));
            if (fileSnap.exists()) {
              loadedFiles[type] = fileSnap.data().data; // This is the base64 string
            }
          }
          setFiles(loadedFiles);
        }
      } catch (error) {
        console.error("Error fetching applicant:", error);
      } finally {
        setLoading(false);
        setLoadingFiles(false);
      }
    };
    fetchApplicant();
  }, [resolvedParams.id]);

  const updateStatus = async (newStatus: string) => {
    try {
      await updateDoc(doc(db, "applicants", resolvedParams.id), { status: newStatus });
      setApplicant((prev: any) => ({ ...prev, status: newStatus }));
      alert(`Status berhasil diubah menjadi ${newStatus}`);
    } catch (error) {
      console.error(error);
      alert("Gagal mengubah status");
    }
  };

  if (loading) return <div className="p-8 text-center">Memuat data...</div>;
  if (!applicant) return <div className="p-8 text-center text-red-500">Data pendaftar tidak ditemukan.</div>;

  const b = applicant.biodata || {};
  const d = applicant.documents || {};

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
              {b.namaLengkap || 'Nama Belum Diisi'}
              <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">{applicant.status?.toUpperCase()}</span>
            </h1>
            <p className="text-slate-500 mt-1 font-mono">{applicant.registrationNumber} &bull; {b.prodi1 || 'Prodi Belum Dipilih'}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => updateStatus('ditolak')} className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg font-medium hover:bg-red-100 transition">
              Tolak Pendaftaran
            </button>
            <button onClick={() => updateStatus('lulus')} className="px-4 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition shadow-sm">
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
                <p className="font-medium text-slate-900 mt-1">{b.nik || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Tempat, Tanggal Lahir</p>
                <p className="font-medium text-slate-900 mt-1">{b.tempatLahir || '-'}, {b.tanggalLahir || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Jenis Kelamin</p>
                <p className="font-medium text-slate-900 mt-1">{b.jenisKelamin === 'L' ? 'Laki-laki' : b.jenisKelamin === 'P' ? 'Perempuan' : '-'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Agama</p>
                <p className="font-medium text-slate-900 mt-1">{b.agama || '-'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-slate-500">Alamat Lengkap</p>
                <p className="font-medium text-slate-900 mt-1">{b.alamat || '-'}</p>
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
                <p className="font-medium text-slate-900 mt-1">{b.nisn || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Asal Sekolah</p>
                <p className="font-medium text-slate-900 mt-1">{b.asalSekolah || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Jurusan</p>
                <p className="font-medium text-slate-900 mt-1">{b.jurusanSekolah || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Tahun Lulus & Nilai</p>
                <p className="font-medium text-slate-900 mt-1">{b.tahunLulus || '-'} (Rata-rata: {b.nilaiRata || '-'})</p>
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
                      {loadingFiles ? <Loader2 className="w-3 h-3 animate-spin mt-1" /> : files.foto ? (
                        <a href={files.foto} download={`Foto_${b.namaLengkap}.jpg`} className="text-xs text-blue-600 hover:underline">Download file</a>
                      ) : (
                        <span className="text-xs text-red-500">Belum diunggah</span>
                      )}
                    </div>
                  </div>
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
                      {loadingFiles ? <Loader2 className="w-3 h-3 animate-spin mt-1" /> : files.kk ? (
                        <a href={files.kk} download={`KK_${b.namaLengkap}.pdf`} className="text-xs text-blue-600 hover:underline">Download file</a>
                      ) : (
                        <span className="text-xs text-red-500">Belum diunggah</span>
                      )}
                    </div>
                  </div>
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
                      {loadingFiles ? <Loader2 className="w-3 h-3 animate-spin mt-1" /> : files.ijazah ? (
                        <a href={files.ijazah} download={`Ijazah_${b.namaLengkap}.pdf`} className="text-xs text-blue-600 hover:underline">Download file</a>
                      ) : (
                        <span className="text-xs text-red-500">Belum diunggah</span>
                      )}
                    </div>
                  </div>
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
                  {loadingFiles ? <Loader2 className="w-3 h-3 animate-spin mt-1" /> : files.payment ? (
                    <a href={files.payment} download={`BuktiBayar_${b.namaLengkap}.jpg`} className="text-xs text-blue-600 hover:underline mt-1 block">Download file bukti transfer</a>
                  ) : (
                    <p className="text-xs text-red-500 mt-1">Belum melakukan pembayaran</p>
                  )}
                </div>
              </div>
              <button onClick={() => updateStatus('lulus')} className="w-full py-2 bg-green-700 text-white rounded-lg font-medium text-sm hover:bg-green-800 transition">
                Konfirmasi Pembayaran
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
