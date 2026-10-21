import React, { useState } from 'react';
import { Search, Gamepad2, CheckCircle2, ArrowRight, ArrowLeft, Filter } from 'lucide-react';
import { sound } from '../utils/audio';
import { DATA_SUKU } from '../data/budayaData';

interface SukuListViewProps {
  onSelectSuku: (sukuKey: string) => void;
  onOpenQuiz: () => void;
  onBackToHome: () => void;
  learnedSukuIds: string[];
}

export const SukuListView: React.FC<SukuListViewProps> = ({
  onSelectSuku,
  onOpenQuiz,
  onBackToHome,
  learnedSukuIds,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPulau, setSelectedPulau] = useState<string>('Semua');

  const sukuEntries = Object.entries(DATA_SUKU);

  const filteredSuku = sukuEntries.filter(([key, suku]) => {
    const matchesSearch =
      suku.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suku.provinsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suku.kuliner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suku.budaya.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPulau =
      selectedPulau === 'Semua' ||
      suku.pulau === selectedPulau ||
      (selectedPulau === 'Nusa Tenggara & Bali' && (suku.pulau === 'Nusa Tenggara' || suku.pulau === 'Bali')) ||
      (selectedPulau === 'Maluku & Papua' && (suku.pulau === 'Maluku' || suku.pulau === 'Papua'));

    return matchesSearch && matchesPulau;
  });

  const pulauOptions = [
    'Semua',
    'Jawa',
    'Sumatera',
    'Sulawesi',
    'Kalimantan',
    'Nusa Tenggara & Bali',
    'Maluku & Papua',
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header bar */}
      <div className="bg-[#1565C0] text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 text-amber-300 rounded-full text-xs font-bold mb-2">
              <span>🇮🇩</span>
              <span>Jelajah Keragaman</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
              Pilih Suku yang Ingin Kamu Kenali!
            </h1>
            <p className="text-sm text-blue-100 mt-1">
              Kenali pakaian adat, makanan khas, kesenian, dan fakta serunya!
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => {
                sound.playClick();
                onOpenQuiz();
              }}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-900 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Gamepad2 className="w-4 h-4 text-slate-950" />
              <span>Main Game Kuis!</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onBackToHome();
              }}
              className="px-3.5 py-2.5 bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="mt-6 relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari suku, nama provinsi, makanan (contoh: Kerak Telor, Coto, Sasando)..."
            className="w-full pl-11 pr-4 py-3 bg-white text-slate-900 rounded-xl placeholder:text-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-400 shadow-xs"
          />
        </div>
      </div>

      {/* Pulau Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 -mx-2 px-2 no-scrollbar">
        <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1 mr-1" />
        {pulauOptions.map((pulau) => (
          <button
            key={pulau}
            onClick={() => {
              sound.playClick();
              setSelectedPulau(pulau);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              selectedPulau === pulau
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {pulau}
          </button>
        ))}
      </div>

      {/* Grid of Culture Cards (faithfully matching Tkinter card design with enhancements) */}
      {filteredSuku.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
          <span className="text-4xl mb-3 block">🔍</span>
          <h3 className="font-display font-bold text-lg text-slate-800">
            Suku atau kata kunci tidak ditemukan
          </h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            Coba gunakan kata kunci lain seperti "Betawi", "Bugis", "Riau", "NTT", atau pilih filter "Semua".
          </p>
          <button
            onClick={() => {
              sound.playClick();
              setSearchTerm('');
              setSelectedPulau('Semua');
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tampilkan Semua Suku
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSuku.map(([key, suku]) => {
            const isLearned = learnedSukuIds.includes(suku.id);

            return (
              <div
                key={key}
                className="bg-white rounded-2xl border-2 transition-all hover:shadow-lg flex flex-col justify-between overflow-hidden group"
                style={{ borderColor: `${suku.warna}30` }}
              >
                {/* Top strip with suku color accent */}
                <div
                  className="h-2 w-full transition-all group-hover:h-3"
                  style={{ backgroundColor: suku.warna }}
                />

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header line of card */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-3xl p-1.5 rounded-xl bg-slate-50 group-hover:scale-110 transition-transform">
                          {suku.ikon}
                        </span>
                        <div>
                          <h2
                            className="font-display text-lg font-extrabold"
                            style={{ color: suku.warna }}
                          >
                            Suku {suku.nama}
                          </h2>
                          <p className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                            <span>📍</span>
                            <span>{suku.provinsi}</span>
                          </p>
                        </div>
                      </div>

                      {isLearned && (
                        <span
                          className="text-emerald-600 text-xs font-bold inline-flex items-center gap-1"
                          title="Sudah dipelajari"
                        >
                          <CheckCircle2 className="w-4 h-4 fill-emerald-100" />
                        </span>
                      )}
                    </div>

                    {/* Highlights preview */}
                    <div className="mt-4 space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-bold text-slate-700 shrink-0">👕 Pakaian:</span>
                        <span className="line-clamp-1">{suku.pakaian.replace('\n', ' & ')}</span>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-bold text-slate-700 shrink-0">🍲 Kuliner:</span>
                        <span className="line-clamp-1">{suku.kuliner.replace('\n', ' ')}</span>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-bold text-slate-700 shrink-0">🎭 Budaya:</span>
                        <span className="line-clamp-1">{suku.budaya.replace('\n', ' ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Button Action */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-slate-400">
                      Pulau {suku.pulau}
                    </span>
                    <button
                      onClick={() => {
                        sound.playClick();
                        onSelectSuku(key);
                      }}
                      style={{ backgroundColor: suku.warna }}
                      className="px-4 py-2 text-white font-extrabold text-xs rounded-xl shadow-xs hover:opacity-90 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>Lihat Detail</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom CTA to Quiz and Home */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 border-t border-slate-200">
        <button
          onClick={() => {
            sound.playClick();
            onOpenQuiz();
          }}
          className="w-full sm:w-auto px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <Gamepad2 className="w-5 h-5 text-amber-300" />
          <span>🎮 Main Game Kuis Menjodohkan!</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onBackToHome();
          }}
          className="w-full sm:w-auto px-5 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Home</span>
        </button>
      </div>
    </div>
  );
};
