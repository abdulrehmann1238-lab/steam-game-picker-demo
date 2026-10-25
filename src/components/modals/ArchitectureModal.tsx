import React from 'react';
import { X, Server, Database, Zap, Shield } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  isOpen,
  onClose
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
          maxWidth: '750px',
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
              System Architecture Note (PRD §17)
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.85rem',
                color: 'var(--text-ivory)'
              }}
            >
              From Prototype to Full-Stack Production
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

        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          This prototype operates with zero backend dependencies, utilizing a clean service interface (<code style={{ color: 'var(--accent-gold)' }}>GameRepository</code>). When moving to production, the repository boundary switches seamlessly from <code style={{ color: 'var(--accent-gold)' }}>MockGameRepository</code> to an API-backed client.
        </p>

        {/* 4 Pipeline Stages */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
          <div
            style={{
              padding: '1rem',
              background: 'rgba(34, 38, 32, 0.5)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--accent-gold)' }}>
              <Server size={16} />
              <span style={{ fontSize: '0.86rem', fontWeight: 700 }}>1. Data Ingestion & Crawling</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Periodic background worker collects and normalizes public Steam store catalog records, metadata, pricing, and trailer assets.
            </p>
          </div>

          <div
            style={{
              padding: '1rem',
              background: 'rgba(34, 38, 32, 0.5)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--accent-gold)' }}>
              <Database size={16} />
              <span style={{ fontSize: '0.86rem', fontWeight: 700 }}>2. Indexed Database</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Relational DB (PostgreSQL) indexed on review counts, sentiment percentages, release dates, and base prices for lightning-fast candidate filtering.
            </p>
          </div>

          <div
            style={{
              padding: '1rem',
              background: 'rgba(34, 38, 32, 0.5)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--accent-gold)' }}>
              <Zap size={16} />
              <span style={{ fontSize: '0.86rem', fontWeight: 700 }}>3. Memory Caching & Rate Limits</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Redis cache clusters and CDN edge caching absorb viral traffic surges when YouTube audiences flood the platform simultaneously.
            </p>
          </div>

          <div
            style={{
              padding: '1rem',
              background: 'rgba(34, 38, 32, 0.5)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--accent-gold)' }}>
              <Shield size={16} />
              <span style={{ fontSize: '0.86rem', fontWeight: 700 }}>4. Stateless Random-Pick API</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              <code style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>POST /api/vault/random</code> executes weighted or uniform selection among eligible candidates without exposing internal keys.
            </p>
          </div>
        </div>

        <div
          style={{
            background: '#0d0f0c',
            border: '1px solid var(--border-divider)',
            borderRadius: 'var(--radius-sm)',
            padding: '1rem',
            fontFamily: 'monospace',
            fontSize: '0.78rem',
            color: '#A8AA9F',
            marginBottom: '1.5rem',
            overflowX: 'auto'
          }}
        >
          <div style={{ color: 'var(--accent-gold)', marginBottom: '0.35rem' }}>// Production Repository Contract</div>
          <div>interface GameRepository &#123;</div>
          <div style={{ paddingLeft: '1.25rem' }}>getEligibleCount(filters: GameFilters): Promise&lt;number&gt;;</div>
          <div style={{ paddingLeft: '1.25rem' }}>pickRandomGame(filters: GameFilters, previousId?: string): Promise&lt;Game | null&gt;;</div>
          <div>&#125;</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn-gold" style={{ padding: '0.75rem 1.75rem' }}>
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
