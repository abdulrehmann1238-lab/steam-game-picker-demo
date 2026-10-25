import { useState, useEffect } from 'react';
import { AppHeader } from './components/layout/AppHeader';
import { AppFooter } from './components/layout/AppFooter';
import { LandingPage } from './pages/LandingPage';
import { FilterPage } from './pages/FilterPage';
import { VaultPage } from './pages/VaultPage';
import { HowItWorksModal } from './components/modals/HowItWorksModal';
import { ArchitectureModal } from './components/modals/ArchitectureModal';
import type { GameFilters, AppStage } from './types/filters';
import { MOCK_GAMES } from './data/games';
import { soundEngine } from './utils/audio';
import './styles/global.css';

export function App() {
  const [stage, setStage] = useState<AppStage>('landing');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Modals
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState<boolean>(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState<boolean>(false);

  // Discovery Filters State (PRD defaults)
  const [filters, setFilters] = useState<GameFilters>({
    minReviews: 100,
    maxReviews: 500000,
    rating: 'positive', // Default Mostly Positive per PRD §6.4
    maxAgeYears: null,  // Any age per PRD §6.5
    minPrice: 0,
    maxPrice: 60        // Default $0-$60 per PRD §6.6
  });

  // Check system prefers-reduced-motion on load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setReducedMotion(true);
      }
      const listener = (e: MediaQueryListEvent) => {
        setReducedMotion(e.matches);
      };
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundEngine.setEnabled(nextState);
    if (nextState) {
      soundEngine.playClick();
    }
  };

  const handleToggleReducedMotion = () => {
    soundEngine.playClick();
    setReducedMotion((prev) => !prev);
  };

  const handleNavigate = (newStage: AppStage) => {
    soundEngine.playClick();
    setStage(newStage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={reducedMotion ? 'reduced-motion' : ''}
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-ivory)'
      }}
    >
      {/* Fixed Ambient Lighting and Subtle Film Grain */}
      <div className="vault-ambient-bg" aria-hidden="true">
        <div className="vault-top-gradient" />
        <div className="vault-radial-glow" />
        <div className="vault-bottom-gradient" />
      </div>
      <div className="film-grain-overlay" aria-hidden="true" />

      {/* Main Header */}
      <AppHeader
        currentStage={stage}
        onNavigate={handleNavigate}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={handleToggleReducedMotion}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
      />

      {/* Main Dynamic Stage View */}
      <main style={{ flex: 1, position: 'relative', zIndex: 10 }}>
        {stage === 'landing' && (
          <LandingPage
            onEnterVault={() => handleNavigate('filters')}
            onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
            reducedMotion={reducedMotion}
          />
        )}

        {stage === 'filters' && (
          <FilterPage
            filters={filters}
            onUpdateFilters={setFilters}
            onContinueToVault={() => handleNavigate('vault')}
            allGames={MOCK_GAMES}
          />
        )}

        {stage === 'vault' && (
          <VaultPage
            filters={filters}
            onNavigateToFilters={() => handleNavigate('filters')}
            reducedMotion={reducedMotion}
          />
        )}
      </main>

      {/* Supporting Footer */}
      <AppFooter
        onNavigate={handleNavigate}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
      />

      {/* Modal Dialogs */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
        onEnterVault={() => {
          setIsHowItWorksOpen(false);
          handleNavigate('filters');
        }}
      />

      <ArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />
    </div>
  );
}

export default App;
