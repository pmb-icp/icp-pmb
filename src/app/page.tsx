import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Calendar, CheckCircle, MapPin, Phone, MessageCircle, ChevronDown, Award, Clock, Wallet, HelpCircle, PlayCircle } from "lucide-react";
import FeeCalculator from "@/components/FeeCalculator";
import HeroSlider from "@/components/HeroSlider";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition cursor-pointer">
            <Image src="/logo.png" alt="Logo ICP" width={36} height={36} className="object-contain" />
            <span className="font-bold text-xl text-slate-900 tracking-tight">PMB ICP</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-green-600 transition">Beranda</Link>
            <Link href="/profil" className="text-sm font-medium text-slate-600 hover:text-green-600 transition">Profil Kampus</Link>
            <Link href="#prodi" className="text-sm font-medium text-slate-600 hover:text-green-600 transition">Program Studi</Link>
            <Link href="#jalur" className="text-sm font-medium text-slate-600 hover:text-green-600 transition">Jalur Masuk</Link>
            <Link href="#biaya" className="text-sm font-medium text-slate-600 hover:text-green-600 transition">Biaya Kuliah</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-700 hover:text-slate-900">Masuk</Link>
            <Link href="/register" className="text-sm font-medium bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 transition shadow-sm hover:shadow-md">
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Features/Stats */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Keunggulan & Fasilitas Kampus</h2>
              <p className="text-slate-600 max-w-2xl">Visi: "Menjadi Perguruan Tinggi unggul dan berdaya saing di bidang Ilmu Hukum, Keguruan dan Ilmu Pendidikan di tingkat Nasional tahun 2027"</p>
            </div>
            <div className="w-full md:w-1/3 rounded-2xl overflow-hidden shadow-lg border-2 border-white transform hover:scale-105 transition duration-500">
              <img src="/campus-facility.png" alt="Fasilitas Kampus" className="w-full h-48 object-cover" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-50 text-green-700 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Dosen & Kurikulum Terpadu</h3>
              <p className="text-slate-600">Dosen dari kalangan praktisi, profesional dan akademisi berpengalaman. Kurikulum terpadu yang disesuaikan dengan kebutuhan terkini.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Lokasi Strategis & Fasilitas</h3>
              <p className="text-slate-600">Lokasi representatif mudah menjangkau pusat kota. Fasilitas: Ruang Kuliah, Free Wifi, Perpustakaan, Sarana Olahraga, dan Pusat Kegiatan Mahasiswa.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Kelas Eksekutif & SPP Diangsur</h3>
              <p className="text-slate-600">Menyediakan kelas eksekutif untuk kemudahan mahasiswa yang kuliah sambil bekerja/mengajar. SPP juga bisa diangsur!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Studi */}
      <section id="prodi" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Program Studi Sarjana (S1)</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Pilih dari 6 program studi unggulan yang telah terakreditasi dan dirancang untuk menjawab tantangan masa depan.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Pendidikan Bahasa dan Sastra Indonesia", akreditasi: "B", desc: "Mencetak pendidik profesional di bidang bahasa dan sastra nusantara." },
              { name: "Pendidikan Guru Sekolah Dasar (PGSD)", akreditasi: "B", desc: "Program unggulan untuk calon pendidik generasi dasar yang kreatif." },
              { name: "Pendidikan Matematika", akreditasi: "B", desc: "Melahirkan pengajar eksakta yang analitis, logis, dan inovatif." },
              { name: "Pendidikan Ekonomi", akreditasi: "B", desc: "Mencetak pendidik dan praktisi ekonomi yang adaptif terhadap era digital." },
              { name: "Pendidikan PKn", akreditasi: "B", desc: "Membentuk karakter bangsa melalui pendidik yang nasionalis." },
              { name: "Ilmu Hukum", akreditasi: "B", desc: "Mencetak praktisi hukum yang adil, religius, dan berintegritas tinggi." }
            ].map((prodi, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl p-6 hover:border-green-500 hover:shadow-lg transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-green-50 text-green-700 px-3 py-1 rounded-md text-sm font-bold border border-green-100">S1</div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md">
                    <Award className="w-3 h-3" /> Akreditasi {prodi.akreditasi}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-green-700 transition-colors">{prodi.name}</h3>
                <p className="text-slate-600 text-sm mb-6">{prodi.desc}</p>
                <Link href="/register" className="text-green-700 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Daftar Prodi Ini <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/program-studi" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-slate-800 transition shadow-sm hover:shadow-md">
              Lihat Detail Program Studi <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Jalur & Timeline */}
      <section id="jalur" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Jalur Pendaftaran */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Jalur Pendaftaran</h2>
              <div className="space-y-5">
                {[
                  { name: "Jalur Reguler", color: "text-green-400", borderColor: "group-hover:border-green-400", bgGlow: "group-hover:bg-green-400/5", desc: "Jalur umum bagi lulusan SMA/SMK/MA sederajat tanpa batasan tahun kelulusan dengan seleksi tes tertulis/CBT." },
                  { name: "Jalur Prestasi", color: "text-yellow-400", borderColor: "group-hover:border-yellow-400", bgGlow: "group-hover:bg-yellow-400/5", desc: "Jalur bebas tes bagi siswa peringkat 1-10 di sekolah atau memiliki prestasi non-akademik tingkat Kabupaten/Provinsi." },
                  { name: "Jalur KIP Kuliah", color: "text-blue-400", borderColor: "group-hover:border-blue-400", bgGlow: "group-hover:bg-blue-400/5", desc: "Jalur beasiswa penuh dari pemerintah bagi calon mahasiswa berprestasi yang memiliki keterbatasan ekonomi." }
                ].map((jalur, idx) => (
                  <div key={idx} className={`group relative bg-slate-800/80 border border-slate-700 rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl overflow-hidden cursor-pointer ${jalur.borderColor} ${jalur.bgGlow}`}>
                    <div className="absolute top-0 right-0 px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-bl-xl rounded-tr-xl border-l border-b border-green-500/30 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                      Sedang Dibuka
                    </div>
                    <h3 className={`text-xl font-bold ${jalur.color} mb-3 mt-2 pr-20`}>{jalur.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{jalur.desc}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                      Pelajari Persyaratan <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Jadwal Seleksi (Timeline)</h2>
              <div className="relative border-l-2 border-slate-700 ml-4 space-y-8 pb-4">
                <div className="relative pl-8">
                  <div className="absolute w-4 h-4 bg-green-500 rounded-full -left-[9px] top-1 ring-4 ring-slate-900"></div>
                  <h4 className="text-lg font-bold text-white">Gelombang 1 Dibuka</h4>
                  <p className="text-green-400 text-sm mb-1">01 Maret - 31 Mei 2026</p>
                  <p className="text-slate-400 text-sm">Pendaftaran online, pengisian biodata, dan unggah berkas.</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute w-4 h-4 bg-slate-600 rounded-full -left-[9px] top-1 ring-4 ring-slate-900"></div>
                  <h4 className="text-lg font-bold text-white">Gelombang 2 Dibuka</h4>
                  <p className="text-green-400 text-sm mb-1">01 Juni - 30 Agustus 2026</p>
                  <p className="text-slate-400 text-sm">Kesempatan kedua bagi yang belum sempat mendaftar di gelombang pertama.</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute w-4 h-4 bg-slate-600 rounded-full -left-[9px] top-1 ring-4 ring-slate-900"></div>
                  <h4 className="text-lg font-bold text-white">Tes Seleksi Berbasis Komputer</h4>
                  <p className="text-green-400 text-sm mb-1">10 Mei 2026</p>
                  <p className="text-slate-400 text-sm">Bagi peserta jalur Reguler. Jalur Prestasi dan KIP langsung wawancara.</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute w-4 h-4 bg-slate-600 rounded-full -left-[9px] top-1 ring-4 ring-slate-900"></div>
                  <h4 className="text-lg font-bold text-white">Pengumuman Kelulusan</h4>
                  <p className="text-green-400 text-sm mb-1">15 Mei 2026</p>
                  <p className="text-slate-400 text-sm">Diumumkan secara online melalui dashboard akun masing-masing.</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute w-4 h-4 bg-slate-600 rounded-full -left-[9px] top-1 ring-4 ring-slate-900"></div>
                  <h4 className="text-lg font-bold text-white">Daftar Ulang</h4>
                  <p className="text-green-400 text-sm mb-1">16 - 31 Mei 2026</p>
                  <p className="text-slate-400 text-sm">Pembayaran UKT semester pertama dan pemberkasan fisik.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Biaya Kuliah */}
      <section id="biaya" className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Biaya Pendidikan</h2>
          <p className="text-slate-600 mb-12">Institut Cokroaminoto Pinrang menerapkan sistem Uang Kuliah Tunggal (UKT) yang terjangkau tanpa biaya gedung atau pungutan tersembunyi lainnya.</p>
          
          <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200 p-2 sm:p-3 max-w-2xl mx-auto">
            
            {/* Premium Card UI */}
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-green-950 rounded-3xl p-8 sm:p-10 text-white overflow-hidden shadow-inner">
              {/* Decorative shapes for the card */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-green-500/20 blur-2xl"></div>
              
              <div className="relative z-10 flex justify-between items-start mb-16">
                <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/10">
                  <Wallet className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-300 text-xs font-bold uppercase tracking-wider rounded-full">
                    Sistem Terjangkau
                  </span>
                </div>
              </div>
              
              <div className="relative z-10 text-left">
                <p className="text-sm sm:text-base font-medium text-slate-400 mb-1">Uang Kuliah Tunggal (UKT)</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">Rp 2.500.000</span>
                  <span className="text-slate-400 font-medium text-lg">/ sem</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <ul className="space-y-4 text-left">
                <li className="flex items-center gap-3 text-slate-700"><CheckCircle className="w-5 h-5 text-green-500 shrink-0" /> Sumbangan Penyelenggaraan Pendidikan (SPP) bisa diangsur.</li>
                <li className="flex items-center gap-3 text-slate-700"><CheckCircle className="w-5 h-5 text-green-500 shrink-0" /> Tersedia beasiswa KIP Kuliah bagi mahasiswa yang tidak mampu.</li>
                <li className="flex items-center gap-3 text-slate-700"><CheckCircle className="w-5 h-5 text-green-500 shrink-0" /> Menerima pendaftaran Mahasiswa Pindahan / Konversi.</li>
              </ul>
              <div className="mt-8 pt-8 border-t border-slate-100">
                <Link href="/register" className="block w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition shadow-md">
                  Daftar Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <FeeCalculator />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-2">
              <HelpCircle className="w-8 h-8 text-green-600" />
              Pertanyaan Seputar PMB
            </h2>
            <p className="text-slate-600">Jawaban cepat untuk pertanyaan yang paling sering ditanyakan oleh calon mahasiswa.</p>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "Apakah ada batasan tahun kelulusan untuk mendaftar?", a: "Tidak ada batasan tahun kelulusan. Kami menerima calon mahasiswa dari berbagai tahun kelulusan asalkan memiliki ijazah SMA/SMK/MA sederajat yang sah." },
              { q: "Bagaimana cara mendapatkan beasiswa KIP Kuliah?", a: "Pilih 'Jalur KIP Kuliah' saat mendaftar. Setelah lulus seleksi awal, Anda wajib melampirkan Kartu KIP atau Surat Keterangan Tidak Mampu (SKTM) dari kelurahan setempat untuk proses verifikasi lanjutan." },
              { q: "Apakah biaya UKT bisa dicicil?", a: "Ya, Institut Cokroaminoto Pinrang memberikan kemudahan pembayaran UKT yang dapat dicicil hingga 3 kali dalam satu semester." },
              { q: "Apakah kelas karyawan/ekstensi tersedia?", a: "Tentu. Kami menyediakan kelas sore/malam khusus bagi mahasiswa yang sudah bekerja dengan jadwal yang fleksibel tanpa mengurangi kualitas pembelajaran." },
              { q: "Berapa lama proses verifikasi dokumen dan pembayaran?", a: "Proses verifikasi biasanya memakan waktu maksimal 2x24 jam hari kerja. Anda dapat mengecek status secara berkala di Dashboard akun Anda." }
            ].map((faq, i) => (
              <details key={i} className="group bg-slate-50 border border-slate-200 rounded-2xl [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-5 text-slate-900 font-semibold hover:text-green-700 transition">
                  <h3 className="text-base sm:text-lg">{faq.q}</h3>
                  <ChevronDown className="w-5 h-5 shrink-0 transition duration-300 group-open:-rotate-180" />
                </summary>
                <div className="p-5 pt-0 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-200/60 mt-2 pt-4">
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/6281122334455" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center">
        <MessageCircle className="w-8 h-8" />
      </a>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white p-1 rounded-md">
                <Image src="/logo.png" alt="Logo ICP" width={32} height={32} className="object-contain" />
              </div>
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
                <MapPin className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                <span>Jl. Teuku Umar No. 36 Pinrang</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-400">Prodi Hukum:</span>
                  <span>0823-4357-3729 / 0852-5580-2466</span>
                  <span className="font-semibold text-slate-400 mt-2">Prodi Pendidikan:</span>
                  <span>0821-9502-7732 / 0812-5383-1207</span>
                </div>
              </li>
              <li className="flex items-center gap-3 pt-2">
                <MessageCircle className="w-5 h-5 text-slate-500 shrink-0" />
                <span className="text-xs break-all">institutcokroaminotopinrang@gmail.com</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/panduan" className="hover:text-green-400 transition">Panduan Pendaftaran</Link></li>
              <li><Link href="/program-studi" className="hover:text-green-400 transition">Daftar Program Studi</Link></li>
              <li><Link href="/login" className="hover:text-green-400 transition">Masuk Dashboard</Link></li>
              <li><Link href="/register" className="hover:text-green-400 transition">Daftar Akun Baru</Link></li>
              <li><Link href="/pengumuman" className="hover:text-green-400 transition">Cek Kelulusan</Link></li>
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
