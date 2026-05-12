"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function ProfilPage() {
  const [activeTab, setActiveTab] = useState<'fkip' | 'hukum'>('fkip');
  
  // Calculator State
  const [biayaProdi, setBiayaProdi] = useState(2500000);
  const [potonganJalur, setPotonganJalur] = useState(0);
  const [totalBiaya, setTotalBiaya] = useState(0);
  const [isCalcAnimating, setIsCalcAnimating] = useState(false);

  useEffect(() => {
    const calc = () => {
      setIsCalcAnimating(true);
      setTimeout(() => {
        let total = biayaProdi + potonganJalur;
        if (total < 0) total = 0;
        setTotalBiaya(total);
        setIsCalcAnimating(false);
      }, 150);
    };
    calc();
  }, [biayaProdi, potonganJalur]);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  const demografiData = {
    labels: [
      'Ilmu Hukum (FH)', 
      'Rumpun Kependidikan (FKIP)'
    ],
    datasets: [{
      data: [40, 60],
      backgroundColor: [
        '#f59e0b', // amber-500
        '#059669', // emerald-600
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };

  const demografiOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: { position: 'bottom' as const },
    }
  };

  const pertumbuhanData = {
    labels: ['2020 (Terpisah)', '2021 (Persiapan)', '2022 (Merger)', '2023-2026 (Proyeksi)'],
    datasets: [
      {
        label: 'Eks-STKIP / FKIP',
        data: [350, 320, 480, 550],
        backgroundColor: '#059669',
        borderRadius: 4
      },
      {
        label: 'Eks-STIH / FH',
        data: [200, 190, 310, 400],
        backgroundColor: '#f59e0b',
        borderRadius: 4
      }
    ]
  };

  const pertumbuhanOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { stacked: true, grid: { display: false } },
      y: { stacked: true, beginAtZero: true, title: { display: true, text: 'Jumlah Mahasiswa/Pendaftar' } }
    },
    plugins: { legend: { position: 'bottom' as const } }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-200">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">
                ICP
              </div>
              <span className="font-bold text-xl text-emerald-900 leading-tight hidden sm:block">
                INSTITUT COKROAMINOTO<br/><span className="text-sm text-emerald-600 font-medium">PINRANG</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#transformasi" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Transformasi</a>
              <a href="#akademik" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Fakultas</a>
              <a href="#data" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Data Kampus</a>
              <Link href="/register" className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-full font-bold transition-colors shadow-sm">Pendaftaran</Link>
            </div>
            <div className="md:hidden">
               <Link href="/" className="flex items-center gap-2 text-emerald-700 font-medium">
                  <ArrowLeft className="w-5 h-5"/> Beranda
               </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="beranda" className="bg-emerald-900 text-white py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block bg-emerald-800 border border-emerald-600 text-emerald-100 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6">
            Era Baru Pendidikan Tinggi di Kabupaten Pinrang
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Membangun Generasi <span className="text-amber-500">Unggul</span> & <span className="text-amber-500">Berkeadilan</span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 mb-10 leading-relaxed max-w-3xl mx-auto">
            Institut Cokroaminoto Pinrang (ICP) adalah wujud evolusi pendidikan sejak 27 Juli 2022, menyatukan keunggulan STKIP dan STIH Cokroaminoto Pinrang menjadi satu institusi besar yang siap mencetak pendidik profesional dan praktisi hukum berintegritas.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#transformasi" className="bg-white text-emerald-900 hover:bg-slate-100 px-8 py-3 rounded-lg font-bold text-lg transition-colors shadow-lg">
              Pelajari Sejarah Kami
            </a>
            <a href="#akademik" className="bg-transparent border-2 border-emerald-400 text-emerald-50 hover:bg-emerald-800 px-8 py-3 rounded-lg font-bold text-lg transition-colors text-center">
              Lihat Program Studi
            </a>
          </div>
        </div>
      </header>

      {/* Transformasi & Sejarah */}
      <section id="transformasi" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-emerald-900 mb-4">Transformasi & Sejarah Institusi</h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg">
              Memahami sejarah perjalanan historis peleburan dua sekolah tinggi kebanggaan masyarakat Kabupaten Pinrang, berada di bawah naungan Yayasan Pembina Pendidikan Cokroaminoto Pinrang.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Sinergi Dua Kekuatan Besar</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Institut Cokroaminoto Pinrang lahir dari semangat inovasi untuk meningkatkan mutu pendidikan. Sebelumnya, Yayasan menaungi dua entitas terpisah: <strong>STKIP Cokroaminoto Pinrang</strong> (berdiri 1986) dan <strong>STIH Cokroaminoto Pinrang</strong> (berdiri 2001).
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Pada tanggal <strong>27 Juli 2022</strong> (SK Kemendikbudristek RI No. 560/E/O/2022), kedua institusi ini resmi dilebur. Penggabungan ini menciptakan ruang lingkup akademik yang luas untuk mewujudkan visi besar menjadi Universitas Cokroaminoto Pinrang di masa depan.
              </p>
              
              <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2">Visi Penggabungan</h4>
                <p className="text-sm text-emerald-900 italic">"Menjadi institusi pendidikan yang unggul dan berdaya saing pada tingkat lokal dan regional pada tahun 2027, berbasis kearifan lokal Sulawesi Selatan."</p>
              </div>
            </div>

            <div className="relative pl-4 md:pl-8">
              <div className="absolute left-[25px] md:left-[41px] top-4 bottom-0 w-0.5 bg-slate-200 z-0"></div>
              
              <div className="relative z-10 flex items-start mb-10">
                <div className="w-5 h-5 bg-emerald-600 rounded-full mt-1.5 mr-4 flex-shrink-0 shadow-[0_0_0_4px_rgba(5,150,105,0.1)]"></div>
                <div>
                  <h4 className="text-lg font-bold text-emerald-900">Era Sekolah Tinggi (1986 - 2021)</h4>
                  <p className="text-slate-600 mt-1 text-sm">Berdirinya STKIP (1986) dan STIH (2001) secara terpisah. Mengabdi puluhan tahun dalam mencetak lebih dari ribuan sarjana pendidikan dan sarjana hukum yang tersebar di seluruh Indonesia.</p>
                </div>
              </div>
              
              <div className="relative z-10 flex items-start mb-10">
                <div className="w-5 h-5 bg-amber-500 rounded-full mt-1.5 mr-4 flex-shrink-0 shadow-[0_0_0_4px_rgba(245,158,11,0.1)]"></div>
                <div>
                  <h4 className="text-lg font-bold text-amber-600">Gagasan Penyatuan (Akhir 2021)</h4>
                  <p className="text-slate-600 mt-1 text-sm">Yayasan memprakarsai proses penggabungan untuk meningkatkan status akreditasi kelembagaan, menyatukan sumber daya, dan mempersiapkan pembukaan program pascasarjana.</p>
                </div>
              </div>
              
              <div className="relative z-10 flex items-start">
                <div className="w-6 h-6 bg-emerald-800 border-4 border-emerald-200 rounded-full mt-1 mr-3.5 flex-shrink-0"></div>
                <div>
                  <h4 className="text-lg font-bold text-emerald-900">Lahirnya ICP (27 Juli 2022)</h4>
                  <p className="text-slate-600 mt-1 text-sm">Berdasarkan SK Kemendikbudristek, STKIP dan STIH resmi berganti wujud menjadi Institut Cokroaminoto Pinrang. Diresmikan pada 4 Agustus 2022 di hadapan Bupati Pinrang dan LLDIKTI.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fakultas & Program Studi */}
      <section id="akademik" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-emerald-900 mb-4">Struktur Akademik Terintegrasi</h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg">
              Institut Cokroaminoto Pinrang mengelola 8 program studi sarjana yang terbagi menjadi dua rumpun besar, mewarisi keunggulan akademik dari kedua institusi pendahulu.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="flex flex-col sm:flex-row border-b border-slate-200">
              <button 
                onClick={() => setActiveTab('fkip')} 
                className={`flex-1 py-5 px-6 text-center focus:outline-none transition-all duration-300 ${activeTab === 'fkip' ? 'border-b-4 border-emerald-600 bg-emerald-50/50 text-emerald-800 font-bold' : 'border-b-4 border-transparent text-slate-600 hover:bg-slate-50'}`}
              >
                <span className="block text-2xl mb-2">🎓</span>
                Rumpun Kependidikan (FKIP)
                <span className="block text-xs mt-1 font-normal opacity-70">Transformasi dari STKIP (7 Prodi)</span>
              </button>
              <button 
                onClick={() => setActiveTab('hukum')} 
                className={`flex-1 py-5 px-6 text-center focus:outline-none transition-all duration-300 ${activeTab === 'hukum' ? 'border-b-4 border-emerald-600 bg-emerald-50/50 text-emerald-800 font-bold' : 'border-b-4 border-transparent text-slate-600 hover:bg-slate-50'}`}
              >
                <span className="block text-2xl mb-2">⚖️</span>
                Rumpun Hukum (FH)
                <span className="block text-xs mt-1 font-normal opacity-70">Transformasi dari STIH (1 Prodi)</span>
              </button>
            </div>

            <div className="p-8 md:p-12 relative min-h-[400px]">
              {/* Tab Content FKIP */}
              <div className={`transition-opacity duration-500 absolute inset-0 p-8 md:p-12 ${activeTab === 'fkip' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-emerald-900 mb-3">Mencetak Pendidik Masa Depan</h3>
                  <p className="text-slate-600">Mewarisi pengalaman panjang dari STKIP, rumpun kependidikan menyelenggarakan pendidikan berkualitas yang adaptif terhadap teknologi (MBKM-aligned) dan berpusat pada perkembangan karakter.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: 'S1 Pendidikan Bahasa Indonesia', desc: 'Menghasilkan guru bahasa kompeten dan inovatif.' },
                    { title: 'S1 Pendidikan Bahasa Inggris', desc: 'Membekali guru dengan kompetensi bahasa global.' },
                    { title: 'S1 Pendidikan Matematika', desc: 'Mencetak guru dengan inovasi pembelajaran logika.' },
                    { title: 'S1 Pendidikan Biologi', desc: 'Guru biologi berpemahaman mendalam ekosistem lokal.' },
                    { title: 'S1 Pendidikan Ekonomi', desc: 'Guru dengan pemahaman ekonomi lokal dan global.' },
                    { title: 'S1 PPKn', desc: 'Menanamkan nilai kebangsaan pada peserta didik.' },
                    { title: 'S1 PJKR', desc: 'Kompetensi penjas, kesehatan dan sport science.' }
                  ].map((prodi, idx) => (
                    <div key={idx} className="border border-slate-100 bg-slate-50 rounded-xl p-5 hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-slate-800 text-md mb-2">{prodi.title}</h4>
                      <p className="text-xs text-slate-600 mb-3">{prodi.desc}</p>
                      <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full uppercase tracking-wider">Terakreditasi</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tab Content Hukum */}
              <div className={`transition-opacity duration-500 absolute inset-0 p-8 md:p-12 ${activeTab === 'hukum' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-emerald-900 mb-3">Menegakkan Keadilan dan Kebenaran</h3>
                  <p className="text-slate-600">Melanjutkan tradisi akademik STIH yang prestisius, program Ilmu Hukum berfokus pada analisis hukum kritis, komparatif, dan penyiapan profesi hukum andal.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="border border-slate-100 bg-slate-50 rounded-xl p-6 hover:shadow-md transition-shadow flex items-start gap-4">
                    <div className="w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">⚖️</div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-xl mb-2">S1 Ilmu Hukum</h4>
                      <p className="text-sm text-slate-600 mb-4">Lulusan dipersiapkan menjadi advokat, hakim, jaksa, ASN, atau konsultan hukum. Menawarkan kelas eksekutif bagi profesional.</p>
                      <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">Akreditasi BAN-PT: Peringkat B</span>
                      
                      <h5 className="font-bold text-slate-700 text-sm mt-4 mb-2">Konsentrasi Tersedia:</h5>
                      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                        <li>Hukum Pidana</li>
                        <li>Hukum Perdata</li>
                        <li>Hukum Tata Negara</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-emerald-900 rounded-xl p-8 text-white flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-10 text-9xl">⚖️</div>
                    <h4 className="text-xl font-bold mb-4 relative z-10">Rencana Program Baru</h4>
                    <p className="text-emerald-100 text-sm mb-4 relative z-10">Sebagai bagian dari visi penggabungan, ICP tengah mempersiapkan peluncuran program pascasarjana pertamanya:</p>
                    <div className="bg-white/10 p-4 rounded-lg relative z-10 border border-white/20">
                       <h5 className="font-bold text-amber-400">S2 Magister Ilmu Hukum</h5>
                       <p className="text-xs text-emerald-50 mt-1">Status: Dalam proses persiapan paska-merger. Fokus pada riset hukum dan profesi advokat spesialis.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data & Statistik */}
      <section id="data" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-emerald-900 mb-4">Visualisasi Data & Prospek Kampus</h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg">
              Transparansi pertumbuhan paska-merger. Grafik di bawah menggambarkan kekuatan gabungan program studi dan tren animo pendaftar ke Institut Cokroaminoto Pinrang.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-center text-slate-800 mb-2">Proporsi Fakultas (Simulasi)</h3>
              <p className="text-center text-sm text-slate-500 mb-6">Sebaran program dan mahasiswa paska penggabungan</p>
              <div className="relative w-full h-[300px]">
                <Doughnut data={demografiData} options={demografiOptions} />
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-center text-slate-800 mb-2">Tren Pertumbuhan Mahasiswa</h3>
              <p className="text-center text-sm text-slate-500 mb-6">Dampak transisi kelembagaan menjadi Institut</p>
              <div className="relative w-full h-[300px]">
                <Bar data={pertumbuhanData} options={pertumbuhanOptions} />
              </div>
            </div>
          </div>

          {/* Kalkulator Biaya */}
          <div className="mt-16 bg-gradient-to-br from-emerald-900 to-emerald-950 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <div className="text-amber-400 font-bold mb-2 uppercase tracking-wide text-sm">Fitur Interaktif</div>
                <h3 className="text-3xl font-bold mb-4">Kalkulator Estimasi Biaya</h3>
                <p className="text-emerald-100 mb-6 leading-relaxed">
                  Kami berkomitmen pada transparansi. Gunakan kalkulator ini untuk memproyeksikan biaya awal semester pertama perkuliahan Anda.
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-1">Pilih Program Studi</label>
                    <select 
                      value={biayaProdi} 
                      onChange={(e) => setBiayaProdi(Number(e.target.value))}
                      className="w-full bg-emerald-800/80 border border-emerald-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
                    >
                      <option value={2500000}>S1 Ilmu Hukum (Reguler)</option>
                      <option value={3000000}>S1 Ilmu Hukum (Kelas Eksekutif)</option>
                      <option value={2500000}>S1 Rumpun Kependidikan (Semua Prodi)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-1">Jalur Pendaftaran / Beasiswa</label>
                    <select 
                      value={potonganJalur} 
                      onChange={(e) => setPotonganJalur(Number(e.target.value))}
                      className="w-full bg-emerald-800/80 border border-emerald-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
                    >
                      <option value={0}>Reguler (Biaya Standar)</option>
                      <option value={-500000}>Potongan Jalur Prestasi (-Rp 500.000)</option>
                      <option value={-2000000}>Penerima KIP Kuliah (Bebas UKT)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-md border border-white/10 text-white p-8 rounded-2xl text-center flex flex-col justify-center h-full min-h-[250px]">
                <h4 className="text-emerald-200 font-medium mb-2">Total Estimasi Semester 1</h4>
                <div className={`text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md transition-opacity duration-300 ${isCalcAnimating ? 'opacity-0' : 'opacity-100'}`}>
                  {formatRupiah(totalBiaya)}
                </div>
                <p className="text-xs text-emerald-300/70 mt-4 leading-relaxed px-4">
                  *Berdasarkan sistem Uang Kuliah Tunggal (UKT). Sumbangan Penyelenggaraan Pendidikan (SPP) dapat diangsur sesuai kebijakan kampus.
                </p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <Link href="/register" className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 shadow-lg">
                    Daftar Sekarang
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pmb" className="py-20 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm mb-2 block">Penerimaan Mahasiswa Baru</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Bergabunglah dengan Era Baru Pendidikan di Pinrang</h2>
          <p className="text-lg text-slate-600 mb-10">Pendaftaran tahun akademik baru telah dibuka. Jadilah bagian dari sejarah Institut Cokroaminoto Pinrang.</p>
          
          <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-3xl mb-3">📝</div>
                <h4 className="font-bold text-slate-800">1. Isi Formulir</h4>
                <p className="text-sm text-slate-500">Daftar secara online dengan cepat melalui sistem kami.</p>
              </div>
              <div>
                <div className="text-3xl mb-3">📁</div>
                <h4 className="font-bold text-slate-800">2. Upload Berkas</h4>
                <p className="text-sm text-slate-500">Unggah dokumen persyaratan tanpa perlu datang ke kampus.</p>
              </div>
              <div>
                <div className="text-3xl mb-3">🎓</div>
                <h4 className="font-bold text-slate-800">3. Tes & Verifikasi</h4>
                <p className="text-sm text-slate-500">Ikuti seleksi dan selesaikan administrasi daftar ulang.</p>
              </div>
            </div>
            
            <Link href="/register" className="inline-block bg-emerald-700 hover:bg-emerald-800 text-white text-lg font-bold py-4 px-10 rounded-full transition-transform transform hover:scale-105 shadow-lg w-full sm:w-auto">
              Buka Portal Pendaftaran
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} Institut Cokroaminoto Pinrang. Hak Cipta Dilindungi.</p>
          <p className="mt-2 text-slate-500">Sistem Penerimaan Mahasiswa Baru Terpadu.</p>
        </div>
      </footer>
    </div>
  );
}
