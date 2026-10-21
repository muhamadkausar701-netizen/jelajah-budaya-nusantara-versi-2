import React, { useState } from 'react';
import { Volume2, VolumeX, Award, Compass, BookOpen, MapPin, Gamepad2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  learnedCount: number;
  totalSuku: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  learnedCount,
  totalSuku
}) => {
  const [isMuted, setIsMuted] = useState(sound.isMuted);

  const toggleSound = () => {
    sound.isMuted = !sound.isMuted;
    setIsMuted(sound.isMuted);
    if (!sound.isMuted) {
      sound.playClick();
    }
  };

  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Compass },
    { id: 'suku', label: 'Kenali Suku', icon: BookOpen },
    { id: 'peta', label: 'Peta Budaya', icon: MapPin },
    { id: 'kuis', label: 'Kuis Menjodohkan', icon: Gamepad2 },
    { id: 'paspor', label: 'Paspor Budaya', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text brand wordmark */}
        <button
          onClick={() => {
            sound.playClick();
            onSelectTab('beranda');
          }}
          className="flex items-center gap-2.5 text-left focus-visible:outline-hidden group shrink-0"
        >
          <span className="w-8 h-8 rounded-lg bg-linear-to-br from-red-600 to-red-500 text-white flex items-center justify-center font-bold text-sm shadow-xs group-hover:scale-105 transition-transform">
            🇮🇩
          </span>
          <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 whitespace-nowrap">
            Jelajah Budaya Nusantara
          </span>
        </button>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  onSelectTab(item.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Sound toggle & passport counter) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('paspor');
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 rounded-lg text-xs font-bold transition-colors whitespace-nowrap"
            title="Buka Paspor Budaya"
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span className="font-mono tabular-nums">{learnedCount}/{totalSuku}</span>
            <span className="hidden sm:inline">Tuntas</span>
          </button>

          <button
            onClick={toggleSound}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
            aria-label={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-red-500" /> : <Volume2 className="w-5 h-5 text-blue-600" />}
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden border-t border-slate-100 bg-slate-50/90 px-3 py-1.5 flex items-center justify-around overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                sound.playClick();
                onSelectTab(item.id);
              }}
              className={`flex flex-col items-center py-1 px-2 text-xs font-semibold whitespace-nowrap ${
                isActive ? 'text-blue-700' : 'text-slate-500'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
