import React from 'react';
import { Compass, Gamepad2, MapPin, Award, Sparkles, BookOpen, Heart, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';
import { DATA_SUKU } from '../data/budayaData';

interface HomeViewProps {
  onStartAdventure: () => void;
  onOpenQuiz: () => void;
  onOpenMap: () => void;
  onOpenPassport: () => void;
  onSelectSuku: (sukuKey: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartAdventure,
  onOpenQuiz,
  onOpenMap,
  onOpenPassport,
  onSelectSuku,
}) => {
  const sukuList = Object.entries(DATA_SUKU);

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-b from-[#1565C0] to-[#0D47A1] text-white p-6 sm:p-10 shadow-lg">
        {/* Subtle decorative background shapes */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -left-12 -top-12 w-48 h-48 rounded-full bg-amber-400/20 blur-2xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-amber-300 text-xs sm:text-sm font-bold tracking-wide backdrop-blur-xs">
            <span>🇮🇩</span>
            <span>Untuk Siswa SD Kelas 3–6 & Pembelajar Merdeka</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Jelajah Budaya Nusantara
          </h1>

          <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Halo Teman-teman! Ayo kenali identitas masyarakat dan kebudayaan Indonesia yang kaya raya. Dari Sabang sampai Merauke, penuh warna dan keindahan!
          </p>

          {/* Maskot Card: Si Bhinneka */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 text-left">
            <span className="text-3xl sm:text-4xl">👦👧</span>
            <div>
              <p className="font-bold text-amber-300 text-sm sm:text-base">
                Si Bhinneka siap menemani petualanganmu!
              </p>
              <p className="text-xs text-blue-100">
                Kumpulkan stempel budaya dan raih lencana penjelajah cilik
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                sound.playClick();
                onStartAdventure();
              }}
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-900 font-extrabold text-base rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-5 h-5 text-slate-950" />
              <span>🚀 Mulai Petualangan!</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenQuiz();
              }}
              className="px-6 py-3.5 bg-white/20 hover:bg-white/30 active:scale-95 text-white font-extrabold text-base rounded-xl border border-white/30 backdrop-blur-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Gamepad2 className="w-5 h-5 text-amber-300" />
              <span>🎮 Main Kuis Menjodohkan</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3 Main Adventure Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          onClick={() => {
            sound.playClick();
            onStartAdventure();
          }}
          className="group bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              👕
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
              Katalog Suku Bangsa
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Pelajari busana adat, makanan khas, kesenian tradisional, dan fakta unik dari berbagai suku bangsa di Nusantara.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-red-600">
            <span>Jelajahi 10 Suku Budaya</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div
          onClick={() => {
            sound.playClick();
            onOpenMap();
          }}
          className="group bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              🗺️
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
              Peta Interaktif Kepulauan
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Klik pulau-pulau besar Indonesia dari Sumatera hingga Papua untuk melihat sebaran ragam budaya setempat.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
            <span>Buka Peta Indonesia</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div
          onClick={() => {
            sound.playClick();
            onOpenQuiz();
          }}
          className="group bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              🎯
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
              Kuis Menjodohkan
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Uji daya ingatmu! Jodohkan benda budaya seperti Sasando, Kerak Telor, dan Baju Bodo dengan keterangannya.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600">
            <span>Mulai Uji Skor</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </section>

      {/* Featured Suku Showcase Carousel / Mini Grid */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
              Pilihan Suku Populer Hari Ini
            </h2>
            <p className="text-sm text-slate-500">
              Klik salah satu suku untuk mulai membaca cerita dan keunikannya
            </p>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onStartAdventure();
            }}
            className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Lihat Semua Suku</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {sukuList.slice(0, 5).map(([key, item]) => (
            <button
              key={key}
              onClick={() => {
                sound.playClick();
                onSelectSuku(key);
              }}
              style={{ borderColor: `${item.warna}40` }}
              className="p-3.5 rounded-xl border bg-slate-50/50 hover:bg-white hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">
                  {item.ikon}
                </span>
                <p className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                  {item.nama}
                </p>
                <p className="text-xs text-slate-500 line-clamp-1">
                  {item.provinsi}
                </p>
              </div>
              <div className="mt-3 text-[11px] font-semibold flex items-center justify-between text-slate-400 group-hover:text-blue-600">
                <span>Detail</span>
                <span>→</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Edu Wisdom Footer Banner */}
      <section className="p-6 rounded-2xl bg-amber-50 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="text-3xl">🦅</span>
          <div>
            <h4 className="font-display font-bold text-amber-950 text-base">
              Bhinneka Tunggal Ika
            </h4>
            <p className="text-xs sm:text-sm text-amber-800">
              "Berbeda-beda tetapi tetap satu jua" — Semboyan luhur bangsa Indonesia yang mengajarkan toleransi dan cinta tanah air.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            sound.playClick();
            onOpenPassport();
          }}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0"
        >
          Lihat Paspor Budayamu 🏅
        </button>
      </section>
    </div>
  );
};
