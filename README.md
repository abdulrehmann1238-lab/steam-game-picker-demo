# LOOTBOX — The Ultimate Random Steam Game Reveal Experience
### Visual Direction: The Midnight Vault

A cinematic, interactive web application that transforms choosing a random Steam game into a thrilling event. Built with a restrained, dark editorial aesthetic, realistic CSS 3D physics, a 7-phase box opening sequence, procedural sound effects, and zero external backend dependencies.

---

## 🌟 Key Features

1. **Cinematic Hero Entry**
   - Editorial headline typography using `Cormorant Garamond` and `Manrope`.
   - Atmospheric background featuring ambient radial warm glows, deep charcoal matte textures, and fine SVG film grain overlay.
   - Interactive 3D mystery box in a gentle floating idle state with physical metallic bevels and engraved emblem.

2. **Game Filter Laboratory**
   - **Steam Review Count:** Dual-range slider and synchronized numeric inputs with formatted thousands separators.
   - **Sentiment Preference:** Segmented selection for *Mostly Positive (70%+)*, *Mostly Negative / Mixed*, or *Any Rating*.
   - **Release Age:** Segmented constraint options for *1 Year*, *3 Years*, *5 Years*, *10 Years*, or *Any Age*.
   - **Price Range:** Dual-range slider for *$0 (Free to play)* up to *$70 USD*.
   - **Live Pool Summary:** Real-time calculation of eligible games with number ticker animations and stacked candidate thumbnails.
   - **Empty State Protection:** Helpful error messaging and widening controls if active filters yield zero matches.

3. **The Signature 7-Phase Lootbox Reveal**
   - **Phase 1: User Commitment (0.0s – 0.25s)** — Button shifts to "UNSEALING...", subtle camera push, controls lock.
   - **Phase 2: Anticipation Tension (0.25s – 0.85s)** — Mechanical vibration shudder, hairline lid seam illuminates with warm light, ground shadow tightens.
   - **Phase 3: Seal Release (0.85s – 1.25s)** — Decorative seal unlocks, lid starts lifting.
   - **Phase 4: Lid Opening (1.25s – 1.8s)** — Lid rotates backward around its 3D rear hinge (`rotateX(-125deg)`), exposing the glowing velvet interior.
   - **Phase 5: Discovery Burst (1.8s – 2.4s)** — Controlled HTML5 canvas golden embers and dust particles rise from the chamber.
   - **Phase 6: Game Reveal (2.4s – 3.1s)** — Game artwork rises in 3D perspective out of the container with discovery chime.
   - **Phase 7: Final Result (3.1s+)** — Full metadata showcase settles into view with instant Steam Store link, replay controls, and trailer preview.
   - **Skip Animation:** Allows instant skip directly to the revealed game without breaking state.

4. **Game Result & 16:9 Trailer Preview**
   - Full game metadata: release date, developer/publisher, sentiment badge, user rating percentage, price, and genre tags.
   - **"Take a Closer Look"** 16:9 trailer player with play overlay and graceful fallback state.
   - Actions: **Open on Steam** (direct store link), **Reveal Another** (new random pick), **Replay Reveal** (replays unsealing for same title), and **Change Filters** (preserves state).

5. **Audio Engine & Accessibility**
   - **Procedural Web Audio API Sound Engine:** Zero external MP3/WAV dependencies; synthesizes clicks, mechanical unseals, and discovery chimes. Defaults to OFF.
   - **Reduced Motion Support:** Auto-detects `prefers-reduced-motion: reduce` and provides an instant header toggle, converting elaborate motion into graceful fading transitions.

---

## 🏛️ Architecture & Production Readiness (PRD §17)

The prototype is engineered with a clean service boundary that enables seamless migration from the current local fixture repository to a full-scale serverless or microservice architecture.

```
UI Layer (Pages & Components)
           │
           ▼
    GameRepository (Interface)
           │
 ┌─────────┴─────────┐
 ▼                   ▼
MockGameRepository   ProductionGameRepository (Future)
 (Local Fixtures)     ├── Steam Data Ingestion Worker
                      ├── PostgreSQL Normalized Database
                      ├── Redis Edge Caching Layer
                      └── REST / GraphQL Random-Pick API
```

### Production Data Ingestion & Caching Strategy
1. **Data Ingestion:** Periodic background worker queries the Steam Storefront API and Steam Web API, normalizing AppIDs, titles, capsule artwork, pricing, review counts, and sentiment ratios.
2. **Indexed Database:** Relational database (e.g. PostgreSQL) indexed on `review_count`, `rating_percentage`, `release_date`, and `price_usd` for sub-10ms candidate pool queries.
3. **Caching Layer:** Redis cache clusters and CDN edge caching to absorb viral YouTube audience traffic spikes without exhausting Steam API rate limits.
4. **Stateless API:** A lightweight endpoint `POST /api/vault/random` takes filter constraints and returns a uniform or popularity-weighted random game.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd project-186

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173/`.

### Production Build
```bash
# Typecheck and compile production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🛠️ Technology Stack
- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Vanilla CSS design tokens (`tokens.css`, `global.css`, `animations.css`)
- **Icons:** `lucide-react`
- **3D & Animation:** CSS 3D Transforms (`perspective`, `rotateX`, `preserve-3d`) + HTML5 Canvas particle physics
- **Audio:** Web Audio API Procedural Synthesis
- **Data:** Centralized local Steam mock catalog fixtures (34+ games)

---

## 📜 License
Prototypes and design created for Lootbox. Steam is a registered trademark of Valve Corporation. Game titles, artwork, and media remain the property of their respective creators and publishers.
