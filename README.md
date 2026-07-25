<div align="center">

# ⚡ GitPulse
### *Executive Developer Intelligence & Telemetry Engine*

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38Bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-Black?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

  <p align="center"><b>Transform any GitHub username into a high-end, Apple-grade executive summary in seconds.</b></p>
  
  <a href="#-overview">Overview</a> •
  <a href="#-features--telemetry">Features</a> •
  <a href="#-architecture--design-system">Architecture</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-getting-started">Getting Started</a>
</div>

---

## 🚀 Overview

**GitPulse** is a production-grade developer analytics dashboard designed to bridge the gap between raw GitHub data and executive decision-making. Instead of forcing recruiters or hiring managers to sift through hundreds of unstructured repositories, GitPulse extracts, analyzes, and presents actionable telemetry through a luxury interface inspired by **Apple, Vercel, Linear, Arc Browser, and Google Gemini**.

Built with performance, modularity, and aesthetics at its core, GitPulse answers a single question in under five seconds: *"Who is this developer, and what is their actual impact?"*

---

## ✨ Features & Telemetry

### 1. 🌌 Cinematic Gemini Landing Experience
- Features a fluid, multi-color ambient aura background framing the viewport edges.
- Incorporates a technical high-definition dot-grid mesh overlay with interactive mouse-tracking spotlight lighting.
- Zero vertical scrollbar launchpad layout engineered for instant focus.

### 2. 🧠 Intelligent Developer Persona & Archetypes
- Goes beyond primary languages by running a multi-dimensional keyword and topic-scanning matrix across repositories.
- Accurately classifies users into deep sub-cultures: *Hardware & IoT Tinkerer, Security & SecOps Researcher, AI/ML Engineer, Mobile Architect, DevOps Cloud Architect, Game Developer, Web3 Builder, Systems Programmer,* or *Open Source Maintainer*.

### 3. 🛡️ Repository Quality & Maintenance Index
- Evaluates active maintenance cycles across public codebases.
- Automatically calculates a codebase health grade (**A+ to C**) based on recent commit velocity and repository upkeep.

### 4. 🧬 Skill DNA & Ecosystem Tech Stack Radar
- Extracts repository topics and names to infer framework proficiencies (Next.js, Docker, Tailwind, Node.js, FastAPI, etc.) rather than just generic languages.
- Features high-density horizontal proportion visualization with Apple-style fluid typography.

### 5. 🏆 Trophy Cabinet & Workflow Rhythms
- Gamifies developer milestones with automated badges (*Old Guard, Star Collector, Prolific Builder, Hardware Hacker*).
- Analyzes update cadences to map out workflow velocity (*High-Velocity Shipper* vs. *Steady Maintainer*).

### 6. ⭐ Impact-Sorted Repository Showcase
- Ranks top repositories intelligently using a weighted signal algorithm combining star counts, fork weights, and recent activity metrics (rather than default alphabetical or chronological sorting).
- Complete with direct GitHub outbound navigation cards.

---

## 🏛️ Architecture & Design System

GitPulse follows strict **Staff Software Engineer architecture guidelines**:
- **Strict Separation of Concerns:** UI components contain zero business logic. All API integration, parsing, and telemetry math live inside isolated modules under `lib/github/`.
- **Component Modularity:** Every feature is built as a single-responsibility component, avoiding bloated "god files."
- **Type Safety:** Strongly typed using TypeScript across all utility models, API parameters, and React components.
- **Micro-Interactions:** Uses Framer Motion for 60FPS fluid physics-based transitions and modal entrances.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router, Server Components & Suspense)
- **Language:** TypeScript 5+
- **Styling:** Tailwind CSS v4 & Custom CSS Variables
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Data Source:** GitHub REST API v3
- **Hosting & CI/CD:** Vercel Edge Network

---

## 📁 Project Structure

```text
app/
    layout.tsx              # Root layout with global theme & background engine
    page.tsx                # Cinematic landing launchpad page
    pulse/
        [username]/
            page.tsx        # Dynamic executive summary results page
            loading.tsx     # Cinematic multi-step telemetry loader
components/
    landing/
        Hero.tsx            # Minimalist typography header
        SearchInput.tsx     # Interactive Gemini search bar
        GeminiBackground.tsx# Global ambient mesh and corner glows
        MouseSpotlight.tsx  # Dynamic cursor tracking light
    layout/
        Navbar.tsx          # Minimalist glassmorphism top navigation
    pulse/
        ProfileHeader.tsx   # Executive profile summary card
        Persona.tsx         # Inferred developer archetype card
        HealthScore.tsx     # Proprietary telemetry score ring
        QualityAuditor.tsx  # Codebase maintenance grade meter
        TechStack.tsx       # Inferred framework radar pills
        Achievements.tsx    # Trophy cabinet & workflow rhythm blocks
        SkillDNA.tsx        # Compact horizontal language breakdown
        RepositoryGrid.tsx  # Impact-sorted project gallery
        RepositoryCard.tsx  # Direct-link interactive project tiles
        ExportCard.tsx      # Shareable profile snapshot module
        ErrorState.tsx      # Premium 404 / User Not Found fallback
lib/
    github/
        api.ts              # Parallelized GitHub REST data fetcher
        parser.ts           # Telemetry intelligence & scoring engine
        language.ts         # Language aggregation & proportion logic
types/
    github.ts               # Strict domain models for users & repos
styles/
    globals.css             # Tailwind v4 directives and custom keyframe glows

```

## 🚀 Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Sreyaaas/GitPulse.git](https://github.com/Sreyaaas/GitPulse.git)
   cd git-pulse
2.  Install dependencies:

    npm install

3.  Run the development server:

    npm run dev

4.  Open http://localhost:3000 in your browser.

👨‍💻 Author

Built with precision engineering by Sreyas Sai
🌐 Portfolio: sreyassai.online
