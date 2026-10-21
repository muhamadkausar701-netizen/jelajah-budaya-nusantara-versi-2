import React, { useState } from 'react';
import { MapPin, Compass, ArrowRight, ArrowLeft, Info, BookOpen } from 'lucide-react';
import { sound } from '../utils/audio';
import { DATA_SUKU, SukuBudaya } from '../data/budayaData';

interface PetaNusantaraViewProps {
  onSelectSuku: (sukuKey: string) => void;
  onBackToMenu: () => void;
}

interface IslandData {
  id: string;
  nama: string;
  julukan: string;
  warna: string;
  deskripsi: string;
  sukuList: string[]; // keys in DATA_SUKU
  faktaGeografi: string;
}

const ISLANDS: IslandData[] = [
  {
    id: 'sumatera',
    nama: 'Pulau Sumatera',
    julukan: 'Pulau Emas (Swarnadwipa)',
    warna: '#43A047',
    deskripsi: 'Pulau terbesar keenam di dunia, terkenal dengan kekayaan rempah, Danau Toba, dan hutan hujan tropis.',
    sukuList: ['Melayu Riau', 'Minangkabau'],
    faktaGeografi: 'Memiliki pegunungan Bukit Barisan yang membentang dari Aceh hingga Lampung sepanjang 1.700 km!'
  },
  {
    id: 'jawa',
    nama: 'Pulau Jawa',
    julukan: 'Jawa Dwipa',
    warna: '#E53935',
    deskripsi: 'Pusat peradaban dan ibukota Nusantara, kaya dengan peninggalan keraton dan mahakarya batik dunia.',
    sukuList: ['Betawi', 'Jawa'],
    faktaGeografi: 'Pulau dengan gunung berapi terbanyak di Indonesia dan penduduk paling padat!'
  },
  {
    id: 'kalimantan',
    nama: 'Pulau Kalimantan',
    julukan: 'Pulau Seribu Sungai (Borneo)',
    warna: '#C2185B',
    deskripsi: 'Paru-paru dunia dengan hutan hujan purba, rumah adat Betang, dan keanekaragaman flora fauna langka.',
    sukuList: ['Dayak'],
    faktaGeografi: 'Dilewati garis khatulistiwa persis di Kota Pontianak, dan merupakan pulau terbesar ketiga di dunia!'
  },
  {
    id: 'sulawesi',
    nama: 'Pulau Sulawesi',
    julukan: 'Pulau Celebes',
    warna: '#F9A825',
    deskripsi: 'Pulau berbentuk huruf K yang mempesona, terkenal dengan tradisi pelaut ulung dan keindahan bawah laut.',
    sukuList: ['Bugis/Makassar'],
    faktaGeografi: 'Bentuk unik empat semenanjungnya terbentuk dari pergeseran lempeng bumi jutaan tahun silam!'
  },
  {
    id: 'bali-nusra',
    nama: 'Bali & Kepulauan Nusa Tenggara',
    julukan: 'Kepulauan Sunda Kecil',
    warna: '#00897B',
    deskripsi: 'Gugusan pulau eksotis dengan keagungan budaya seni tari, alat musik Sasando, dan tenun ikat indah.',
    sukuList: ['Bali', 'Rote'],
    faktaGeografi: 'Dipisahkan oleh Garis Wallace di Selat Lombok, yang membedakan fauna tipe Asia dan tipe peralihan!'
  },
  {
    id: 'maluku-papua',
    nama: 'Kepulauan Maluku & Tanah Papua',
    julukan: 'Kepulauan Rempah & Mutiara Hitam',
    warna: '#1E88E5',
    deskripsi: 'Kawasan timur Indonesia yang kaya rempah pala dan cengkeh, serta hutan belantara Papua dengan puncak bersalju.',
    sukuList: ['Ambon', 'Asmat'],
    faktaGeografi: 'Di Papua terdapat Puncak Jaya (Carstensz Pyramid), puncak tertinggi di Indonesia dengan salju abadi!'
  }
];

export const PetaNusantaraView: React.FC<PetaNusantaraViewProps> = ({
  onSelectSuku,
  onBackToMenu,
}) => {
  const [selectedIslandId, setSelectedIslandId] = useState<string>('sumatera');

  const selectedIsland = ISLANDS.find((i) => i.id === selectedIslandId) || ISLANDS[0];

  return (
    <div className="space-y-8 pb-16">
      {/* Header bar */}
      <div className="bg-[#1565C0] text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 text-amber-300 rounded-full text-xs font-bold mb-2">
              <span>🗺️</span>
              <span>Geografi & Budaya</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
              Peta Interaktif Budaya Nusantara
            </h1>
            <p className="text-sm text-blue-100 mt-1">
              Jelajahi kepulauan Indonesia dari barat hingga timur dan temukan suku-suku khasnya!
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onBackToMenu();
            }}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl transition-all self-start sm:self-auto flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Menu Utama</span>
          </button>
        </div>
      </div>

      {/* Interactive Stylized Archipelago Map */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-base sm:text-lg text-slate-800 flex items-center gap-2">
            <Compass className="w-5 h-5 text-blue-600" />
            <span>Klik Pulau Pada Peta untuk Menjelajah:</span>
          </h2>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Koordinat: 6°LU – 11°LS dan 95°BT – 141°BT
          </span>
        </div>

        {/* SVG Archipelago Canvas */}
        <div className="relative w-full aspect-[2/1] sm:aspect-[2.4/1] bg-gradient-to-b from-sky-100/70 to-blue-50/70 rounded-2xl border border-blue-200/60 overflow-hidden flex items-center justify-center p-3">
          {/* Stylized Waves Background */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Ocean Labels */}
          <span className="absolute top-3 left-4 text-[10px] font-bold text-blue-400 tracking-wider">
            SAMUDRA HINDIA
          </span>
          <span className="absolute top-3 right-4 text-[10px] font-bold text-blue-400 tracking-wider">
            SAMUDRA PASIFIK
          </span>
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-blue-300">
            LAUT JAWA & LAUT BANDA
          </span>

          {/* Interactive Island Nodes / Paths Map */}
          <div className="relative w-full h-full max-w-4xl mx-auto flex items-center justify-between px-2 sm:px-6">
            {/* 1. Sumatera Node */}
            <button
              onClick={() => {
                sound.playClick();
                setSelectedIslandId('sumatera');
              }}
              className={`group flex flex-col items-center transition-all cursor-pointer ${
                selectedIslandId === 'sumatera' ? 'scale-110 z-10' : 'opacity-85 hover:opacity-100 hover:scale-105'
              }`}
              style={{ width: '16%' }}
            >
              <div
                className={`w-14 sm:w-20 h-28 sm:h-36 rounded-2xl sm:rounded-3xl border-2 flex flex-col items-center justify-center p-2 shadow-sm transition-all rotate-[-25deg] ${
                  selectedIslandId === 'sumatera'
                    ? 'bg-emerald-500 border-white text-white shadow-lg ring-4 ring-emerald-200'
                    : 'bg-emerald-100 border-emerald-400 text-emerald-900'
                }`}
              >
                <span className="text-xl sm:text-2xl rotate-[25deg]">🌿</span>
                <span className="text-[10px] sm:text-xs font-black rotate-[25deg] mt-1 text-center leading-none">
                  Sumatera
                </span>
              </div>
            </button>

            {/* 2. Jawa Node */}
            <button
              onClick={() => {
                sound.playClick();
                setSelectedIslandId('jawa');
              }}
              className={`group flex flex-col items-center transition-all cursor-pointer ${
                selectedIslandId === 'jawa' ? 'scale-110 z-10' : 'opacity-85 hover:opacity-100 hover:scale-105'
              }`}
              style={{ width: '16%' }}
            >
              <div
                className={`w-20 sm:w-28 h-10 sm:h-14 rounded-full border-2 flex items-center justify-center p-2 shadow-sm transition-all mt-16 sm:mt-20 ${
                  selectedIslandId === 'jawa'
                    ? 'bg-red-500 border-white text-white shadow-lg ring-4 ring-red-200'
                    : 'bg-red-100 border-red-400 text-red-900'
                }`}
              >
                <span className="text-sm sm:text-lg mr-1">🏛️</span>
                <span className="text-[10px] sm:text-xs font-black">Jawa</span>
              </div>
            </button>

            {/* 3. Kalimantan Node */}
            <button
              onClick={() => {
                sound.playClick();
                setSelectedIslandId('kalimantan');
              }}
              className={`group flex flex-col items-center transition-all cursor-pointer ${
                selectedIslandId === 'kalimantan' ? 'scale-110 z-10' : 'opacity-85 hover:opacity-100 hover:scale-105'
              }`}
              style={{ width: '18%' }}
            >
              <div
                className={`w-18 sm:w-24 h-20 sm:h-28 rounded-3xl border-2 flex flex-col items-center justify-center p-2 shadow-sm transition-all mb-8 ${
                  selectedIslandId === 'kalimantan'
                    ? 'bg-pink-600 border-white text-white shadow-lg ring-4 ring-pink-200'
                    : 'bg-pink-100 border-pink-400 text-pink-900'
                }`}
              >
                <span className="text-xl sm:text-2xl">🌲</span>
                <span className="text-[10px] sm:text-xs font-black text-center leading-none mt-1">
                  Kalimantan
                </span>
              </div>
            </button>

            {/* 4. Sulawesi Node */}
            <button
              onClick={() => {
                sound.playClick();
                setSelectedIslandId('sulawesi');
              }}
              className={`group flex flex-col items-center transition-all cursor-pointer ${
                selectedIslandId === 'sulawesi' ? 'scale-110 z-10' : 'opacity-85 hover:opacity-100 hover:scale-105'
              }`}
              style={{ width: '14%' }}
            >
              <div
                className={`w-14 sm:w-18 h-22 sm:h-30 rounded-2xl border-2 flex flex-col items-center justify-center p-2 shadow-sm transition-all mb-4 ${
                  selectedIslandId === 'sulawesi'
                    ? 'bg-amber-500 border-white text-white shadow-lg ring-4 ring-amber-200'
                    : 'bg-amber-100 border-amber-400 text-amber-900'
                }`}
              >
                <span className="text-xl sm:text-2xl">⛵</span>
                <span className="text-[10px] sm:text-xs font-black text-center leading-none mt-1">
                  Sulawesi
                </span>
              </div>
            </button>

            {/* 5. Bali & Nusa Tenggara Node */}
            <button
              onClick={() => {
                sound.playClick();
                setSelectedIslandId('bali-nusra');
              }}
              className={`group flex flex-col items-center transition-all cursor-pointer ${
                selectedIslandId === 'bali-nusra' ? 'scale-110 z-10' : 'opacity-85 hover:opacity-100 hover:scale-105'
              }`}
              style={{ width: '16%' }}
            >
              <div
                className={`w-18 sm:w-24 h-12 sm:h-16 rounded-2xl border-2 flex flex-col items-center justify-center p-1.5 shadow-sm transition-all mt-16 sm:mt-20 ${
                  selectedIslandId === 'bali-nusra'
                    ? 'bg-teal-600 border-white text-white shadow-lg ring-4 ring-teal-200'
                    : 'bg-teal-100 border-teal-400 text-teal-900'
                }`}
              >
                <span className="text-base sm:text-xl">🌺</span>
                <span className="text-[9px] sm:text-[11px] font-black text-center leading-none mt-0.5">
                  Bali & NTT
                </span>
              </div>
            </button>

            {/* 6. Maluku & Papua Node */}
            <button
              onClick={() => {
                sound.playClick();
                setSelectedIslandId('maluku-papua');
              }}
              className={`group flex flex-col items-center transition-all cursor-pointer ${
                selectedIslandId === 'maluku-papua' ? 'scale-110 z-10' : 'opacity-85 hover:opacity-100 hover:scale-105'
              }`}
              style={{ width: '18%' }}
            >
              <div
                className={`w-18 sm:w-26 h-22 sm:h-32 rounded-3xl border-2 flex flex-col items-center justify-center p-2 shadow-sm transition-all ${
                  selectedIslandId === 'maluku-papua'
                    ? 'bg-blue-600 border-white text-white shadow-lg ring-4 ring-blue-200'
                    : 'bg-blue-100 border-blue-400 text-blue-900'
                }`}
              >
                <span className="text-xl sm:text-2xl">🗿</span>
                <span className="text-[10px] sm:text-xs font-black text-center leading-none mt-1">
                  Maluku & Papua
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Island Pills Quick Switch */}
        <div className="flex flex-wrap gap-2 pt-2">
          {ISLANDS.map((island) => (
            <button
              key={island.id}
              onClick={() => {
                sound.playClick();
                setSelectedIslandId(island.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedIslandId === island.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: island.warna }} />
              <span>{island.nama}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Island Detail Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white px-2.5 py-0.5 rounded-md" style={{ backgroundColor: selectedIsland.warna }}>
                {selectedIsland.julukan}
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {selectedIsland.nama}
            </h2>
          </div>
          <p className="text-xs text-slate-500 sm:text-right max-w-xs">
            {selectedIsland.deskripsi}
          </p>
        </div>

        {/* Fun Geography fact */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-amber-900 font-medium">
            <span className="font-bold">Fakta Geografi Nusantara:</span> {selectedIsland.faktaGeografi}
          </p>
        </div>

        {/* Suku Bangsa di Wilayah Ini */}
        <div>
          <h3 className="font-display font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>Suku Bangsa Khas di {selectedIsland.nama}:</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedIsland.sukuList.map((sukuKey) => {
              const suku = DATA_SUKU[sukuKey];
              if (!suku) return null;

              return (
                <div
                  key={sukuKey}
                  className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between hover:bg-white hover:shadow-md transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl p-1 bg-white rounded-lg shadow-xs group-hover:scale-110 transition-transform">
                          {suku.ikon}
                        </span>
                        <div>
                          <h4 className="font-display font-extrabold text-base text-slate-900">
                            Suku {suku.nama}
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">
                            {suku.provinsi}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {suku.pulau}
                      </span>
                    </div>

                    <div className="text-xs space-y-1.5 text-slate-600 bg-white p-3 rounded-xl border border-slate-100">
                      <p><span className="font-bold text-slate-800">👕 Pakaian:</span> {suku.pakaian.replace('\n', ', ')}</p>
                      <p><span className="font-bold text-slate-800">🍲 Kuliner:</span> {suku.kuliner.replace('\n', ' ')}</p>
                      <p><span className="font-bold text-slate-800">🎭 Budaya:</span> {suku.budaya.replace('\n', ' ')}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      sound.playClick();
                      onSelectSuku(sukuKey);
                    }}
                    style={{ backgroundColor: suku.warna }}
                    className="mt-4 w-full py-2.5 text-white font-bold text-xs rounded-xl shadow-xs hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Pelajari Lebih Lengkap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
