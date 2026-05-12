"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Settings, Save, Calendar, Users, DollarSign, Clock, ShieldCheck, Search, Loader2 } from "lucide-react";

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

  const [searchEmail, setSearchEmail] = useState("");
  const [searchingUser, setSearchingUser] = useState(false);
  const [foundUser, setFoundUser] = useState<any>(null);
  const [searchError, setSearchError] = useState("");

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

  const handleSearchUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchEmail.trim()) return;

    setSearchingUser(true);
    setSearchError("");
    setFoundUser(null);

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", searchEmail.trim()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setSearchError("Pengguna dengan email tersebut tidak ditemukan. Pastikan mereka sudah mendaftar.");
      } else {
        const userData = querySnapshot.docs[0].data();
        setFoundUser(userData);
      }
    } catch (error) {
      console.error("Error searching user:", error);
      setSearchError("Gagal mencari pengguna.");
    } finally {
      setSearchingUser(false);
    }
  };

  const handleChangeRole = async (newRole: string) => {
    if (!foundUser) return;
    
    try {
      await updateDoc(doc(db, "users", foundUser.uid), {
        role: newRole
      });
      setFoundUser({ ...foundUser, role: newRole });
      alert(`Berhasil! Akses pengguna diubah menjadi: ${newRole.toUpperCase()}`);
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Gagal mengubah hak akses.");
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

        {/* Manajemen Admin */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            Manajemen Akses Admin
          </h2>
          <p className="text-sm text-slate-500 mb-6">Angkat staf kampus menjadi Admin agar mereka bisa mengakses dasbor ini.</p>
          
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <form onSubmit={handleSearchUser} className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
                <input 
                  type="email" 
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  placeholder="Masukkan email yang sudah terdaftar..." 
                  className="w-full pl-10 border-slate-300 rounded-lg p-2.5 border"
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={searchingUser}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition disabled:opacity-50"
              >
                {searchingUser ? <Loader2 className="w-5 h-5 animate-spin" /> : "Cari Akun"}
              </button>
            </form>

            {searchError && <p className="text-red-500 text-sm mb-4">{searchError}</p>}

            {foundUser && (
              <div className="bg-white border border-green-200 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-900">{foundUser.name || "Tanpa Nama"}</h3>
                  <p className="text-slate-500 text-sm">{foundUser.email}</p>
                  <p className="text-xs mt-2">
                    Status saat ini: <span className={`font-bold uppercase ${foundUser.role === 'admin' ? 'text-green-600' : 'text-slate-600'}`}>{foundUser.role}</span>
                  </p>
                </div>
                
                <div className="flex gap-3 w-full md:w-auto">
                  {foundUser.role === 'admin' ? (
                    <button 
                      onClick={() => handleChangeRole('applicant')}
                      className="w-full md:w-auto bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition"
                    >
                      Cabut Akses Admin
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleChangeRole('admin')}
                      className="w-full md:w-auto bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition"
                    >
                      Jadikan Admin
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
