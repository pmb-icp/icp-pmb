"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, CheckCircle, ChevronRight, ChevronLeft } from "lucide-react";

export default function FormulirPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              currentStep === step 
                ? "bg-green-600 text-white ring-4 ring-green-100" 
                : currentStep > step 
                  ? "bg-emerald-500 text-white" 
                  : "bg-slate-100 text-slate-400 border border-slate-200"
            }`}>
              {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
            </div>
            {step < totalSteps && (
              <div className={`w-12 sm:w-24 h-1 mx-2 rounded ${
                currentStep > step ? "bg-emerald-500" : "bg-slate-200"
              }`}></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition font-medium">
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Dashboard
          </Link>
          <span className="text-sm font-medium text-slate-500">Draft tersimpan otomatis</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10">
          <h1 className="text-2xl font-bold text-slate-900 mb-2 text-center">Pengisian Formulir Pendaftaran</h1>
          <p className="text-slate-500 text-center mb-8">Lengkapi data diri Anda dengan benar sesuai dokumen resmi.</p>

          {renderStepIndicator()}

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* STEP 1: Biodata */}
            {currentStep === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-lg font-bold border-b pb-2 mb-6">1. Biodata Pribadi</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                    <input type="text" className="w-full border-slate-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600 py-2.5 px-3 border" placeholder="Sesuai Ijazah" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">NIK (Nomor Induk Kependudukan)</label>
                    <input type="text" className="w-full border-slate-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600 py-2.5 px-3 border" placeholder="16 Digit NIK" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tempat Lahir</label>
                    <input type="text" className="w-full border-slate-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600 py-2.5 px-3 border" placeholder="Kota Lahir" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Lahir</label>
                    <input type="date" className="w-full border-slate-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600 py-2.5 px-3 border text-slate-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Jenis Kelamin</label>
                    <select className="w-full border-slate-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600 py-2.5 px-3 border bg-white">
                      <option value="">Pilih...</option>
                      <option value="L">Laki-laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Agama</label>
                    <select className="w-full border-slate-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600 py-2.5 px-3 border bg-white">
                      <option value="">Pilih...</option>
                      <option value="Islam">Islam</option>
                      <option value="Kristen">Kristen</option>
                      <option value="Katolik">Katolik</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Buddha">Buddha</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Alamat Lengkap</label>
                    <textarea rows={3} className="w-full border-slate-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600 py-2.5 px-3 border" placeholder="Sesuai KTP"></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Pendidikan */}
            {currentStep === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-lg font-bold border-b pb-2 mb-6">2. Data Pendidikan Terakhir</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">NISN</label>
                    <input type="text" className="w-full border-slate-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600 py-2.5 px-3 border" placeholder="Nomor Induk Siswa Nasional" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Asal Sekolah</label>
                    <input type="text" className="w-full border-slate-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600 py-2.5 px-3 border" placeholder="Nama SMA/SMK/MA" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Jurusan di Sekolah</label>
                    <input type="text" className="w-full border-slate-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600 py-2.5 px-3 border" placeholder="IPA/IPS/RPL/Akuntansi dll" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Tahun Lulus</label>
                      <input type="number" className="w-full border-slate-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600 py-2.5 px-3 border" placeholder="2024" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Nilai Rata-rata</label>
                      <input type="number" step="0.1" className="w-full border-slate-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600 py-2.5 px-3 border" placeholder="85.5" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Orang Tua */}
            {currentStep === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-lg font-bold border-b pb-2 mb-6">3. Data Orang Tua/Wali</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama Ayah</label>
                    <input type="text" className="w-full border-slate-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600 py-2.5 px-3 border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Pekerjaan Ayah</label>
                    <input type="text" className="w-full border-slate-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600 py-2.5 px-3 border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama Ibu</label>
                    <input type="text" className="w-full border-slate-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600 py-2.5 px-3 border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Pekerjaan Ibu</label>
                    <input type="text" className="w-full border-slate-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600 py-2.5 px-3 border" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Penghasilan Orang Tua (Per Bulan)</label>
                    <select className="w-full md:w-1/2 border-slate-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600 py-2.5 px-3 border bg-white">
                      <option value="">Pilih range penghasilan...</option>
                      <option value="<1jt">Kurang dari Rp 1.000.000</option>
                      <option value="1-3jt">Rp 1.000.000 - Rp 3.000.000</option>
                      <option value="3-5jt">Rp 3.000.000 - Rp 5.000.000</option>
                      <option value=">5jt">Lebih dari Rp 5.000.000</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Program Studi */}
            {currentStep === 4 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-lg font-bold border-b pb-2 mb-6">4. Pilihan Program Studi</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Jalur Pendaftaran</label>
                    <select className="w-full md:w-1/2 border-slate-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600 py-2.5 px-3 border bg-white">
                      <option value="">Pilih jalur...</option>
                      <option value="reguler">Reguler</option>
                      <option value="prestasi">Jalur Prestasi</option>
                      <option value="kip">KIP Kuliah</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                      <label className="block text-sm font-bold text-green-900 mb-2">Pilihan Program Studi 1</label>
                      <select className="w-full border-green-200 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600 py-2.5 px-3 border bg-white">
                        <option value="">Pilih prodi prioritas...</option>
                        <option value="S1-TI">S1 Teknik Informatika</option>
                        <option value="S1-SI">S1 Sistem Informasi</option>
                        <option value="S1-M">S1 Manajemen</option>
                        <option value="S1-A">S1 Akuntansi</option>
                      </select>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <label className="block text-sm font-bold text-slate-700 mb-2">Pilihan Program Studi 2</label>
                      <select className="w-full border-slate-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500 py-2.5 px-3 border bg-white">
                        <option value="">Pilih prodi cadangan...</option>
                        <option value="S1-TI">S1 Teknik Informatika</option>
                        <option value="S1-SI">S1 Sistem Informasi</option>
                        <option value="S1-M">S1 Manajemen</option>
                        <option value="S1-A">S1 Akuntansi</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="pt-8 border-t flex items-center justify-between mt-8">
              <button
                type="button"
                onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                className={`flex items-center gap-2 px-6 py-2.5 border border-slate-300 rounded-md text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition ${currentStep === 1 ? "invisible" : ""}`}
              >
                <ChevronLeft className="w-4 h-4" />
                Sebelumnya
              </button>
              
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => Math.min(totalSteps, prev + 1))}
                  className="flex items-center gap-2 px-6 py-2.5 border border-transparent rounded-md text-sm font-medium text-white bg-green-700 hover:bg-green-800 transition"
                >
                  Selanjutnya
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center gap-2 px-8 py-2.5 border border-transparent rounded-md text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-md shadow-emerald-500/20"
                >
                  <Save className="w-4 h-4" />
                  Simpan Final
                </button>
              )}
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
