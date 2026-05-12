import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, CheckCircle, GraduationCap, MapPin, Phone } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl text-slate-900 tracking-tight">PMB ICP</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#prodi" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">Program Studi</Link>
            <Link href="#jalur" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">Jalur Masuk</Link>
            <Link href="#biaya" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">Biaya Kuliah</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-700 hover:text-slate-900">Masuk</Link>
            <Link href="/register" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition shadow-sm hover:shadow-md">
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-24 pb-32 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white"></div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-8">
          <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
          Pendaftaran Gelombang 1 Dibuka
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 max-w-4xl">
          Raih Masa Depan Gemilang di <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Institut Cokroaminoto Pinrang
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl">
          Sistem Penerimaan Mahasiswa Baru yang modern, mudah, dan cepat. Jadilah bagian dari generasi unggul pemimpin masa depan.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/register" className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-blue-500/30">
            Mulai Pendaftaran
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/panduan" className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 rounded-full font-semibold text-lg border border-slate-200 hover:bg-slate-50 hover:-translate-y-0.5 transition-all shadow-sm">
            Panduan PMB
          </Link>
        </div>
      </section>

      {/* Features/Stats */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Program Studi Unggulan</h3>
              <p className="text-slate-600">Pilihan program studi terakreditasi dengan kurikulum relevan dengan kebutuhan industri saat ini.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Fasilitas Lengkap</h3>
              <p className="text-slate-600">Didukung laboratorium modern, perpustakaan digital, dan lingkungan kampus yang nyaman.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Jadwal Fleksibel</h3>
              <p className="text-slate-600">Tersedia kelas reguler dan kelas karyawan dengan jadwal kuliah yang dapat disesuaikan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-8 w-8 text-blue-500" />
              <span className="font-bold text-xl text-white tracking-tight">Institut Cokroaminoto Pinrang</span>
            </div>
            <p className="mb-6 max-w-sm text-sm">
              Menyelenggarakan pendidikan tinggi berkualitas untuk mencetak lulusan yang kompeten, berakhlak mulia, dan berdaya saing global.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-500 shrink-0" />
                <span>Jl. Pendidikan No. 1, Kabupaten Pinrang, Sulawesi Selatan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-slate-500 shrink-0" />
                <span>+62 811 2233 4455</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/login" className="hover:text-blue-400 transition">Masuk Dashboard</Link></li>
              <li><Link href="/register" className="hover:text-blue-400 transition">Daftar Akun Baru</Link></li>
              <li><Link href="/lupa-password" className="hover:text-blue-400 transition">Lupa Password</Link></li>
              <li><Link href="/pengumuman" className="hover:text-blue-400 transition">Cek Kelulusan</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
          &copy; {new Date().getFullYear()} Institut Cokroaminoto Pinrang. Hak Cipta Dilindungi Undang-Undang.
        </div>
      </footer>
    </div>
  );
}
