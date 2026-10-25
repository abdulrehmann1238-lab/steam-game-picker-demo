import React from 'react';
import { LootboxLogo } from '../brand/LootboxLogo';
import type { AppStage } from '../../types/filters';
import { ShieldCheck, Database, Sparkles } from 'lucide-react';

interface AppFooterProps {
  onNavigate: (stage: AppStage) => void;
  onOpenArchitecture: () => void;
  onOpenHowItWorks: () => void;
}

export const AppFooter: React.FC<AppFooterProps> = ({
  onNavigate,
  onOpenArchitecture,
  onOpenHowItWorks
}) => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-divider)',
        background: 'rgba(17, 19, 17, 0.95)',
        padding: '3rem 1.75rem 2.5rem',
        marginTop: 'auto',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          <LootboxLogo size="sm" showSubtitle={true} onClick={() => onNavigate('landing')} />
          <p
            style={{
              fontSize: '0.86rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              maxWidth: '320px'
            }}
          >
            A cinematic mystery game reveal experience for Steam discovery. Transforming random selection into an unforgettable event.
          </p>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.72rem',
              color: 'var(--accent-gold)',
              background: 'var(--accent-gold-dim)',
              padding: '0.35rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              width: 'fit-content'
            }}
          >
            <Database size={13} />
            <span>MOCK CATALOG FIXTURE — 100% LOCAL DEMO</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-ivory)'
            }}
          >
            Navigation
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.86rem' }}>
            <button
              onClick={() => onNavigate('landing')}
              style={{ textAlign: 'left', color: 'var(--text-muted)' }}
              onMouseOver={(e) => (e.currentTarget.style.color = 'var(--text-ivory)')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              Cinematic Entry
            </button>
            <button
              onClick={() => onNavigate('filters')}
              style={{ textAlign: 'left', color: 'var(--text-muted)' }}
              onMouseOver={(e) => (e.currentTarget.style.color = 'var(--text-ivory)')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              Discovery Settings
            </button>
            <button
              onClick={() => onNavigate('vault')}
              style={{ textAlign: 'left', color: 'var(--text-muted)' }}
              onMouseOver={(e) => (e.currentTarget.style.color = 'var(--text-ivory)')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              The Mystery Vault
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-ivory)'
            }}
          >
            Production Spec
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.86rem' }}>
            <button
              onClick={onOpenArchitecture}
              style={{
                textAlign: 'left',
                color: 'var(--accent-gold)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Sparkles size={14} />
              Production Architecture Note
            </button>
            <button
              onClick={onOpenHowItWorks}
              style={{ textAlign: 'left', color: 'var(--text-muted)' }}
              onMouseOver={(e) => (e.currentTarget.style.color = 'var(--text-ivory)')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              How The Reveal Engine Works
            </button>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
              60 FPS GPU-Accelerated 3D Transforms
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: '1240px',
          margin: '2rem auto 0',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.78rem',
          color: 'var(--text-dim)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <ShieldCheck size={14} color="var(--accent-sage)" />
          <span>Lootbox Interactive Frontend Prototype — Designed for 1080p/1440p Recording</span>
        </div>
        <span>Steam is a registered trademark of Valve Corporation. Game artwork © respective owners.</span>
      </div>
    </footer>
  );
};
