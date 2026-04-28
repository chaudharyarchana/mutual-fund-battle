# MutualCard — Mutual Fund Card Battle Game 🎮💰

A mobile card game that gamifies mutual fund learning. Players collect real mutual fund cards, compare financial stats (NAV, returns, expense ratios, Morningstar ratings), and battle opponents. Built with Expo and React Native, powered by live data from [mfdata.in](https://mfdata.in).

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the development server
npx expo start

# Run on Android Emulator or connected device
# (Press 'a' in the Expo CLI)
```

---

## 📱 Project Overview

### What is MutualCard?

MutualCard transforms mutual fund investing into an engaging card game:

- **Real Data**: Each card represents an actual mutual fund with live stats from mfdata.in
- **Stat Mechanics**: 
  - **HP** = NAV (Net Asset Value)
  - **Attack** = 1-Year Return (%)
  - **Weakness** = Expense Ratio (% — lower is better)
  - **Star Rank** = Morningstar Rating (1–5 stars)
- **Gameplay**: Players challenge opponents, select a stat to compare, and win if their value is higher (or lower for expense ratio)
- **Learning**: Players naturally learn about fund performance, costs, and risk metrics while playing

### Target Audience

- Retail investors learning about mutual funds
- Fintech enthusiasts
- Mobile gamers interested in educational content
- India-based users (primary market for mfdata.in)

### Platform

**Android only** — Optimized for Android 8.0+ (API 26+)

---

## 🏗️ Architecture

### Project Structure

```
├── app/                           # Main app directory (file-based routing)
│   ├── (tabs)/                    # Bottom tab navigation
│   │   ├── _layout.tsx            # Tab layout & navigator
│   │   ├── index.tsx              # Deck screen
│   │   ├── battle.tsx             # Battle screen
│   │   └── vault.tsx              # vault screen (Display Saved Cards)
│   ├── _layout.tsx                # Root navigator setup
│   └── battleResult.tsx           # Battle result screen (Display Result of battle)
│   └── details.tsx                # Fund details screen
├──components/
│   ├── PowerCard.tsx             # Fund Card component
│   └── AssetCard.tsx             # Asset Card component
│   └── SavedCard.tsx             # Saved Card component


### State Management

- Async Storage

---

## 📚 Library Choices

### Core

| Library | Version | Why |
|---------|---------|-----|
| **React Native** | Latest via Expo | Cross-platform, mature ecosystem |
| **Expo** | Latest (`create-expo-app`) | Simplified setup, no native code compilation needed |
| **Expo Router** | Latest | File-based routing (better than React Navigation boilerplate) |


### API & Data

| Library | Version | Why |
|---------|---------|-----|
| **axios** | ^1.4.x | Simple HTTP client for mfdata.in API calls |
| **AsyncStorage** | ^1.13.x | Persist deck, user progress offline |


### Dev Tools

| Library | Version | Why |
|---------|---------|-----|
| **TypeScript** | ^5.x | Type safety, better IDE support, fewer runtime bugs |
| **ESLint** | ^8.x | Code consistency |
| **Prettier** | ^3.x | Auto-formatting |

### Why NOT Redux Persist?

We use **AsyncStorage directly** for explicit control over what's persisted and when. Gives us flexibility for cloud save syncing later.

---

## 🔧 Setup Instructions

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn**
- **Android Studio** with Android SDK (API 26+) or physical Android device
- **Expo CLI** (installed via npm)

### Step 1: Clone & Install

```bash
git clone https://github.com/chaudharyarchana/mutual-fund-battle.git
cd mutual-fund-battle
npm install

### Step 2: Start Development Server

```bash
npx expo start
```

### Step 4: Run on Android

**Option A: Android Emulator**
1. Open Android Studio → Virtual Device Manager → launch an emulator
2. Press `a` in Expo CLI to open on emulator

**Option B: Physical Device**
1. Install [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) from Google Play
2. Scan the QR code from Expo CLI output

### Step 5: Verify Setup

You should see:
- Bottom tab navigation (Home, Deck, Vault)
- Battle screen with a random opponent card
- Deck screen showing your collected cards
- Vault showing your saved cards

---

**Built with ❤️ for mutual fund enthusiasts. Learn finance while you play! 🚀**