# 🏏⚽ PlayPal — AI Sports Companion

> **An intelligent, real-time AI companion for live Cricket and Football matches.**
> Designed for modern Smart TVs, Mobile, and Web, offering dynamic match explanations, tactical breakdown, predictions, and personalized commentary.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React Native](https://img.shields.io/badge/React%20Native-0.73-61DAFB?logo=react&logoColor=black)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Zustand](https://img.shields.io/badge/State-Zustand-orange)](https://github.com/pmndrs/zustand)

---

## ✨ Features

- **⚡ Real-Time Live Match Companion**: Dynamic commentary feeds with ball-by-ball / minute-by-minute simulation for **Cricket (T20/ODI/Test)** and **Football (Premier League/UCL)**.
- **🤖 Multimodal AI Explanation Modes**:
  - **🐣 Beginner Mode**: Simple, intuitive explanations demystifying complex rules (LBW, Duckworth-Lewis, offside, VAR, powerplay).
  - **🧒 Kid Mode**: Fun, engaging, emoji-packed descriptions that make sports enjoyable for younger audiences.
  - **🎯 Expert Mode**: Tactical analysis, field placements, xG metrics, run rate projections, and momentum shifts.
- **🎙️ Voice & TTS Integration**: Text-to-speech commentary and voice-assisted companion queries for hands-free TV & mobile viewing.
- **📊 Interactive Predictions & Win Probability**: Live odds, win-meter recalculations, and milestone tracking.
- **🎮 Smart TV & D-Pad Remote First**: Tailored keyboard and 5-way D-pad remote navigation with focus rings and HUD overlays.
- **🌐 Interactive Web Demo**: Zero-dependency standalone browser demo showcasing both Cricket and Football simulations with speed control and instant AI explanations.

---

## 🏗️ Repository Structure

```
├── app/                              # React Native / Smart TV Application
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── services/
│       │   ├── ai/                   # AI Service, system prompts & fallback engines
│       │   ├── platform/             # Android TV / D-Pad key mappings
│       │   ├── sports/               # Cricket & Football match feeds & mock provider
│       │   ├── tts/                  # Text-to-speech audio service
│       │   └── voice/                # Voice command recognition
│       ├── state/                    # Zustand stores (match, AI, prediction, UI)
│       ├── theme/                    # Color tokens, typography, spacing
│       └── types/                    # Full TypeScript domain contracts
│
├── demo/                             # Standalone Interactive Web Demo
│   ├── index.html                    # Glassmorphism dark UI dashboard
│   ├── styles.css                    # Fluid animations & responsive TV HUD
│   └── app.js                        # Match simulator & contextual AI engine
│
└── README.md
```

---

## 🚀 Quick Start

### 1. Run the Interactive Web Demo

No build tools needed for the demo! You can serve it with any static server:

```bash
# Using npx serve
npx -y serve demo -l 3000

# Or with python
python -m http.server 3000 --directory demo
```

Then open `http://localhost:3000` in your browser.

#### Demo Keyboard Controls:
| Key | Action |
| --- | --- |
| `Space` | Play / Pause Match Simulation |
| `R` | Reset Simulation |
| `1` | Switch to **Beginner** AI Mode |
| `2` | Switch to **Kid** AI Mode |
| `3` | Switch to **Expert** AI Mode |
| `C` | Switch to **Cricket** (India vs Australia) |
| `F` | Switch to **Football** (Arsenal vs Manchester City) |

---

### 2. React Native App Development

```bash
cd app
npm install

# Run type check
npm run typecheck

# Start Metro bundler
npm run start

# Launch on Android / Android TV
npm run android
npm run android:tv
```

---

## 🧠 Architecture & State Management

PlayPal utilizes modular **Zustand** stores with **Immer** for immutable state updates:
- **`matchStore`**: Ingestion of live score updates, ball-by-ball events, player statistics, and match status.
- **`aiStore`**: Context-aware queries, streaming commentary responses, explanation level preferences, and history.
- **`predictionStore`**: Dynamic win probability curves and AI match outcome models.
- **`uiStore`**: D-pad navigation active focus, HUD visibility, PIP mode, and modal states.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
