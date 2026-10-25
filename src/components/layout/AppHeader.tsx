import React from 'react';
import { Volume2, VolumeX, Eye, HelpCircle } from 'lucide-react';
import { LootboxLogo } from '../brand/LootboxLogo';
import type { AppStage } from '../../types/filters';

interface AppHeaderProps {
  currentStage: AppStage;
  onNavigate: (stage: AppStage) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onOpenHowItWorks: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentStage,
  onNavigate,
  soundEnabled,
  onToggleSound,
  reducedMotion,
  onToggleReducedMotion,
  onOpenHowItWorks
}) => {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        width: '100%',
        padding: '0.9rem 1.75rem',
        background: 'rgba(17, 19, 17, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(52, 55, 47, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 200ms ease'
      }}
    >
      <LootboxLogo
        size="md"
        showSubtitle={true}
        onClick={() => onNavigate('landing')}
      />

      <nav
        aria-label="Main Navigation"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          fontSize: '0.82rem',
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase'
        }}
        className="hide-on-mobile"
      >
        <button
          onClick={() => onNavigate('landing')}
          style={{
            color: currentStage === 'landing' ? 'var(--text-ivory)' : 'var(--text-muted)',
            position: 'relative',
            padding: '0.35rem 0.2rem',
            borderBottom: currentStage === 'landing' ? '2px solid var(--accent-gold)' : '2px solid transparent'
          }}
        >
          Overview
        </button>
        <button
          onClick={() => onNavigate('filters')}
          style={{
            color: currentStage === 'filters' ? 'var(--text-ivory)' : 'var(--text-muted)',
            position: 'relative',
            padding: '0.35rem 0.2rem',
            borderBottom: currentStage === 'filters' ? '2px solid var(--accent-gold)' : '2px solid transparent'
          }}
        >
          Filters
        </button>
        <button
          onClick={() => onNavigate('vault')}
          style={{
            color: currentStage === 'vault' ? 'var(--text-ivory)' : 'var(--text-muted)',
            position: 'relative',
            padding: '0.35rem 0.2rem',
            borderBottom: currentStage === 'vault' ? '2px solid var(--accent-gold)' : '2px solid transparent'
          }}
        >
          The Vault
        </button>
        <button
          onClick={onOpenHowItWorks}
          style={{
            color: 'var(--text-muted)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            padding: '0.35rem 0.2rem'
          }}
          title="Learn how the Lootbox reveal process works"
        >
          <HelpCircle size={14} />
          How It Works
        </button>
      </nav>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.75rem',
            background: 'rgba(25, 28, 25, 0.8)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.7rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)'
          }}
          className="hide-on-mobile"
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-gold)',
              boxShadow: '0 0 8px var(--accent-gold)'
            }}
          />
          Ready to Discover
        </div>

        <button
          onClick={onToggleSound}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-sm)',
            background: soundEnabled ? 'var(--accent-gold-dim)' : 'rgba(34, 38, 32, 0.5)',
            border: `1px solid ${soundEnabled ? 'var(--accent-gold)' : 'var(--border-divider)'}`,
            color: soundEnabled ? 'var(--accent-gold)' : 'var(--text-muted)',
            cursor: 'pointer'
          }}
          title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects (Web Audio)'}
          aria-label={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>

        <button
          onClick={onToggleReducedMotion}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-sm)',
            background: reducedMotion ? 'var(--accent-gold-dim)' : 'rgba(34, 38, 32, 0.5)',
            border: `1px solid ${reducedMotion ? 'var(--accent-gold)' : 'var(--border-divider)'}`,
            color: reducedMotion ? 'var(--accent-gold)' : 'var(--text-muted)',
            cursor: 'pointer'
          }}
          title={reducedMotion ? 'Reduced Motion: ON' : 'Toggle Reduced Motion'}
          aria-label="Toggle Reduced Motion"
        >
          <Eye size={16} />
        </button>
      </div>
    </header>
  );
};
