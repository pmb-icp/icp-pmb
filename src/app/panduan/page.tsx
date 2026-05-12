import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle, UploadCloud, CreditCard, Laptop, FileText, HelpCircle, CheckSquare } from "lucide-react";

export default function PanduanPage() {
  const steps = [
    {
      icon: Laptop,
      title: "1. Registrasi Akun",
      desc: "Buat akun PMB dengan memasukkan alamat email yang aktif dan membuat password. Anda akan langsung masuk ke Dashboard Peserta."
    },
    {
      icon: FileText,
      title: "2. Pengisian Biodata",
      desc: "Lengkapi data diri, data orang tua, riwayat sekolah asal, dan pilih maksimal 2 program studi yang Anda minati."
    },
    {
      icon: UploadCloud,
      title: "3. Upload Dokumen Persyaratan",
      desc: "Siapkan dan unggah Pas Foto Latar Merah (3x4), KTP & KK, Ijazah/SKL, dan Kartu KIP (opsional bagi yang memiliki)."
    },
    {
      icon: CreditCard,
      title: "4. Pembayaran Pendaftaran",
      desc: "Transfer biaya pendaftaran sebesar Rp 250.000 ke rekening resmi Institut Cokroaminoto Pinrang dan unggah bukti pembayarannya."
    },
    {
      icon: CheckSquare,
      title: "5. Verifikasi Panitia",
      desc: "Panitia akan memeriksa kelengkapan data Anda. Jika semuanya valid, status Anda akan berubah menjadi Lulus Verifikasi."
    },
    {
      icon: CheckCircle,
      title: "6. Cetak Kartu Ujian",
      desc: "Setelah lulus verifikasi, Anda dapat mengunduh dan mencetak Kartu Ujian yang berisi QR Code untuk dibawa pada saat tes fisik."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition font-medium">
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Beranda
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Panduan Pendaftaran PMB</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Ikuti langkah-langkah di bawah ini untuk menjadi bagian dari Institut Cokroaminoto Pinrang. Proses pendaftaran sangat mudah dan dapat dilakukan 100% online.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">Alur Pendaftaran Lengkap</h2>
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-green-50 text-green-700 rounded-full flex items-center justify-center shrink-0 border border-green-200 z-10">
                      <step.icon className="w-6 h-6" />
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-0.5 h-full bg-slate-200 mt-2"></div>
                    )}
                  </div>
                  <div className="pt-2 pb-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-50 p-8 border-t border-slate-200 text-center">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Sudah Membaca Panduan?</h3>
            <Link href="/register" className="inline-flex items-center justify-center px-8 py-4 bg-green-700 text-white rounded-xl font-bold hover:bg-green-800 transition shadow-md">
              Mulai Pendaftaran Sekarang
            </Link>
          </div>
        </div>

        {/* Persyaratan Detail */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Persyaratan Pendaftaran Fisik (Daftar Ulang)</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <p className="text-yellow-800 text-sm">
                <strong>Catatan Penting:</strong> Dokumen-dokumen di bawah ini wajib disiapkan dalam bentuk fisik (kertas) dan dibawa ketika Anda dinyatakan lulus dan melakukan proses <strong>Daftar Ulang</strong> di kampus ICP.
              </p>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
                <span className="text-slate-700">Fotokopi Ijazah Terakhir dan Transkrip Nilai yang telah dilegalisir (5 Lembar)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
                <span className="text-slate-700">Fotokopi KTP Pribadi dan Kartu Keluarga (KK) (5 Lembar)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
                <span className="text-slate-700">Fotokopi Kartu KIP, Kartu KKS, atau Kartu BSM <em>(Bagi jalur KIP Kuliah/Jika Ada)</em></span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
                <span className="text-slate-700">Pas Foto Berwarna dengan latar belakang warna Merah ukuran 3x4 (8 Lembar)</span>
              </li>
            </ul>
          </div>
        </div>

      </main>
    </div>
  );
}
