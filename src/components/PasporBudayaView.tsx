import React, { useState } from 'react';
import { Award, CheckCircle2, Star, Sparkles, BookOpen, RotateCcw, Printer, Share2 } from 'lucide-react';
import { sound } from '../utils/audio';
import { DATA_SUKU, DAFTAR_LENCANA } from '../data/budayaData';

interface PasporBudayaViewProps {
  studentName: string;
  onUpdateStudentName: (name: string) => void;
  learnedSukuIds: string[];
  bestQuizScore: { score: number; total: number } | null;
  onResetProgress: () => void;
  onMarkAllLearned: () => void;
  onSelectSuku: (sukuKey: string) => void;
}

export const PasporBudayaView: React.FC<PasporBudayaViewProps> = ({
  studentName,
  onUpdateStudentName,
  learnedSukuIds,
  bestQuizScore,
  onResetProgress,
  onMarkAllLearned,
  onSelectSuku,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(studentName);

  const sukuEntries = Object.entries(DATA_SUKU);
  const totalSuku = sukuEntries.length;
  const progressPercent = Math.round((learnedSukuIds.length / totalSuku) * 100);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    onUpdateStudentName(tempName.trim() || 'Penjelajah Cilik');
    setIsEditingName(false);
  };

  const handlePrintCertificate = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 text-white rounded-full text-xs font-bold mb-2">
              <span>🏅</span>
              <span>Buku Paspor & Penghargaan</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
              Paspor Budaya Nusantara
            </h1>
            <p className="text-sm text-amber-100 mt-1">
              Catatan perjalanan menjelajahi keindahan adat dan kebudayaan Indonesia!
            </p>
          </div>

          <button
            onClick={handlePrintCertificate}
            className="px-4 py-2.5 bg-white text-amber-900 font-extrabold text-xs rounded-xl shadow-sm hover:bg-amber-50 active:scale-95 transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Sertifikat</span>
          </button>
        </div>
      </div>

      {/* Student Identity Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200/90 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-red-500 text-white flex items-center justify-center text-3xl shadow-md">
              👦👧
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Nama Siswa / Penjelajah:
              </p>
              {isEditingName ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="px-3 py-1 border border-blue-400 rounded-lg text-sm font-bold text-slate-900 focus:outline-hidden"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg"
                  >
                    Simpan
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2 mt-0.5">
                  <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900">
                    {studentName}
                  </h2>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsEditingName(true);
                    }}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    (Ganti Nama)
                  </button>
                </div>
              )}
              <p className="text-xs text-slate-500 mt-0.5">
                Status: Siswa Pembelajar Budaya Indonesia 🇮🇩
              </p>
            </div>
          </div>

          {/* Quick stats badge */}
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80 w-full sm:w-auto text-center sm:text-right">
            <p className="text-xs font-bold text-amber-800">Progres Penjelajahan</p>
            <p className="font-display text-2xl font-black text-amber-950 tabular-nums">
              {learnedSukuIds.length} <span className="text-sm font-normal text-slate-500">/ {totalSuku} Suku</span>
            </p>
            <div className="w-full sm:w-40 bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
              <div
                className="bg-amber-500 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stempel Paspor Budaya (Cultural Stamp Collection) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              <span>Koleksi Stempel Suku Nusantara</span>
            </h3>
            <p className="text-xs text-slate-500">
              Buka setiap suku untuk mengecap stempelnya ke dalam paspormu!
            </p>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onMarkAllLearned();
            }}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 underline cursor-pointer hidden sm:inline"
          >
            Tandai Semua Selesai (Demo)
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 pt-2">
          {sukuEntries.map(([key, suku]) => {
            const isUnlocked = learnedSukuIds.includes(suku.id);

            return (
              <button
                key={key}
                onClick={() => {
                  sound.playClick();
                  onSelectSuku(key);
                }}
                className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between group ${
                  isUnlocked
                    ? 'bg-amber-50/50 border-amber-300 shadow-xs hover:scale-105'
                    : 'bg-slate-50/60 border-dashed border-slate-200 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 transition-transform group-hover:scale-110">
                  {isUnlocked ? (
                    <span className="filter drop-shadow-xs">{suku.ikon}</span>
                  ) : (
                    <span className="grayscale">❓</span>
                  )}
                </div>

                <div>
                  <p className="font-display font-bold text-xs text-slate-900">
                    Suku {suku.nama}
                  </p>
                  <p className="text-[10px] text-slate-500 line-clamp-1">
                    {suku.provinsi}
                  </p>
                </div>

                <div className="mt-3">
                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Tercap</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-slate-400">
                      Belum Dibaca
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lencana Prestasi (Badges) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
        <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500" />
          <span>Lencana Prestasi Budaya</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DAFTAR_LENCANA.map((lencana) => {
            // Determine if badge is unlocked
            let isUnlocked = false;
            if (lencana.id === 'lencana-mulai') {
              isUnlocked = learnedSukuIds.length >= 1;
            } else if (lencana.id === 'lencana-sahabat') {
              isUnlocked = learnedSukuIds.length >= 5;
            } else if (lencana.id === 'lencana-bhinneka') {
              isUnlocked = learnedSukuIds.length >= totalSuku;
            } else if (lencana.id === 'lencana-kuis-bintang') {
              isUnlocked = bestQuizScore ? (bestQuizScore.score / bestQuizScore.total) >= 0.7 : false;
            } else if (lencana.id === 'lencana-pakar-kuliner') {
              isUnlocked = learnedSukuIds.length >= 3 && (bestQuizScore?.score || 0) >= 3;
            }

            return (
              <div
                key={lencana.id}
                className={`p-4 rounded-2xl border-2 flex items-start gap-3.5 transition-all ${
                  isUnlocked
                    ? 'bg-amber-50/40 border-amber-300'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                    isUnlocked ? 'bg-amber-100 text-amber-700 shadow-xs' : 'bg-slate-200 grayscale'
                  }`}
                >
                  {lencana.ikon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-bold text-sm text-slate-900">
                      {lencana.judul}
                    </h4>
                    {isUnlocked ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        Terbuka ⭐
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-400">
                        Terkunci
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {lencana.deskripsi}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 italic">
                    Syarat: {lencana.syarat}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Printable Certificate Template (also looks great on screen) */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-3xl p-8 sm:p-10 border-4 border-amber-300 text-center shadow-md relative overflow-hidden">
        <div className="max-w-xl mx-auto space-y-4">
          <span className="text-4xl">🇮🇩</span>
          <p className="text-xs font-bold uppercase tracking-widest text-amber-800">
            Kementerian Pendidikan & Kebudayaan Cilik
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Sertifikat Penjelajah Cilik Nusantara
          </h2>
          <p className="text-xs text-slate-600 italic">
            Diberikan dengan penuh apresiasi kepada:
          </p>
          <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#1565C0] underline decoration-amber-400 decoration-wavy">
            {studentName}
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-md mx-auto">
            Atas semangat dan rasa cinta tanah air dalam mengenali keragaman pakaian adat, kuliner, kesenian tradisional, dan bahasa suku bangsa di Republik Indonesia.
          </p>

          <div className="pt-4 flex items-center justify-center gap-8 border-t border-amber-200 text-xs text-slate-600">
            <div>
              <p className="font-bold text-slate-900">Si Bhinneka</p>
              <p className="text-[10px] text-slate-400">Maskot Jelajah Budaya</p>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-amber-400 flex items-center justify-center text-xs font-black text-amber-700 bg-amber-100">
              RESMI
            </div>
            <div>
              <p className="font-bold text-slate-900">Indonesia Raya</p>
              <p className="text-[10px] text-slate-400">Sabang sampai Merauke</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reset progress button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => {
            if (window.confirm('Apakah kamu yakin ingin mereset catatan paspormu?')) {
              sound.playClick();
              onResetProgress();
            }
          }}
          className="text-xs text-slate-400 hover:text-red-600 underline flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Catatan Paspor</span>
        </button>
      </div>
    </div>
  );
};
