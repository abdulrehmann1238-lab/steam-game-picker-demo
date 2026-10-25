import React from 'react';
import { ArrowRight, Compass, Filter, Sparkles, Box } from 'lucide-react';
import { MysteryBox3D } from '../components/lootbox/MysteryBox3D';
import { soundEngine } from '../utils/audio';

interface LandingPageProps {
  onEnterVault: () => void;
  onOpenHowItWorks: () => void;
  reducedMotion?: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterVault,
  onOpenHowItWorks,
  reducedMotion = false
}) => {
  const handleCtaClick = () => {
    soundEngine.playClick();
    onEnterVault();
  };

  const handleBoxClick = () => {
    soundEngine.playClick();
    onEnterVault();
  };

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 10,
        minHeight: 'calc(100vh - 75px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3rem 1.75rem 5rem'
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center'
        }}
      >
        {/* Left Column: Hero Editorial Typography & CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Eyebrow badge */}
          <div className="eyebrow">
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-gold)'
              }}
            />
            <span>The Midnight Vault • Steam Discovery Experience</span>
          </div>

          {/* Hero Headline */}
          <h1
            className="hero-title"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--text-ivory)',
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.7)'
            }}
          >
            Some games are <br />
            <span style={{ color: 'var(--accent-gold)', fontStyle: 'italic' }}>
              waiting to be found.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p
            className="body-lead"
            style={{
              maxWidth: '520px',
              color: 'var(--text-muted)'
            }}
          >
            Set your filters. Take your chances. Unseal the vault to discover the next Steam game you never knew you needed.
          </p>

          {/* Primary CTA and Secondary Link */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1.25rem',
              marginTop: '0.5rem'
            }}
          >
            <button
              onClick={handleCtaClick}
              className="btn-gold"
              style={{
                fontSize: '1rem',
                padding: '1rem 2.25rem'
              }}
              id="hero-enter-vault-btn"
            >
              <span>ENTER THE VAULT</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={onOpenHowItWorks}
              className="btn-secondary"
              style={{
                padding: '0.95rem 1.6rem',
                fontSize: '0.92rem'
              }}
            >
              <Compass size={16} />
              <span>How It Works</span>
            </button>
          </div>

          {/* Microcopy */}
          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-dim)',
              letterSpacing: '0.04em'
            }}
          >
            Thousands of possibilities. One unexpected discovery.
          </p>

          {/* Feature Highlights Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '1rem',
              marginTop: '1.5rem',
              paddingTop: '1.75rem',
              borderTop: '1px solid var(--border-divider)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Filter size={18} color="var(--accent-gold)" />
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-ivory)' }}>
                  Tailored Pool
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                  Reviews, sentiment & age
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Box size={18} color="var(--accent-gold)" />
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-ivory)' }}>
                  Tactile 3D Reveal
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                  60 FPS unsealing sequence
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Sparkles size={18} color="var(--accent-gold)" />
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-ivory)' }}>
                  Instant Steam Link
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                  Trailer & metadata ready
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Physical 3D Mystery Box Centerpiece */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          {/* Subtle warm halo behind box */}
          <div
            style={{
              position: 'absolute',
              width: '360px',
              height: '360px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at center, rgba(184, 154, 105, 0.15) 0%, rgba(128, 105, 74, 0.05) 50%, transparent 70%)',
              filter: 'blur(35px)',
              pointerEvents: 'none'
            }}
          />

          <MysteryBox3D
            phase="idle"
            game={null}
            interactive={true}
            onBoxClick={handleBoxClick}
            reducedMotion={reducedMotion}
            size="lg"
          />
        </div>
      </div>
    </div>
  );
};
