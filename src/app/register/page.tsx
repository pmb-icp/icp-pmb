"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Lock, User, Phone } from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Password tidak cocok!");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Save user profile to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: "applicant",
        createdAt: new Date()
      });

      // Save initial applicant status
      await setDoc(doc(db, "applicants", user.uid), {
        uid: user.uid,
        registrationNumber: `PMB${new Date().getFullYear()}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        status: "draft",
        progress: {
          biodata: false,
          dokumen: false,
          pembayaran: false
        }
      });

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Gagal membuat akun.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
        <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition font-medium">
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Beranda
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md mt-10 sm:mt-0">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center border border-green-100">
            <Image src="/logo.png" alt="Logo ICP" width={56} height={56} className="object-contain" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Buat Akun PMB Baru
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-medium text-green-700 hover:text-green-600 transition">
            Masuk di sini
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-slate-100">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form className="space-y-5" onSubmit={handleRegister}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Nama Lengkap Sesuai Ijazah
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="focus:ring-green-600 focus:border-green-600 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-2.5 border"
                  placeholder="Nama Lengkap"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Alamat Email Aktif
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="focus:ring-green-600 focus:border-green-600 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-2.5 border"
                  placeholder="anda@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                Nomor WhatsApp
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="focus:ring-green-600 focus:border-green-600 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-2.5 border"
                  placeholder="081234567890"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="focus:ring-green-600 focus:border-green-600 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-2.5 border"
                  placeholder="Minimal 8 karakter"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
                Konfirmasi Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="focus:ring-green-600 focus:border-green-600 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-2.5 border"
                  placeholder="Ulangi password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-colors disabled:bg-green-400"
              >
                {loading ? "Memproses..." : "Daftar Akun"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
