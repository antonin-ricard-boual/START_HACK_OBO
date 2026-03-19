import { useState } from 'react'
import { registerUser, loginUser } from '../../firebase/auth'
import { useAuth } from '../../hooks/useAuth.jsx'

export default function AuthPage() {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState({ email: '', password: '', username: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'register') {
        if (!form.username.trim()) { setError('Username is required'); setLoading(false); return }
        await registerUser(form.email, form.password, form.username)
      } else {
        await loginUser(form.email, form.password)
      }
    } catch (err) {
      setError(err.message.replace('Firebase: ', '').replace(/\(auth.*\)/, ''))
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f1a0f] via-[#1a2e1a] to-[#0f1a0f]">
      {/* Animated city background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <CityBackground />
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🏙️</div>
          <h1 className="text-4xl font-black text-white tracking-tight">
            Wealth<span className="text-green-400">City</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm">Learn to invest. Build your city.</p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/90 backdrop-blur border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <div className="flex gap-1 mb-6 bg-slate-800 rounded-xl p-1">
            {['login', 'register'].map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setError('') }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                  mode === m
                    ? 'bg-green-500 text-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <form onSubmit={handle} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Username</label>
                <input
                  type="text"
                  placeholder="CityBuilder99"
                  value={form.username}
                  onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 transition-colors"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 transition-colors"
                required
              />
            </div>

            {error && (
              <div className="bg-red-900/40 border border-red-700 rounded-lg px-4 py-3 text-red-300 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-400 disabled:opacity-50 text-black font-bold py-3 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? '...' : mode === 'login' ? 'Enter the City' : 'Build Your City'}
            </button>
          </form>

          {mode === 'register' && (
            <p className="text-slate-500 text-xs text-center mt-4">
              You start with <span className="text-green-400 font-semibold">CHF 10,000</span> + earn more by completing quizzes
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// Simple animated city silhouette background
function CityBackground() {
  const buildings = [
    { x: 5, h: 120, w: 40, color: '#1e3a1e' },
    { x: 50, h: 200, w: 30, color: '#163016' },
    { x: 90, h: 150, w: 50, color: '#1e3a1e' },
    { x: 150, h: 80, w: 35, color: '#163016' },
    { x: 195, h: 250, w: 25, color: '#1a351a' },
    { x: 240, h: 180, w: 45, color: '#1e3a1e' },
    { x: 300, h: 100, w: 60, color: '#163016' },
    { x: 370, h: 220, w: 30, color: '#1a351a' },
    { x: 420, h: 160, w: 55, color: '#1e3a1e' },
    { x: 490, h: 90, w: 40, color: '#163016' },
    { x: 545, h: 280, w: 20, color: '#1a351a' },
    { x: 590, h: 140, w: 50, color: '#1e3a1e' },
    { x: 660, h: 110, w: 35, color: '#163016' },
    { x: 710, h: 190, w: 45, color: '#1a351a' },
    { x: 770, h: 130, w: 40, color: '#1e3a1e' },
    { x: 820, h: 240, w: 30, color: '#163016' },
    { x: 870, h: 95, w: 55, color: '#1a351a' },
    { x: 940, h: 175, w: 35, color: '#1e3a1e' },
    { x: 990, h: 120, w: 45, color: '#163016' },
    { x: 1050, h: 200, w: 30, color: '#1a351a' },
    { x: 1100, h: 155, w: 50, color: '#1e3a1e' },
    { x: 1165, h: 85, w: 40, color: '#163016' },
    { x: 1220, h: 230, w: 25, color: '#1a351a' },
    { x: 1270, h: 140, w: 55, color: '#1e3a1e' },
  ]

  return (
    <svg className="absolute bottom-0 w-full" height="300" xmlns="http://www.w3.org/2000/svg">
      {buildings.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={300 - b.h}
          width={b.w}
          height={b.h}
          fill={b.color}
          opacity={0.6}
        />
      ))}
      {/* Window lights */}
      {buildings.map((b, i) =>
        Array.from({ length: Math.floor(b.h / 25) }).map((_, j) => (
          <rect
            key={`w-${i}-${j}`}
            x={b.x + 8}
            y={300 - b.h + j * 25 + 8}
            width={8}
            height={8}
            fill={Math.random() > 0.4 ? '#4ade8033' : 'transparent'}
            rx={1}
          />
        ))
      )}
    </svg>
  )
}
