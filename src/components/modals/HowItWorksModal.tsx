import React from 'react';
import { X, Filter, Box, Sparkles, CheckCircle2 } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnterVault: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  isOpen,
  onClose,
  onEnterVault
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(10px)'
      }}
      onClick={onClose}
    >
      <div
        className="vault-panel"
        style={{
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '1px solid var(--accent-bronze)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border-divider)'
          }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: '0.25rem' }}>
              Process & Philosophy
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.85rem',
                color: 'var(--text-ivory)'
              }}
            >
              How Lootbox Works
            </h2>
          </div>
          <button
            onClick={onClose}
            className="btn-ghost"
            style={{ padding: '0.4rem' }}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* 3 Step Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Step 1 */}
          <div
            style={{
              display: 'flex',
              gap: '1.25rem',
              padding: '1.25rem',
              background: 'rgba(34, 38, 32, 0.5)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'var(--accent-gold-dim)',
                border: '1px solid var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-gold)'
              }}
            >
              <Filter size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-ivory)', marginBottom: '0.35rem' }}>
                01. Sculpt Your Discovery Pool
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                Filter by Steam review count (from boutique indie gems to legendary blockbusters), reception sentiment (Positive, Negative, or Any), maximum release age, and price range.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div
            style={{
              display: 'flex',
              gap: '1.25rem',
              padding: '1.25rem',
              background: 'rgba(34, 38, 32, 0.5)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'var(--accent-gold-dim)',
                border: '1px solid var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-gold)'
              }}
            >
              <Box size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-ivory)', marginBottom: '0.35rem' }}>
                02. The Hero Unsealing Sequence
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                Step into The Midnight Vault. Initiate the opening of a physical 3D container featuring realistic metal bevels, a hinged lid, warm interior illumination, and golden ember bursts.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div
            style={{
              display: 'flex',
              gap: '1.25rem',
              padding: '1.25rem',
              background: 'rgba(34, 38, 32, 0.5)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'var(--accent-gold-dim)',
                border: '1px solid var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-gold)'
              }}
            >
              <Sparkles size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-ivory)', marginBottom: '0.35rem' }}>
                03. Play, Watch, or Store
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                Inspect high-res artwork, review ratios, release metadata, and launch the 16:9 gameplay trailer preview or jump directly to the official Steam store page.
              </p>
            </div>
          </div>
        </div>

        {/* Quality Guarantees */}
        <div
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'rgba(25, 28, 25, 0.8)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <CheckCircle2 size={14} color="var(--accent-sage)" />
            <span>Deterministic local filtering: Every revealed game strictly satisfies active filters.</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <CheckCircle2 size={14} color="var(--accent-sage)" />
            <span>Smooth 60 FPS GPU-accelerated CSS 3D transforms without heavy game engines.</span>
          </div>
        </div>

        {/* Footer CTA */}
        <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '0.75rem 1.25rem' }}>
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onEnterVault();
            }}
            className="btn-gold"
            style={{ padding: '0.75rem 1.5rem' }}
          >
            Launch Discovery
          </button>
        </div>
      </div>
    </div>
  );
};
