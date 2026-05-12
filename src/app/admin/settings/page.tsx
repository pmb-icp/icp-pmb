"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Settings, Save, Calendar, Users, DollarSign, Clock } from "lucide-react";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Default state settings
  const [settings, setSettings] = useState({
    activeWave: "Gelombang 1",
    startDate: "2026-02-01",
    endDate: "2026-04-30",
    quota: 500,
    registrationFee: 250000,
    tuitionFee: 2500000,
    examDate: "2026-05-10",
    announcementDate: "2026-05-15",
    isRegistrationOpen: true
  });

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "system_settings", "pmb_config");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings(docSnap.data() as any);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let parsedValue: any = value;
    if (type === 'number') parsedValue = Number(value);
    if (type === 'checkbox') parsedValue = (e.target as HTMLInputElement).checked;

    setSettings(prev => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, "system_settings", "pmb_config"), settings);
      alert("Pengaturan berhasil disimpan!");
    } catch (error: any) {
      console.error("Error saving settings:", error);
      if (error.code === 'permission-denied') {
        alert("Akses ditolak: Anda perlu menambahkan Rules untuk tabel 'system_settings'.");
      } else {
        alert("Gagal menyimpan pengaturan.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20 text-slate-500">Memuat pengaturan...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Settings className="w-6 h-6" />
            Pengaturan PMB
          </h1>
          <p className="text-slate-500 mt-1">Kelola jadwal, gelombang, kuota, dan biaya pendaftaran.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-xl font-medium transition shadow-sm disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Gelombang & Status */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-600" />
            Status Gelombang
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Gelombang Aktif</label>
              <select 
                name="activeWave" 
                value={settings.activeWave} 
                onChange={handleChange}
                className="w-full border-slate-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 bg-slate-50 p-2.5 border"
              >
                <option value="Gelombang 1">Gelombang 1</option>
                <option value="Gelombang 2">Gelombang 2</option>
                <option value="Gelombang 3">Gelombang 3</option>
              </select>
            </div>
            
            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <input 
                type="checkbox" 
                id="isRegistrationOpen"
                name="isRegistrationOpen"
                checked={settings.isRegistrationOpen}
                onChange={handleChange}
                className="w-5 h-5 text-green-600 border-slate-300 rounded focus:ring-green-500 cursor-pointer"
              />
              <label htmlFor="isRegistrationOpen" className="font-semibold text-slate-900 cursor-pointer">
                Pendaftaran Sedang Dibuka
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Buka</label>
                <input 
                  type="date" 
                  name="startDate" 
                  value={settings.startDate} 
                  onChange={handleChange}
                  className="w-full border-slate-300 rounded-lg p-2.5 border text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Tutup</label>
                <input 
                  type="date" 
                  name="endDate" 
                  value={settings.endDate} 
                  onChange={handleChange}
                  className="w-full border-slate-300 rounded-lg p-2.5 border text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Biaya & Kuota */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            Biaya & Kuota
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Kuota Mahasiswa Baru</label>
              <div className="relative">
                <Users className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
                <input 
                  type="number" 
                  name="quota" 
                  value={settings.quota} 
                  onChange={handleChange}
                  className="w-full pl-10 border-slate-300 rounded-lg p-2.5 border"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Biaya Pendaftaran Awal (Rp)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 font-bold text-slate-500">Rp</span>
                <input 
                  type="number" 
                  name="registrationFee" 
                  value={settings.registrationFee} 
                  onChange={handleChange}
                  className="w-full pl-10 border-slate-300 rounded-lg p-2.5 border"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Uang Kuliah Tunggal / UKT (Rp)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 font-bold text-slate-500">Rp</span>
                <input 
                  type="number" 
                  name="tuitionFee" 
                  value={settings.tuitionFee} 
                  onChange={handleChange}
                  className="w-full pl-10 border-slate-300 rounded-lg p-2.5 border"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Jadwal Seleksi */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-600" />
            Jadwal Seleksi & Ujian
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Tanggal Tes Tulis / CBT</label>
              <input 
                type="date" 
                name="examDate" 
                value={settings.examDate} 
                onChange={handleChange}
                className="w-full border-slate-300 rounded-lg p-2.5 border"
              />
              <p className="text-xs text-slate-500 mt-2">Akan dicetak di Kartu Ujian pendaftar.</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Tanggal Pengumuman Kelulusan</label>
              <input 
                type="date" 
                name="announcementDate" 
                value={settings.announcementDate} 
                onChange={handleChange}
                className="w-full border-slate-300 rounded-lg p-2.5 border"
              />
              <p className="text-xs text-slate-500 mt-2">Jadwal tayang hasil kelulusan di dashboard peserta.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
