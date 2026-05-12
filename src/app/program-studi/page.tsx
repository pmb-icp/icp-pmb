import Link from "next/link";
import { ArrowLeft, Award, BookOpen, MapPin, Briefcase, ChevronRight } from "lucide-react";

export default function ProgramStudiPage() {
  const programs = [
    {
      id: "hukum",
      fakultas: "Ilmu Hukum",
      name: "Ilmu Hukum",
      akreditasi: "B",
      desc: "Mencetak praktisi hukum yang adil, religius, dan berintegritas tinggi.",
      prospek: ["Hakim/Jaksa", "Pengacara/Advokat", "Konsultan Hukum", "Notaris", "Staf Legal Perusahaan"]
    },
    {
      id: "matematika",
      fakultas: "Keguruan dan Ilmu Pendidikan",
      name: "Pendidikan Matematika",
      akreditasi: "B",
      desc: "Melahirkan pengajar eksakta yang analitis, logis, dan inovatif serta mampu memanfaatkan teknologi dalam pembelajaran matematika.",
      prospek: ["Guru Matematika", "Peneliti Pendidikan", "Edupreneur", "Analis Data", "Penulis Buku Ajar"]
    },
    {
      id: "sastra",
      fakultas: "Keguruan dan Ilmu Pendidikan",
      name: "Pendidikan Bahasa dan Sastra Indonesia",
      akreditasi: "B",
      desc: "Mencetak pendidik profesional di bidang bahasa dan sastra nusantara yang mampu mengapresiasi dan melestarikan budaya.",
      prospek: ["Guru Bahasa Indonesia", "Jurnalis/Wartawan", "Penulis/Penyair", "Editor", "Penyiar Radio/TV"]
    },
    {
      id: "ekonomi",
      fakultas: "Keguruan dan Ilmu Pendidikan",
      name: "Pendidikan Ekonomi",
      akreditasi: "B",
      desc: "Mencetak pendidik dan praktisi ekonomi yang adaptif terhadap era digital dan memiliki kepekaan sosial-ekonomi yang tinggi.",
      prospek: ["Guru Ekonomi/Akuntansi", "Wirausahawan", "Pegawai Bank", "Konsultan Keuangan", "Peneliti Ekonomi"]
    },
    {
      id: "pkn",
      fakultas: "Keguruan dan Ilmu Pendidikan",
      name: "Pendidikan PKn",
      akreditasi: "B",
      desc: "Membentuk karakter bangsa melalui pendidik yang nasionalis, memahami konstitusi, dan mampu menanamkan nilai-nilai demokrasi.",
      prospek: ["Guru PKn", "Penyuluh Kenegaraan", "Aktivis LSM", "Pegawai Pemerintahan", "Peneliti Sosial Politik"]
    },
    {
      id: "pgsd",
      fakultas: "Keguruan dan Ilmu Pendidikan",
      name: "Pendidikan Guru Sekolah Dasar (PGSD)",
      akreditasi: "B",
      desc: "Program unggulan untuk calon pendidik generasi dasar yang kreatif, sabar, dan memiliki pemahaman psikologi perkembangan anak.",
      prospek: ["Guru SD", "Kepala Sekolah Dasar", "Konsultan Pendidikan Anak", "Pembuat Media Belajar", "Pemilik Bimbingan Belajar"]
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
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 text-green-700 rounded-2xl mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Eksplorasi Program Studi</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Institut Cokroaminoto Pinrang menawarkan 6 Program Studi unggulan tingkat Strata-1 (S1) yang telah terakreditasi oleh BAN-PT untuk menjawab tantangan dunia kerja modern.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((prodi) => (
            <div key={prodi.id} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:border-green-500 hover:shadow-lg transition-all group flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">{prodi.fakultas}</div>
                <div className="flex items-center gap-1 text-xs font-bold text-yellow-700 bg-yellow-100 px-2 py-1 rounded-md border border-yellow-200">
                  <Award className="w-3 h-3" /> Akreditasi {prodi.akreditasi}
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-green-700 transition-colors">
                {prodi.name}
              </h2>
              <p className="text-slate-600 mb-6 flex-grow leading-relaxed">
                {prodi.desc}
              </p>
              
              <div className="border-t border-slate-100 pt-6 mt-auto">
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-green-600" />
                  Prospek Karir Lulusan:
                </h3>
                <ul className="space-y-2 mb-6">
                  {prodi.prospek.map((job, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      {job}
                    </li>
                  ))}
                </ul>
                
                <Link href="/register" className="w-full flex items-center justify-center gap-2 bg-slate-50 text-green-700 font-semibold py-3 rounded-xl border border-slate-200 group-hover:bg-green-700 group-hover:text-white group-hover:border-green-700 transition-all">
                  Pilih Prodi Ini
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-slate-900 rounded-3xl p-10 text-center text-white border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <h2 className="text-3xl font-bold mb-4 relative z-10">Siap Menentukan Pilihan Anda?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8 relative z-10">
            Bergabunglah bersama ribuan mahasiswa lainnya untuk merajut masa depan yang cerah di Institut Cokroaminoto Pinrang.
          </p>
          <Link href="/register" className="inline-block bg-green-600 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-green-500 hover:scale-105 transition-all shadow-lg relative z-10">
            Mulai Pendaftaran Sekarang
          </Link>
        </div>
      </main>
    </div>
  );
}
