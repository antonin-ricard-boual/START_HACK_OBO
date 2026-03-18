import { useState } from 'react'
import { LESSONS } from '../constants/game'

export default function Library({ unlockedAssets, badges, onUnlock, onClose }) {
  const [selected, setSelected] = useState(null)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizState, setQuizState] = useState(null) // null | 'correct' | 'wrong'

  function selectLesson(lesson) {
    setSelected(lesson)
    setQuizAnswer(null)
    setQuizState(null)
  }

  function handleAnswer(index) {
    if (quizState === 'correct') return
    setQuizAnswer(index)
    if (index === selected.quiz.answer) {
      setQuizState('correct')
      onUnlock(selected.unlocks, selected.badge)
    } else {
      setQuizState('wrong')
      setTimeout(() => { setQuizAnswer(null); setQuizState(null) }, 1500)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-600 w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 shrink-0">
          <div>
            <h2 className="font-bold text-base">📚 Library</h2>
            <p className="text-slate-400 text-xs mt-0.5">Complete lessons to unlock new asset classes</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-lg leading-none">✕</button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Lesson list */}
          <nav className="w-52 border-r border-slate-700 p-3 flex flex-col gap-1 overflow-y-auto shrink-0">
            {LESSONS.map(lesson => {
              const isUnlocked = unlockedAssets.includes(lesson.unlocks)
              const hasBadge = badges.includes(lesson.badge)
              return (
                <button
                  key={lesson.id}
                  onClick={() => selectLesson(lesson)}
                  className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selected?.id === lesson.id ? 'bg-slate-600' : 'hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{isUnlocked ? '✅' : '🔒'}</span>
                    <span className={isUnlocked ? 'text-white' : 'text-slate-400'}>
                      {lesson.title}
                    </span>
                  </div>
                  {hasBadge && (
                    <div className="text-[10px] text-yellow-400 ml-6 mt-0.5">{lesson.badge}</div>
                  )}
                </button>
              )
            })}

            {/* Badges section */}
            {badges.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-700">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-2 px-1">Your Badges</p>
                <div className="flex flex-col gap-1">
                  {badges.map(b => (
                    <span key={b} className="text-[11px] text-yellow-300 px-2 py-1 bg-yellow-900/30 rounded border border-yellow-800/50">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </nav>

          {/* Content area */}
          <div className="flex-1 p-6 overflow-y-auto">
            {!selected ? (
              <div className="h-full flex items-center justify-center text-slate-500 text-sm">
                Select a lesson →
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div>
                  <h3 className="font-bold text-lg mb-2">{selected.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{selected.body}</p>
                </div>

                {/* Quiz */}
                <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">🧠 Quick Quiz</p>
                  <p className="text-sm font-medium mb-3">{selected.quiz.question}</p>
                  <div className="flex flex-col gap-2">
                    {selected.quiz.options.map((opt, i) => {
                      let style = 'bg-slate-700 hover:bg-slate-600 border-slate-600'
                      if (quizAnswer !== null) {
                        if (i === selected.quiz.answer) style = 'bg-green-800 border-green-500'
                        else if (i === quizAnswer)      style = 'bg-red-800 border-red-600'
                        else                            style = 'bg-slate-700 border-slate-600 opacity-40'
                      }
                      return (
                        <button
                          key={i}
                          onClick={() => handleAnswer(i)}
                          className={`text-left px-4 py-2 rounded-lg border text-sm transition-colors ${style}`}
                        >
                          {opt}
                        </button>
                      )
                    })}
                  </div>

                  {quizState === 'correct' && (
                    <p className="mt-3 text-green-400 text-sm font-medium">
                      ✅ Correct! You earned {selected.badge} and unlocked the {selected.unlocks} district!
                    </p>
                  )}
                  {quizState === 'wrong' && (
                    <p className="mt-3 text-red-400 text-sm">❌ Not quite — try again!</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
