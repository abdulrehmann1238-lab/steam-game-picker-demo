import React from 'react';
import type { RevealPhase } from '../../types/filters';
import type { Game } from '../../types/game';
import { BoxParticles } from './BoxParticles';

interface MysteryBox3DProps {
  phase: RevealPhase;
  game: Game | null;
  interactive?: boolean;
  onBoxClick?: () => void;
  reducedMotion?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const MysteryBox3D: React.FC<MysteryBox3DProps> = ({
  phase,
  game,
  interactive = false,
  onBoxClick,
  reducedMotion = false,
  size = 'lg'
}) => {
  const scale = size === 'sm' ? 0.75 : size === 'md' ? 0.88 : 1.0;

  const isAnticipating = phase === 'anticipating';
  const isOpen = phase === 'opening' || phase === 'burst' || phase === 'revealing' || phase === 'complete';
  const showParticles = phase === 'burst' || phase === 'revealing';
  const showCardEmerging = (phase === 'revealing' || phase === 'complete') && game;

  return (
    <div
      style={{
        position: 'relative',
        width: `${380 * scale}px`,
        height: `${380 * scale}px`,
        margin: '0 auto',
        perspective: '1200px',
        perspectiveOrigin: '50% 45%',
        userSelect: 'none',
        cursor: interactive && phase === 'idle' ? 'pointer' : 'default'
      }}
      onClick={interactive && phase === 'idle' ? onBoxClick : undefined}
      role={interactive && phase === 'idle' ? 'button' : undefined}
      aria-label="The Midnight Vault Mystery Box"
      tabIndex={interactive && phase === 'idle' ? 0 : undefined}
      onKeyDown={(e) => {
        if (interactive && phase === 'idle' && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onBoxClick?.();
        }
      }}
    >
      <BoxParticles active={showParticles} reducedMotion={reducedMotion} />

      <div
        style={{
          position: 'absolute',
          bottom: '25px',
          left: '50%',
          width: `${300 * scale}px`,
          height: `${70 * scale}px`,
          transform: 'translateX(-50%)',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.85) 0%, rgba(184, 154, 105, 0.12) 50%, transparent 75%)',
          filter: 'blur(8px)',
          animation: !reducedMotion && phase === 'idle' ? 'shadowPulse 5s ease-in-out infinite' : undefined,
          transition: 'all 500ms ease'
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          width: `${260 * scale}px`,
          height: `${55 * scale}px`,
          transform: 'translateX(-50%) rotateX(65deg)',
          borderRadius: '50%',
          border: '1px solid rgba(128, 105, 74, 0.25)',
          boxShadow: '0 0 25px rgba(184, 154, 105, 0.08)',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '40px',
          left: '50%',
          width: `${240 * scale}px`,
          height: `${220 * scale}px`,
          marginLeft: `${-120 * scale}px`,
          transformStyle: 'preserve-3d',
          transform: isOpen
            ? 'translateY(15px) rotateX(14deg) rotateY(-12deg)'
            : 'rotateX(12deg) rotateY(-18deg)',
          animation: reducedMotion
            ? 'none'
            : isAnticipating
            ? 'anticipationShudder 0.12s linear infinite'
            : phase === 'idle'
            ? 'boxFloat 5s ease-in-out infinite'
            : 'none',
          transition: reducedMotion ? 'none' : 'transform 800ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            right: '20px',
            height: '140px',
            background: 'radial-gradient(ellipse at center, rgba(240, 235, 221, 0.9) 0%, rgba(184, 154, 105, 0.6) 40%, rgba(84, 58, 56, 0.3) 70%, transparent 100%)',
            filter: 'blur(16px)',
            opacity: isOpen ? 0.95 : isAnticipating ? 0.4 : 0,
            transform: 'translateZ(20px)',
            transition: 'opacity 600ms ease',
            pointerEvents: 'none',
            zIndex: 10
          }}
        />

        {/* Front Face */}
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: '0',
            width: `${240 * scale}px`,
            height: `${160 * scale}px`,
            background: 'linear-gradient(145deg, #1e221d 0%, #151814 60%, #111311 100%)',
            border: '2px solid #80694A',
            borderRadius: '4px',
            boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 10px 30px rgba(0, 0, 0, 0.7)',
            transform: `translateZ(${60 * scale}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '10px',
              border: '1px solid rgba(184, 154, 105, 0.35)',
              borderRadius: '2px',
              background: 'linear-gradient(180deg, rgba(34, 38, 32, 0.4) 0%, rgba(20, 23, 19, 0.6) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width={48 * scale} height={48 * scale} viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="#80694A" strokeWidth="1" strokeDasharray="3 2" />
              <path
                d="M16 6L18 13.5L25.5 15.5L18 17.5L16 25L14 17.5L6.5 15.5L14 13.5L16 6Z"
                fill="#B89A69"
                opacity={isOpen ? 0.9 : 0.75}
              />
              <circle cx="16" cy="15.5" r="2" fill="#F0EBDD" />
            </svg>

            <span style={{ position: 'absolute', top: '5px', left: '5px', width: '4px', height: '4px', borderRadius: '50%', background: '#80694A' }} />
            <span style={{ position: 'absolute', top: '5px', right: '5px', width: '4px', height: '4px', borderRadius: '50%', background: '#80694A' }} />
            <span style={{ position: 'absolute', bottom: '5px', left: '5px', width: '4px', height: '4px', borderRadius: '50%', background: '#80694A' }} />
            <span style={{ position: 'absolute', bottom: '5px', right: '5px', width: '4px', height: '4px', borderRadius: '50%', background: '#80694A' }} />
          </div>

          <div
            style={{
              position: 'absolute',
              top: 0,
              width: '24px',
              height: '35px',
              background: 'linear-gradient(180deg, #B89A69 0%, #80694A 100%)',
              border: '1px solid #4b3d2b',
              boxShadow: '0 4px 8px rgba(0,0,0,0.6)',
              zIndex: 3
            }}
          />
        </div>

        {/* Right Side Face */}
        <div
          style={{
            position: 'absolute',
            top: '60px',
            right: `${-60 * scale}px`,
            width: `${120 * scale}px`,
            height: `${160 * scale}px`,
            background: 'linear-gradient(145deg, #151814 0%, #0d0f0c 100%)',
            border: '2px solid #5a4933',
            transform: `rotateY(90deg) translateZ(${60 * scale}px)`,
            borderRadius: '2px'
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '10px',
              border: '1px solid rgba(128, 105, 74, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                width: '40px',
                height: '16px',
                border: '2px solid #80694A',
                borderRadius: '3px'
              }}
            />
          </div>
        </div>

        {/* Interior Cavity */}
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: 0,
            width: `${240 * scale}px`,
            height: `${120 * scale}px`,
            background: 'linear-gradient(180deg, #3d2b29 0%, #1a1413 100%)',
            transform: 'rotateX(-90deg) translateZ(0px)',
            boxShadow: isOpen
              ? 'inset 0 0 45px rgba(240, 235, 221, 0.75), inset 0 0 25px rgba(184, 154, 105, 0.9)'
              : 'inset 0 0 15px rgba(0, 0, 0, 0.95)',
            border: '2px solid #80694A',
            transition: 'box-shadow 600ms ease'
          }}
        />

        {/* Seam Light Leak Line */}
        <div
          style={{
            position: 'absolute',
            top: '58px',
            left: '2px',
            right: '2px',
            height: '4px',
            background: isAnticipating ? '#F0EBDD' : 'transparent',
            boxShadow: isAnticipating ? '0 0 16px #B89A69, 0 0 25px #F0EBDD' : 'none',
            zIndex: 15,
            opacity: isAnticipating ? 1 : 0,
            transition: 'all 300ms ease'
          }}
        />

        {/* The Lid */}
        <div
          style={{
            position: 'absolute',
            top: '15px',
            left: `${-5 * scale}px`,
            width: `${250 * scale}px`,
            height: `${55 * scale}px`,
            transformStyle: 'preserve-3d',
            transformOrigin: `center top ${-60 * scale}px`,
            transform: isOpen
              ? `rotateX(-125deg) translateY(${-30 * scale}px)`
              : 'rotateX(0deg)',
            transition: reducedMotion
              ? 'none'
              : 'transform 950ms cubic-bezier(0.22, 1, 0.36, 1)',
            zIndex: 20
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${250 * scale}px`,
              height: `${55 * scale}px`,
              background: 'linear-gradient(145deg, #242923 0%, #191c18 60%, #141713 100%)',
              border: '2px solid #B89A69',
              borderRadius: '4px 4px 2px 2px',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.8)',
              transform: `translateZ(${65 * scale}px)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: '4px',
                left: '10px',
                right: '10px',
                height: '1px',
                background: 'rgba(184, 154, 105, 0.6)'
              }}
            />

            <div
              style={{
                width: '36px',
                height: '18px',
                background: 'linear-gradient(180deg, #d4b47d 0%, #80694A 100%)',
                border: '1px solid #4b3d2b',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#111311'
                }}
              />
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${250 * scale}px`,
              height: `${130 * scale}px`,
              background: 'linear-gradient(180deg, #282e26 0%, #1c201c 100%)',
              border: '2px solid #80694A',
              transform: 'rotateX(-90deg) translateZ(0px)',
              boxShadow: 'inset 0 0 25px rgba(0, 0, 0, 0.6)'
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '12px',
                border: '1px solid rgba(184, 154, 105, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.2em',
                  color: 'var(--accent-gold)'
                }}
              >
                VAULT 186
              </span>
            </div>
          </div>
        </div>

        {/* Emerging Game Artwork */}
        {showCardEmerging && game && (
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              left: `${15 * scale}px`,
              width: `${210 * scale}px`,
              height: `${130 * scale}px`,
              borderRadius: '6px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(184, 154, 105, 0.4)',
              border: '2px solid var(--accent-gold)',
              transform: 'translateZ(90px) rotateX(-5deg)',
              animation: reducedMotion ? 'none' : 'fadeRise 600ms cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 30,
              background: '#191C19'
            }}
          >
            <img
              src={game.headerImage}
              alt={game.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '0.5rem',
                background: 'linear-gradient(0deg, rgba(17, 19, 17, 0.95) 0%, transparent 100%)',
                color: 'var(--text-ivory)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.9rem',
                fontWeight: 700,
                textAlign: 'center'
              }}
            >
              {game.name}
            </div>
          </div>
        )}
      </div>

      {interactive && phase === 'idle' && (
        <div
          style={{
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '0.35rem 0.85rem',
            background: 'rgba(34, 38, 32, 0.9)',
            border: '1px solid var(--accent-bronze)',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--accent-gold)',
            boxShadow: 'var(--shadow-sm)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          Click to Unseal
        </div>
      )}
    </div>
  );
};
