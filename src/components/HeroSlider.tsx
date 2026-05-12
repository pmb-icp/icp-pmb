"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, PlayCircle } from 'lucide-react';

const slides = [
  {
    title: "Membangun Generasi Unggul & Berkarakter",
    highlight: "ICP",
    desc: "Institut Cokroaminoto Pinrang membekali Anda dengan kompetensi akademik dan karakter profesional untuk memenangkan persaingan global.",
    image: "/hero-students.png",
    badge: "Pendaftaran T.A 2026/2027 Dibuka"
  },
  {
    title: "Fasilitas Kampus Modern & Terintegrasi",
    highlight: "Terbaik",
    desc: "Dukung produktivitas belajar Anda dengan fasilitas ruang kelas ber-AC, laboratorium modern, dan perpustakaan digital interaktif.",
    image: "/campus-facility.png",
    badge: "Lingkungan Belajar Ideal"
  },
  {
    title: "Program Beasiswa KIP Kuliah & Prestasi",
    highlight: "Tersedia",
    desc: "Kami menjamin bahwa masalah finansial tidak akan menjadi halangan bagi siswa berprestasi untuk menggapai cita-cita mereka.",
    image: "/hero-students.png", // Using same image as placeholder, can be changed later
    badge: "Pendidikan Untuk Semua"
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-white overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 rounded-l-[100px] -z-10 transform translate-x-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Text Content */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-none relative z-10 transition-all duration-500 ease-in-out">
            <div key={currentSlide} className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-sm mb-6 border border-green-200 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                {slides[currentSlide].badge}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                {slides[currentSlide].title.split(slides[currentSlide].highlight)[0]} 
                <span className="text-green-700 relative whitespace-nowrap">
                  {slides[currentSlide].highlight}
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0,10 Q50,20 100,10" stroke="#15803d" strokeWidth="4" fill="none" /></svg>
                </span>
                {slides[currentSlide].title.split(slides[currentSlide].highlight)[1]}
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
                {slides[currentSlide].desc}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register" className="inline-flex justify-center items-center gap-2 bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-800 transition-all transform hover:scale-105 shadow-lg shadow-green-700/30">
                  Daftar Sekarang <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/panduan" className="inline-flex justify-center items-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-xl font-bold text-lg border-2 border-slate-200 hover:border-green-700 hover:text-green-700 transition-all">
                  <PlayCircle className="w-5 h-5" /> Cara Daftar
                </Link>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-3 mt-12">
              {slides.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 transition-all duration-300 rounded-full ${idx === currentSlide ? 'w-10 bg-green-600' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Image Slider */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-none relative perspective-1000">
            <div className="absolute -inset-4 bg-gradient-to-tr from-green-200 to-yellow-100 rounded-[2rem] blur-2xl opacity-60 -z-10"></div>
            
            <div className="relative h-[400px] lg:h-[500px] w-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white transform transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
              {slides.map((slide, idx) => (
                <img 
                  key={idx}
                  src={slide.image} 
                  alt={slide.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                />
              ))}
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-xl border border-white/50 transform translate-y-0 transition-transform duration-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900 mb-1">Penerimaan T.A 2026/2027</p>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <p className="text-xs text-slate-500 font-medium">Sistem Online Aktif</p>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-700 font-black tracking-tighter text-xl border border-green-100">
                      ICP
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* ITB-style Decorative Element */}
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
