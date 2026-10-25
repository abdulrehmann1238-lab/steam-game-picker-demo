import React, { useState, useRef } from 'react';
import { Play, AlertCircle, ExternalLink } from 'lucide-react';
import type { Game } from '../../types/game';

interface TrailerPlayerProps {
  game: Game;
}

export const TrailerPlayer: React.FC<TrailerPlayerProps> = ({ game }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlayClick = () => {
    setIsPlaying(true);
    setHasError(false);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          setHasError(true);
        });
      }
    }, 100);
  };

  const handleVideoError = () => {
    setHasError(true);
  };

  return (
    <section
      aria-labelledby="trailer-preview-heading"
      style={{
        marginTop: '2.5rem',
        width: '100%'
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div className="eyebrow" style={{ marginBottom: '0.35rem' }}>
          Gameplay Preview
        </div>
        <h3
          id="trailer-preview-heading"
          className="section-title"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-ivory)' }}
        >
          Take a Closer Look
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          See what you've discovered inside The Midnight Vault.
        </p>
      </div>

      {/* 16:9 Player Frame */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%', // 16:9 Aspect Ratio
          background: '#0d0f0c',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-card)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden'
        }}
      >
        {/* Error / Fallback State */}
        {hasError ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              textAlign: 'center',
              background: 'radial-gradient(circle at center, rgba(84, 58, 56, 0.4) 0%, #111311 80%)'
            }}
          >
            <AlertCircle size={36} color="var(--accent-gold)" style={{ marginBottom: '1rem' }} />
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                color: 'var(--text-ivory)',
                marginBottom: '0.5rem'
              }}
            >
              Preview unavailable in this browser environment
            </h4>
            <p
              style={{
                fontSize: '0.86rem',
                color: 'var(--text-muted)',
                maxWidth: '440px',
                marginBottom: '1.5rem',
                lineHeight: 1.5
              }}
            >
              Direct video playback for {game.name} is restricted or unbundled. You can view the full official trailer and broadcast on the Steam store page.
            </p>
            <a
              href={game.steamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}
            >
              <span>Watch on Steam Store</span>
              <ExternalLink size={14} />
            </a>
          </div>
        ) : isPlaying ? (
          /* Actual Video Player */
          <video
            ref={videoRef}
            src={game.trailerUrl}
            poster={game.trailerThumbnail || game.headerImage}
            controls
            autoPlay
            playsInline
            onError={handleVideoError}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ) : (
          /* Thumbnail Overlay with Restrained Play CTA */
          <div
            onClick={handlePlayClick}
            style={{
              position: 'absolute',
              inset: 0,
              cursor: 'pointer',
              overflow: 'hidden'
            }}
            role="button"
            tabIndex={0}
            aria-label={`Play trailer preview for ${game.name}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handlePlayClick();
              }
            }}
          >
            <img
              src={game.trailerThumbnail || game.heroImage || game.headerImage}
              alt={`${game.name} trailer thumbnail`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.72) contrast(1.05)',
                transition: 'transform 400ms ease, filter 400ms ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.filter = 'brightness(0.85) contrast(1.08)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.filter = 'brightness(0.72) contrast(1.05)';
              }}
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(17, 19, 17, 0.25) 0%, rgba(17, 19, 17, 0.75) 100%)'
              }}
            />

            <div
              style={{
                position: 'absolute',
                top: '1.25rem',
                left: '1.25rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 0.75rem',
                background: 'rgba(17, 19, 17, 0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(184, 154, 105, 0.4)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent-gold)',
                fontWeight: 700
              }}
            >
              <span>GAMEPLAY PREVIEW</span>
            </div>

            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.85rem'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(17, 19, 17, 0.88)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid var(--accent-gold)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(184, 154, 105, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-gold)',
                  transition: 'transform 200ms ease, box-shadow 200ms ease'
                }}
              >
                <Play size={26} fill="var(--accent-gold)" style={{ marginLeft: '3px' }} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-ivory)',
                  textShadow: '0 2px 8px rgba(0,0,0,0.8)'
                }}
              >
                Launch Trailer Preview
              </span>
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '1.25rem',
                right: '1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
              }}
            >
              <div>
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.45rem',
                    color: 'var(--text-ivory)',
                    textShadow: '0 2px 8px rgba(0,0,0,0.8)'
                  }}
                >
                  {game.name}
                </h4>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {game.developer} • {game.releaseYear}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
