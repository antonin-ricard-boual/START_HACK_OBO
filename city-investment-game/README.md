# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# 🏙️ Wealth Manager Arena
### *The Investing Game (Bull vs Bear Edition)*

A gamified, city-building investment simulation designed to teach beginners how to invest safely — without risking real money.

---

## 🎯 Concept

**Wealth Manager Arena** transforms investing into a **SimCity-style experience**:

- 🌍 Start with an empty planet
- 🏛️ Build your city by investing in assets
- 📊 Each building = an investment
- 🧠 Learn → unlock new investments
- 🌪️ Survive financial crises
- 🏆 Compete with friends

👉 Your **city = your portfolio**.

---

## 🧩 Core Gameplay

### 🏁 Starting Point
- Central **Rathaus (City Hall)**
- Only asset available: **Government Bonds (low risk)**

### 💰 Earn Money
- Passive income (log-in reward / time steps)
- Portfolio returns (simulated market)

### 🏗️ Build Your City
Each **district = asset class**:

| Asset Class | Visual Theme | Behavior |
|------------|-------------|---------|
| Bonds | Stable residential area | Low risk, steady growth |
| Stocks | Skyscraper district | High growth, volatile |
| Gold | Vault / temple | Safe haven |
| Crypto | Neon district | Very volatile |

---

### ⚠️ Risk & Events
Your city visually reacts to your investment decisions:

- 📉 Crashes → buildings crack / tilt / turn red  
- ⚖️ Overexposure → buildings tilt  
- 🌍 Events:
  - Financial crisis
  - Inflation
  - Tech boom
  - Market shocks  

👉 **Diversification = stability**.

---

### 🧠 Learning System (Library)
- Short, TikTok-style learning content  
- Quick quizzes  
- Unlock:
  - New asset classes  
  - Badges (e.g., *“Certified ETF Investor”*)  

---

### 🏢 Central Hub: PostFinance Tower
Displays:
- Total portfolio value  
- Risk score  
- Diversification score  
- Performance  

---

### 📈 Simulation Engine
- Accelerated time (years in minutes)  
- Scenario mode:  
  - “What if you invested in 2008?”  
- Real-time portfolio evolution  

---

### 🏆 Progression & Rewards
- Higher returns → unlock monuments  
- Learning → unlock new districts  
- Smart investing → better rankings  

---

### ⚔️ Competition Mode (Optional)
- Compare cities with friends  
- Leaderboard based on:
  - Risk-adjusted returns  
  - Diversification  
  - Stability  

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite  
- **Styling:** Tailwind CSS  
- **Backend (optional):** Firebase (for multiplayer / leaderboards)

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install