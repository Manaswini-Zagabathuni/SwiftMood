#  SwiftMood

> A Taylor Swift mood-based song recommendation chatbot, powered by Claude AI.

SwiftMood is an AI-powered web app that recommends Taylor Swift songs based on your current mood or emotions. Just tell it how you're feeling in words and it'll match you with the perfect songs from Taylor's entire discography.

---

##  Features

-  Conversational mood input describe feelings naturally
-  Recommendations from all Taylor Swift eras (debut → TTPD)
-  Quick-pick mood chips for fast vibes
-  Song-by-song explanations with era context
-  Beautiful, romantic UI inspired by Taylor's aesthetic

---

##  Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- An [Anthropic API key](https://console.anthropic.com/)

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/swiftmood.git
cd swiftmood

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Usage

1. Enter your Anthropic API key on the welcome screen (it's never stored)
2. Describe your mood or pick a quick vibe chip
3. Receive personalized Taylor Swift song recommendations!

---

##  Tech Stack
| Layer      | Tech                        |
|------------|-----------------------------|
| Frontend   | React 18 + Vite             |
| AI         | Claude claude-sonnet-4-20250514 (Anthropic API) |
| Styling    | Pure CSS (no UI library)    |
| Fonts      | Playfair Display + DM Sans  |

---

##  Project Structure

```
swiftmood/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          # Main app shell & chat logic
│   ├── Message.jsx      # Chat bubble component
│   ├── MoodChips.jsx    # Quick mood selector chips
│   ├── TypingIndicator  # Animated typing dots
│   ├── api.js           # Anthropic API integration
│   ├── moods.js         # Mood chip data & era colors
│   ├── index.css        # Global styles & animations
│   └── main.jsx         # React entry point
├── index.html
├── vite.config.js
└── package.json
```

---

##  API Key

SwiftMood requires an Anthropic API key to function. You can get one at [console.anthropic.com](https://console.anthropic.com/).

> **Privacy note:** Your API key is entered in-browser and sent directly to Anthropic's servers. It is never stored, logged, or transmitted anywhere else.

---

##  Eras Covered

Taylor Swift · Fearless · Speak Now · Red · 1989 · reputation · Lover · folklore · evermore · Midnights · The Tortured Poets Department

---

##  License

MIT — feel free to use, fork, and remix. And maybe listen to *All Too Well (10 Minute Version)* while you do. 🍂
