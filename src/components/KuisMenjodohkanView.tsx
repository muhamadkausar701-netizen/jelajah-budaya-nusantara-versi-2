import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Gamepad2, Award, RotateCcw, Home, Sparkles, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';
import { DATA_KUIS, KuisItem } from '../data/budayaData';

interface KuisMenjodohkanViewProps {
  onBackToMenu: () => void;
  onRecordQuizScore: (score: number, total: number) => void;
}

export const KuisMenjodohkanView: React.FC<KuisMenjodohkanViewProps> = ({
  onBackToMenu,
  onRecordQuizScore,
}) => {
  // Option: 8 questions (classic Tkinter set) or Full set
  const [quizMode, setQuizMode] = useState<'standar' | 'lengkap'>('standar');
  const [questions, setQuestions] = useState<KuisItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{
    show: boolean;
    isCorrect: boolean;
    selected: string;
    correctAnswer: string;
  } | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  // Initialize or restart quiz
  const startQuiz = (mode: 'standar' | 'lengkap' = quizMode) => {
    sound.playClick();
    const sourceData = mode === 'standar' ? DATA_KUIS.slice(0, 8) : DATA_KUIS;
    // Shuffle questions
    const shuffled = [...sourceData].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setFeedback(null);
    setIsFinished(false);
  };

  useEffect(() => {
    startQuiz(quizMode);
  }, [quizMode]);

  // Generate options whenever question index changes
  useEffect(() => {
    if (questions.length > 0 && currentIndex < questions.length) {
      const currentQ = questions[currentIndex];
      // Gather all distinct correct answers
      const allAnswers = DATA_KUIS.map((q) => q.benar).filter((a) => a !== currentQ.benar);
      // Pick 3 random distractors
      const shuffledDistractors = allAnswers.sort(() => Math.random() - 0.5).slice(0, 3);
      // Combine with correct answer and shuffle
      const combined = [...shuffledDistractors, currentQ.benar].sort(() => Math.random() - 0.5);
      setOptions(combined);
      setFeedback(null);
    }
  }, [questions, currentIndex]);

  const handleSelectAnswer = (picked: string) => {
    if (feedback?.show) return;

    const currentQ = questions[currentIndex];
    const isCorrect = picked === currentQ.benar;

    if (isCorrect) {
      sound.playCorrect();
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      sound.playWrong();
      setStreak(0);
    }

    setFeedback({
      show: true,
      isCorrect,
      selected: picked,
      correctAnswer: currentQ.benar,
    });
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentIndex + 1 >= questions.length) {
      const finalScore = score + (feedback?.isCorrect ? 0 : 0); // score is already updated
      finishQuiz(score);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setFeedback(null);
    }
  };

  const finishQuiz = (finalScore: number) => {
    setIsFinished(true);
    onRecordQuizScore(finalScore, questions.length);

    const percentage = Math.round((finalScore / questions.length) * 100);
    if (percentage >= 50) {
      sound.playFanfare();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe fallback if confetti isn't supported in current environment
      }
    }
  };

  // ================= RENDER RESULTS =================
  if (isFinished) {
    const total = questions.length;
    const persen = Math.round((score / total) * 100);

    let pesan = '';
    let emoji = '🎉';
    if (persen >= 80) {
      pesan = 'Luar biasa! Kamu sudah sangat mengenal budaya Indonesia! 🌟';
      emoji = '🏆';
    } else if (persen >= 50) {
      pesan = 'Bagus! Terus belajar ya, kamu hebat! 👍';
      emoji = '⭐';
    } else {
      pesan = 'Jangan menyerah! Coba lagi dan pelajari detail sukunya ya! 💪';
      emoji = '🌱';
    }

    return (
      <div className="max-w-2xl mx-auto space-y-6 pb-16">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 text-center shadow-md space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-purple-100 text-purple-700 flex items-center justify-center text-4xl shadow-inner">
            {emoji}
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
              Kuis Selesai
            </span>
            <h2 className="font-display text-3xl font-black text-slate-900 mt-2">
              🎉 Hasil Kuis Menjodohkan 🎉
            </h2>
          </div>

          {/* Big Score Box */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 max-w-sm mx-auto">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              Skor Kamu
            </p>
            <p className="font-display text-5xl font-extrabold text-[#1565C0] mt-1 tabular-nums">
              {score} <span className="text-2xl text-slate-400 font-normal">/ {total}</span>
            </p>
            <p className="text-sm font-semibold text-slate-600 mt-1">
              Nilai: <span className="font-bold text-blue-700">{persen}%</span>
            </p>
          </div>

          {/* Motivational message */}
          <p className="text-slate-700 font-medium text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            {pesan}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => startQuiz()}
              className="w-full sm:w-auto px-6 py-3 bg-[#FF6F00] hover:bg-[#FF8F00] active:scale-95 text-white font-extrabold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>🔄 Main Lagi</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onBackToMenu();
              }}
              className="w-full sm:w-auto px-6 py-3 bg-slate-500 hover:bg-slate-600 active:scale-95 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>🏠 Menu Utama</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= RENDER QUESTION SCREEN =================
  const currentQ = questions[currentIndex] || DATA_KUIS[0];

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Top Header matching Tkinter's purple #6A1B9A theme */}
      <div className="bg-[#6A1B9A] text-white rounded-3xl p-5 sm:p-7 shadow-md flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold text-amber-300 mb-1">
            <span>🎮 Game Edukasi Siswa SD</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight">
            Kuis Menjodohkan Budaya
          </h1>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onBackToMenu();
          }}
          className="px-3.5 py-1.5 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer"
        >
          ← Menu Utama
        </button>
      </div>

      {/* Progress & Score Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500">
            Soal <span className="text-blue-700 font-extrabold text-base">{currentIndex + 1}</span> dari{' '}
            <span className="font-extrabold">{questions.length}</span>
          </span>
          {streak > 1 && (
            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs font-bold flex items-center gap-1">
              <span>🔥</span>
              <span>Streak: {streak}</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-purple-800 bg-purple-50 border border-purple-200 px-3 py-1 rounded-xl">
            Skor: <span className="text-sm font-extrabold font-mono tabular-nums">{score}</span>
          </span>

          {/* Mode switch */}
          <button
            onClick={() => {
              const nextMode = quizMode === 'standar' ? 'lengkap' : 'standar';
              setQuizMode(nextMode);
            }}
            className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 underline cursor-pointer"
          >
            Mode: {quizMode === 'standar' ? '8 Soal' : '14 Soal'}
          </button>
        </div>
      </div>

      {/* Main Flashcard / Object Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-100 shadow-md text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Objek Budaya
        </span>

        {/* Big Text Card matching Tkinter's kartu_gambar */}
        <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-2xl p-6 sm:p-8 border border-blue-200/60 max-w-md mx-auto my-3">
          <h2 className="font-display text-2xl sm:text-4xl font-black text-[#1565C0] tracking-tight">
            {currentQ.gambar}
          </h2>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            Kategori: <span className="font-bold text-slate-700">{currentQ.kategori}</span>
          </p>
        </div>

        <p className="text-sm font-bold text-slate-700">
          Jodohkan dengan penjelasan yang tepat:
        </p>
      </div>

      {/* Answer Options Grid (4 randomized choices) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {options.map((option, idx) => {
          let btnStyle = 'bg-[#FFF3E0] hover:bg-[#FFE0B2] text-[#E65100] border-amber-200';

          if (feedback?.show) {
            if (option === feedback.correctAnswer) {
              btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-[1.01]';
            } else if (option === feedback.selected) {
              btnStyle = 'bg-red-500 text-white border-red-600';
            } else {
              btnStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              disabled={feedback?.show}
              onClick={() => handleSelectAnswer(option)}
              className={`p-4 rounded-2xl border-2 font-semibold text-sm sm:text-base leading-snug text-left transition-all cursor-pointer flex items-start gap-3 min-h-[72px] ${btnStyle}`}
            >
              <span className="w-7 h-7 rounded-lg bg-black/10 flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Instant Feedback Dialog / Banner */}
      {feedback?.show && (
        <div
          className={`rounded-2xl p-5 border-2 shadow-sm transition-all flex flex-col sm:flex-row items-center justify-between gap-4 ${
            feedback.isCorrect
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-red-50 border-red-300 text-red-900'
          }`}
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            {feedback.isCorrect ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600 shrink-0" />
            )}
            <div>
              <p className="font-extrabold text-base">
                {feedback.isCorrect ? 'Benar! ⭐' : 'Kurang Tepat 😊'}
              </p>
              <p className="text-xs sm:text-sm mt-0.5">
                {feedback.isCorrect
                  ? 'Hebat! Jawabanmu tepat sekali!'
                  : `Jawaban yang benar adalah: ${feedback.correctAnswer}`}
              </p>
            </div>
          </div>

          <button
            onClick={handleNextQuestion}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>{currentIndex + 1 >= questions.length ? 'Lihat Hasil Kuis' : 'Soal Berikutnya'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
