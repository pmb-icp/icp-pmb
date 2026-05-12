"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FeeCalculator() {
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

  return (
    <div className="mt-16 bg-gradient-to-br from-green-900 to-green-950 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden max-w-4xl mx-auto text-left">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-green-500/10 blur-3xl"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <div className="text-yellow-400 font-bold mb-2 uppercase tracking-wide text-sm">Fitur Interaktif</div>
          <h3 className="text-3xl font-bold mb-4">Kalkulator Estimasi Biaya</h3>
          <p className="text-green-100 mb-6 leading-relaxed">
            Kami berkomitmen pada transparansi. Gunakan kalkulator ini untuk memproyeksikan biaya Uang Kuliah Tunggal (UKT) Anda.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-green-200 mb-1">Pilih Program Studi</label>
              <select 
                value={biayaProdi} 
                onChange={(e) => setBiayaProdi(Number(e.target.value))}
                className="w-full bg-green-800/80 border border-green-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
              >
                <option value={2500000}>S1 Ilmu Hukum (Reguler)</option>
                <option value={3000000}>S1 Ilmu Hukum (Kelas Eksekutif)</option>
                <option value={2500000}>S1 Rumpun Kependidikan (Semua Prodi)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-green-200 mb-1">Jalur Pendaftaran / Beasiswa</label>
              <select 
                value={potonganJalur} 
                onChange={(e) => setPotonganJalur(Number(e.target.value))}
                className="w-full bg-green-800/80 border border-green-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
              >
                <option value={0}>Reguler (Biaya Standar)</option>
                <option value={-500000}>Potongan Jalur Prestasi (-Rp 500.000)</option>
                <option value={-2500000}>Penerima KIP Kuliah (Bebas UKT)</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-md border border-white/10 text-white p-8 rounded-2xl text-center flex flex-col justify-center h-full min-h-[250px]">
          <h4 className="text-green-200 font-medium mb-2">Total Estimasi Semester 1</h4>
          <div className={`text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md transition-opacity duration-300 ${isCalcAnimating ? 'opacity-0' : 'opacity-100'}`}>
            {formatRupiah(totalBiaya)}
          </div>
          <p className="text-xs text-green-300/70 mt-4 leading-relaxed px-4">
            *Berdasarkan sistem Uang Kuliah Tunggal (UKT). Sumbangan Penyelenggaraan Pendidikan (SPP) dapat diangsur sesuai kebijakan kampus.
          </p>
          <div className="mt-6 pt-6 border-t border-white/10">
            <Link href="/register" className="inline-block bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 shadow-lg">
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
