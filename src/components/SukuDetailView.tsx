import React, { useState } from 'react';
import {
  ArrowLeft,
  Gamepad2,
  Volume2,
  VolumeX,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Home,
  Music,
} from 'lucide-react';
import { sound } from '../utils/audio';
import { speakIndonesian, stopSpeaking } from '../utils/speech';
import { DATA_SUKU, SukuBudaya } from '../data/budayaData';

interface SukuDetailViewProps {
  sukuKey: string;
  onBackToMenu: () => void;
  onOpenQuiz: () => void;
  onSelectSuku: (sukuKey: string) => void;
  isLearned: boolean;
  onToggleLearned: (sukuId: string) => void;
}

export const SukuDetailView: React.FC<SukuDetailViewProps> = ({
  sukuKey,
  onBackToMenu,
  onOpenQuiz,
  onSelectSuku,
  isLearned,
  onToggleLearned,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [quickAnswered, setQuickAnswered] = useState<boolean | null>(null);

  const suku: SukuBudaya = DATA_SUKU[sukuKey] || DATA_SUKU['Betawi'];
  const allKeys = Object.keys(DATA_SUKU);
  const currentIndex = allKeys.indexOf(sukuKey);
  const prevKey = currentIndex > 0 ? allKeys[currentIndex - 1] : allKeys[allKeys.length - 1];
  const nextKey = currentIndex < allKeys.length - 1 ? allKeys[currentIndex + 1] : allKeys[0];

  const handleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    sound.playClick();
    const narrative = `Suku ${suku.nama}. Dari provinsi ${suku.provinsi}. Pakaian Adat: ${suku.pakaian.replace(/\n/g, ', ')}. Kuliner Khas: ${suku.kuliner.replace(/\n/g, ', ')}. Budaya dan Seni: ${suku.budaya.replace(/\n/g, ', ')}. Fakta Menarik: ${suku.fakta}`;

    setIsSpeaking(true);
    const spoken = speakIndonesian(narrative, () => {
      setIsSpeaking(false);
    });

    if (!spoken) {
      setIsSpeaking(false);
    }
  };

  const handleTogglePassport = () => {
    sound.playClick();
    onToggleLearned(suku.id);
    if (!isLearned) {
      sound.playCorrect();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Top Header Card in Suku's signature color */}
      <div
        className="rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden transition-all"
        style={{ backgroundColor: suku.warna }}
      >
        <div className="absolute right-4 top-4 text-6xl opacity-20 pointer-events-none">
          {suku.ikon}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <button
            onClick={() => {
              stopSpeaking();
              sound.playClick();
              onBackToMenu();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Menu</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeech}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isSpeaking ? 'bg-amber-400 text-slate-900 shadow-md animate-pulse' : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
              title="Dengarkan pembacaan teks"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeaking ? 'Berhenti Suara' : 'Dengarkan Fakta'}</span>
            </button>

            <button
              onClick={handleTogglePassport}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isLearned
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-white text-slate-800 hover:bg-slate-100 shadow-sm'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isLearned ? 'Tersimpan di Paspor ⭐' : 'Tandai Sudah Dipelajari'}</span>
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <div className="inline-block px-2.5 py-0.5 rounded-md bg-white/20 text-xs font-semibold tracking-wide">
            {suku.salam}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight">
            Suku {suku.nama}
          </h1>
          <p className="text-sm sm:text-base font-medium opacity-90 flex items-center gap-1.5">
            <span>📍 Provinsi: {suku.provinsi}</span>
            <span>·</span>
            <span>Pulau {suku.pulau}</span>
          </p>
        </div>
      </div>

      {/* 4 Core Cultural Sections (matching Tkinter) */}
      <div className="space-y-4">
        {/* Section 1: Pakaian Adat */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-2xl">👕</span>
            <h2 className="font-display font-extrabold text-lg sm:text-xl" style={{ color: suku.warna }}>
              Pakaian Adat
            </h2>
          </div>
          <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100">
            <p className="font-bold text-slate-900 text-sm sm:text-base whitespace-pre-line leading-relaxed">
              {suku.pakaian}
            </p>
            {suku.pakaianDetail && (
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed border-t border-slate-200/60 pt-2">
                {suku.pakaianDetail}
              </p>
            )}
          </div>
        </div>

        {/* Section 2: Kuliner Khas */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-2xl">🍲</span>
            <h2 className="font-display font-extrabold text-lg sm:text-xl" style={{ color: suku.warna }}>
              Kuliner Khas
            </h2>
          </div>
          <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100">
            <p className="font-bold text-slate-900 text-sm sm:text-base whitespace-pre-line leading-relaxed">
              {suku.kuliner}
            </p>
            {suku.kulinerDetail && (
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed border-t border-slate-200/60 pt-2">
                {suku.kulinerDetail}
              </p>
            )}
          </div>
        </div>

        {/* Section 3: Budaya & Seni */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-2xl">🎭</span>
            <h2 className="font-display font-extrabold text-lg sm:text-xl" style={{ color: suku.warna }}>
              Budaya & Seni
            </h2>
          </div>
          <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100">
            <p className="font-bold text-slate-900 text-sm sm:text-base whitespace-pre-line leading-relaxed">
              {suku.budaya}
            </p>
            {suku.budayaDetail && (
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed border-t border-slate-200/60 pt-2">
                {suku.budayaDetail}
              </p>
            )}
          </div>
        </div>

        {/* Section 4: Fakta Menarik */}
        <div className="bg-amber-50/80 rounded-2xl p-5 sm:p-6 border border-amber-200/80 shadow-xs">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-2xl">💡</span>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-amber-900">
              Fakta Menarik
            </h2>
          </div>
          <div className="bg-white/80 p-4 rounded-xl border border-amber-200/60">
            <p className="text-slate-800 text-sm sm:text-base font-semibold leading-relaxed">
              "{suku.fakta}"
            </p>
          </div>
        </div>

        {/* Quick Cultural Architecture & Instruments Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">Rumah Adat</p>
              <p className="font-bold text-slate-900 text-sm">{suku.rumahAdat}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">Alat Musik Tradisional</p>
              <p className="font-bold text-slate-900 text-sm">{suku.alatMusik}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Comprehension Check for Kids */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200">
        <h3 className="font-display font-bold text-sm text-slate-800 mb-2 flex items-center gap-2">
          <span>🎯</span>
          <span>Tantangan Cepat: Di mana provinsi asal Suku {suku.nama}?</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {[suku.provinsi, 'Sumatera Utara', 'Jawa Timur', 'Kalimantan Barat']
            // unique options
            .filter((v, i, a) => a.indexOf(v) === i)
            .sort()
            .map((prov) => {
              const isCorrect = prov === suku.provinsi;
              const hasPicked = quickAnswered !== null;
              return (
                <button
                  key={prov}
                  disabled={hasPicked}
                  onClick={() => {
                    if (isCorrect) {
                      sound.playCorrect();
                      setQuickAnswered(true);
                    } else {
                      sound.playWrong();
                      setQuickAnswered(false);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    !hasPicked
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      : isCorrect
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-400 opacity-60'
                  }`}
                >
                  {prov}
                </button>
              );
            })}
        </div>
        {quickAnswered === true && (
          <p className="text-xs text-emerald-700 font-bold mt-2 flex items-center gap-1">
            <span>⭐ Hebat! Jawabanmu tepat sekali!</span>
          </p>
        )}
        {quickAnswered === false && (
          <p className="text-xs text-red-600 font-bold mt-2">
            😊 Hampir tepat! Jawaban yang benar adalah {suku.provinsi}.
          </p>
        )}
      </div>

      {/* Prev / Next Suku Pager & Main Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        {/* Prev & Next Suku */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={() => {
              stopSpeaking();
              sound.playClick();
              setQuickAnswered(null);
              onSelectSuku(prevKey);
            }}
            className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Suku Sebelumnya</span>
          </button>
          <button
            onClick={() => {
              stopSpeaking();
              sound.playClick();
              setQuickAnswered(null);
              onSelectSuku(nextKey);
            }}
            className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Suku Berikutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Action to Menu & Quiz (matching Tkinter) */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => {
              stopSpeaking();
              sound.playClick();
              onBackToMenu();
            }}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-600 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            ← Kembali ke Menu
          </button>
          <button
            onClick={() => {
              stopSpeaking();
              sound.playClick();
              onOpenQuiz();
            }}
            className="flex-1 sm:flex-none px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Gamepad2 className="w-4 h-4 text-amber-300" />
            <span>🎮 Main Kuis</span>
          </button>
        </div>
      </div>
    </div>
  );
};
