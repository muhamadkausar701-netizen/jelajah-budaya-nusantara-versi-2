import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { SukuListView } from './components/SukuListView';
import { SukuDetailView } from './components/SukuDetailView';
import { PetaNusantaraView } from './components/PetaNusantaraView';
import { KuisMenjodohkanView } from './components/KuisMenjodohkanView';
import { PasporBudayaView } from './components/PasporBudayaView';
import { DATA_SUKU } from './data/budayaData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('beranda');
  const [selectedSukuKey, setSelectedSukuKey] = useState<string>('Betawi');

  // Persistence in localStorage
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('budaya_student_name') || 'Penjelajah Cilik';
  });

  const [learnedSukuIds, setLearnedSukuIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('budaya_learned_ids');
      return saved ? JSON.parse(saved) : ['betawi']; // default 1 unlocked
    } catch {
      return ['betawi'];
    }
  });

  const [bestQuizScore, setBestQuizScore] = useState<{ score: number; total: number } | null>(() => {
    try {
      const saved = localStorage.getItem('budaya_best_quiz');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('budaya_student_name', studentName);
  }, [studentName]);

  useEffect(() => {
    localStorage.setItem('budaya_learned_ids', JSON.stringify(learnedSukuIds));
  }, [learnedSukuIds]);

  useEffect(() => {
    if (bestQuizScore) {
      localStorage.setItem('budaya_best_quiz', JSON.stringify(bestQuizScore));
    }
  }, [bestQuizScore]);

  // Handlers
  const handleSelectSuku = (sukuKey: string) => {
    setSelectedSukuKey(sukuKey);
    setCurrentTab('detail');
    // Automatically mark suku as viewed if not already
    const suku = DATA_SUKU[sukuKey];
    if (suku && !learnedSukuIds.includes(suku.id)) {
      setLearnedSukuIds((prev) => [...prev, suku.id]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleLearned = (sukuId: string) => {
    setLearnedSukuIds((prev) =>
      prev.includes(sukuId) ? prev.filter((id) => id !== sukuId) : [...prev, sukuId]
    );
  };

  const handleRecordQuizScore = (score: number, total: number) => {
    if (!bestQuizScore || score / total > bestQuizScore.score / bestQuizScore.total) {
      setBestQuizScore({ score, total });
    }
  };

  const handleResetProgress = () => {
    setLearnedSukuIds([]);
    setBestQuizScore(null);
    localStorage.removeItem('budaya_learned_ids');
    localStorage.removeItem('budaya_best_quiz');
  };

  const handleMarkAllLearned = () => {
    const allIds = Object.values(DATA_SUKU).map((s) => s.id);
    setLearnedSukuIds(allIds);
  };

  const totalSukuCount = Object.keys(DATA_SUKU).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#EBF5FB] text-slate-800">
      {/* Top Bar Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        learnedCount={learnedSukuIds.length}
        totalSuku={totalSukuCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {currentTab === 'beranda' && (
          <HomeView
            onStartAdventure={() => setCurrentTab('suku')}
            onOpenQuiz={() => setCurrentTab('kuis')}
            onOpenMap={() => setCurrentTab('peta')}
            onOpenPassport={() => setCurrentTab('paspor')}
            onSelectSuku={handleSelectSuku}
          />
        )}

        {currentTab === 'suku' && (
          <SukuListView
            onSelectSuku={handleSelectSuku}
            onOpenQuiz={() => setCurrentTab('kuis')}
            onBackToHome={() => setCurrentTab('beranda')}
            learnedSukuIds={learnedSukuIds}
          />
        )}

        {currentTab === 'detail' && (
          <SukuDetailView
            sukuKey={selectedSukuKey}
            onBackToMenu={() => setCurrentTab('suku')}
            onOpenQuiz={() => setCurrentTab('kuis')}
            onSelectSuku={(key) => {
              setSelectedSukuKey(key);
              const suku = DATA_SUKU[key];
              if (suku && !learnedSukuIds.includes(suku.id)) {
                setLearnedSukuIds((prev) => [...prev, suku.id]);
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isLearned={learnedSukuIds.includes(DATA_SUKU[selectedSukuKey]?.id || '')}
            onToggleLearned={handleToggleLearned}
          />
        )}

        {currentTab === 'peta' && (
          <PetaNusantaraView
            onSelectSuku={handleSelectSuku}
            onBackToMenu={() => setCurrentTab('beranda')}
          />
        )}

        {currentTab === 'kuis' && (
          <KuisMenjodohkanView
            onBackToMenu={() => setCurrentTab('beranda')}
            onRecordQuizScore={handleRecordQuizScore}
          />
        )}

        {currentTab === 'paspor' && (
          <PasporBudayaView
            studentName={studentName}
            onUpdateStudentName={setStudentName}
            learnedSukuIds={learnedSukuIds}
            bestQuizScore={bestQuizScore}
            onResetProgress={handleResetProgress}
            onMarkAllLearned={handleMarkAllLearned}
            onSelectSuku={handleSelectSuku}
          />
        )}
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 bg-white/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-semibold text-slate-700">
            🇮🇩 Jelajah Budaya Nusantara — Pendidikan Budaya untuk Siswa SD Indonesia
          </p>
          <p className="text-slate-400">
            Bhinneka Tunggal Ika · Berbeda-beda tetapi tetap satu jua
          </p>
        </div>
      </footer>
    </div>
  );
}
