import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  SlidersHorizontal,
  FastForward,
  Sparkles,
  RefreshCw,
  Box,
  AlertTriangle
} from 'lucide-react';
import type { Game } from '../types/game';
import type { GameFilters, RevealPhase } from '../types/filters';
import { MysteryBox3D } from '../components/lootbox/MysteryBox3D';
import { GameCard } from '../components/game/GameCard';
import { defaultGameRepository } from '../services/mockGameRepository';
import { soundEngine } from '../utils/audio';

interface VaultPageProps {
  filters: GameFilters;
  onNavigateToFilters: () => void;
  reducedMotion?: boolean;
}

export const VaultPage: React.FC<VaultPageProps> = ({
  filters,
  onNavigateToFilters,
  reducedMotion = false
}) => {
  const [phase, setPhase] = useState<RevealPhase>('idle');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [eligibleCount, setEligibleCount] = useState<number>(0);
  const [errorEmpty, setErrorEmpty] = useState<boolean>(false);

  // Animation timeouts management to ensure clean cancellation on unmount or skip
  const timeoutsRef = useRef<number[]>([]);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  // Initial check on mount: verify eligible pool
  useEffect(() => {
    defaultGameRepository.getEligibleCount(filters).then((count) => {
      setEligibleCount(count);
      if (count === 0) {
        setErrorEmpty(true);
      }
    });
  }, [filters]);

  /**
   * Core Reveal Sequence Trigger
   * @param forceGame Optional game to reuse (for Replay Reveal)
   */
  const startRevealSequence = useCallback(
    async (forceGame?: Game) => {
      if (phase !== 'idle' && phase !== 'complete') return;

      // 1. Determine the game before opening sequence starts
      let gameToReveal = forceGame;
      if (!gameToReveal) {
        gameToReveal = (await defaultGameRepository.pickRandomGame(
          filters,
          selectedGame?.id
        )) || undefined;
      }

      if (!gameToReveal) {
        setErrorEmpty(true);
        return;
      }

      setSelectedGame(gameToReveal);
      clearAllTimeouts();

      // If reduced motion is active, skip elaborate motion and jump to completed
      if (reducedMotion) {
        soundEngine.playDiscoveryChime();
        setPhase('complete');
        return;
      }

      // Phase 1: User Commitment (0.0s - 0.25s)
      setPhase('anticipating');
      soundEngine.playUnseal();

      // Phase 2: Anticipation tension (0.25s - 0.85s)
      const t1 = window.setTimeout(() => {
        soundEngine.playUnseal();
      }, 400);

      // Phase 4: Lid Opening (0.85s - 1.8s)
      const t2 = window.setTimeout(() => {
        setPhase('opening');
        soundEngine.playLidOpening();
      }, 850);

      // Phase 5: Discovery burst (1.8s - 2.4s)
      const t3 = window.setTimeout(() => {
        setPhase('burst');
      }, 1800);

      // Phase 6: Game Reveal (2.4s - 3.1s)
      const t4 = window.setTimeout(() => {
        setPhase('revealing');
        soundEngine.playDiscoveryChime();
      }, 2400);

      // Phase 7: Final Result (3.1s+)
      const t5 = window.setTimeout(() => {
        setPhase('complete');
      }, 3200);

      timeoutsRef.current = [t1, t2, t3, t4, t5];
    },
    [clearAllTimeouts, filters, phase, reducedMotion, selectedGame?.id]
  );

  /**
   * Skip animation immediately jumps to Phase 7 Complete
   */
  const handleSkipAnimation = useCallback(() => {
    clearAllTimeouts();
    soundEngine.playClick();
    soundEngine.playDiscoveryChime();
    setPhase('complete');
  }, [clearAllTimeouts]);

  /**
   * Reveal another game from the eligible pool
   */
  const handleRevealAnother = () => {
    clearAllTimeouts();
    setPhase('idle');
    setTimeout(() => {
      startRevealSequence();
    }, 100);
  };

  /**
   * Replay the animation for the same game
   */
  const handleReplayReveal = () => {
    if (!selectedGame) return;
    clearAllTimeouts();
    setPhase('idle');
    setTimeout(() => {
      startRevealSequence(selectedGame);
    }, 100);
  };

  const isAnimating = phase !== 'idle' && phase !== 'complete';

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 10,
        minHeight: 'calc(100vh - 75px)',
        padding: '2rem 1.75rem 5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* Top Vault Subheader Context Bar */}
      <div
        style={{
          width: '100%',
          maxWidth: '1240px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid var(--border-divider)',
          marginBottom: '2rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.75rem',
              background: 'rgba(34, 38, 32, 0.7)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              color: 'var(--accent-gold)',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase'
            }}
          >
            <Box size={14} />
            <span>Mystery Vault Chamber</span>
          </div>

          <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }} className="hide-on-mobile">
            Active Pool: {eligibleCount} game{eligibleCount === 1 ? '' : 's'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Skip Animation Button (Visible when animating) */}
          {isAnimating && (
            <button
              onClick={handleSkipAnimation}
              className="btn-gold"
              style={{
                fontSize: '0.78rem',
                padding: '0.5rem 1rem',
                background: 'var(--accent-gold)',
                color: 'var(--bg-primary)'
              }}
              title="Skip straight to the game discovery"
            >
              <FastForward size={14} />
              <span>SKIP ANIMATION</span>
            </button>
          )}

          {/* Back to Filters Control */}
          <button
            onClick={onNavigateToFilters}
            className="btn-secondary"
            style={{ fontSize: '0.82rem', padding: '0.55rem 1rem' }}
          >
            <SlidersHorizontal size={14} />
            <span>Modify Filters</span>
          </button>
        </div>
      </div>

      {/* Empty State Guard Modal / Alert */}
      {errorEmpty && (
        <div
          className="vault-panel"
          style={{
            maxWidth: '560px',
            margin: '4rem auto',
            textAlign: 'center',
            border: '1px solid var(--accent-burgundy-border)',
            background: 'linear-gradient(180deg, #241a19 0%, #171212 100%)'
          }}
        >
          <AlertTriangle size={42} color="#d48884" style={{ margin: '0 auto 1.25rem' }} />
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              color: 'var(--text-ivory)',
              marginBottom: '0.75rem'
            }}
          >
            Nothing in the vault matches those filters.
          </h2>
          <p
            style={{
              fontSize: '0.92rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              marginBottom: '2rem'
            }}
          >
            Try widening your review count range, allowing older releases, or opening the rating preference to Any Rating.
          </p>
          <button
            onClick={onNavigateToFilters}
            className="btn-gold"
            style={{ padding: '0.85rem 1.85rem' }}
          >
            <SlidersHorizontal size={16} />
            <span>Return to Discovery Settings</span>
          </button>
        </div>
      )}

      {/* Main Chamber Scene (when not empty error) */}
      {!errorEmpty && (
        <div
          style={{
            width: '100%',
            maxWidth: '1240px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* Revealed Phase: Game Card Takes Visual Lead */}
          {phase === 'complete' && selectedGame ? (
            <div style={{ width: '100%' }}>
              <GameCard
                game={selectedGame}
                onRevealAnother={handleRevealAnother}
                onReplayReveal={handleReplayReveal}
                onChangeFilters={onNavigateToFilters}
              />
            </div>
          ) : (
            /* Unrevealed / Opening Sequence: 3D Box Hero Scene */
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                margin: '2rem 0'
              }}
            >
              {/* Scene Heading */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h1
                  className="hero-title"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--text-ivory)',
                    marginBottom: '0.65rem'
                  }}
                >
                  {isAnimating ? 'The Vault is Unsealing...' : 'Something is waiting inside.'}
                </h1>
                <p
                  className="body-lead"
                  style={{
                    color: 'var(--text-muted)',
                    maxWidth: '480px',
                    margin: '0 auto'
                  }}
                >
                  {isAnimating
                    ? 'Decrypting and retrieving your mystery Steam discovery...'
                    : 'One game. Selected completely at random from your filtered pool.'}
                </p>
              </div>

              {/* Physical 3D Mystery Box Centerpiece */}
              <div style={{ margin: '1rem 0 3rem' }}>
                <MysteryBox3D
                  phase={phase}
                  game={selectedGame}
                  interactive={phase === 'idle'}
                  onBoxClick={() => startRevealSequence()}
                  reducedMotion={reducedMotion}
                  size="lg"
                />
              </div>

              {/* Action Buttons & Progress Bar */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1.25rem'
                }}
              >
                {phase === 'idle' ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                    <button
                      onClick={() => startRevealSequence()}
                      className="btn-gold"
                      style={{
                        fontSize: '1.05rem',
                        padding: '1.1rem 2.85rem'
                      }}
                      id="vault-open-box-btn"
                    >
                      <Sparkles size={18} />
                      <span>OPEN THE BOX</span>
                    </button>

                    <button
                      onClick={() => startRevealSequence()}
                      className="btn-secondary"
                      style={{ padding: '1.05rem 1.75rem' }}
                      title="Initiate surprise random unsealing"
                    >
                      <RefreshCw size={16} />
                      <span>Surprise Me</span>
                    </button>
                  </div>
                ) : (
                  /* Animated Opening Status Pill */
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      padding: '0.85rem 1.75rem',
                      background: 'rgba(34, 38, 32, 0.9)',
                      border: '1px solid var(--accent-gold)',
                      borderRadius: 'var(--radius-pill)',
                      boxShadow: '0 0 25px rgba(184, 154, 105, 0.3)'
                    }}
                  >
                    <span
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent-gold)',
                        boxShadow: '0 0 10px var(--accent-gold)'
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--accent-gold-bright)'
                      }}
                    >
                      {phase === 'anticipating' && 'UNSEALING CHAMBER...'}
                      {phase === 'opening' && 'OPENING THE VAULT...'}
                      {phase === 'burst' && 'RELEASING CORE ARTIFACT...'}
                      {phase === 'revealing' && 'DISCOVERY MATERIALIZING...'}
                    </span>
                  </div>
                )}

                <div
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-dim)',
                    marginTop: '0.5rem'
                  }}
                >
                  {phase === 'idle'
                    ? 'Click the box or the unseal button to initiate the discovery sequence.'
                    : 'Deterministic 60 FPS transform-based unsealing sequence.'}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
