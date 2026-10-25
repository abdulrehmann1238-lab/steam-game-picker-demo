import React from 'react';
import { ExternalLink, RefreshCw, SlidersHorizontal, RotateCcw, ThumbsUp, ThumbsDown, Calendar, Tag, Shield } from 'lucide-react';
import type { Game } from '../../types/game';
import { formatPrice, formatReviewCount } from '../../utils/formatters';
import { TrailerPlayer } from './TrailerPlayer';

interface GameCardProps {
  game: Game;
  onRevealAnother: () => void;
  onReplayReveal: () => void;
  onChangeFilters: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  onRevealAnother,
  onReplayReveal,
  onChangeFilters
}) => {
  const isPositiveSentiment =
    game.ratingCategory === 'Overwhelmingly Positive' ||
    game.ratingCategory === 'Very Positive' ||
    game.ratingCategory === 'Mostly Positive';

  return (
    <article
      aria-labelledby="revealed-game-title"
      style={{
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
        animation: 'fadeRise 500ms cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Main Game Showcase Card */}
      <div
        className="vault-panel"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          padding: '2.5rem',
          border: '1px solid var(--accent-bronze)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(184, 154, 105, 0.12)'
        }}
      >
        {/* Left Column: Game Artwork */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.7)',
              border: '1px solid var(--border-divider)',
              background: '#0d0f0c',
              aspectRatio: '460 / 215'
            }}
          >
            <img
              src={game.headerImage}
              alt={`${game.name} Steam capsule artwork`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
            {/* Price Tag Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                background: 'rgba(17, 19, 17, 0.9)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--accent-gold)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.4rem 0.85rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--text-ivory)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.6)'
              }}
            >
              {formatPrice(game.priceUsd)}
            </div>
          </div>

          {/* Quick specs pill row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              alignItems: 'center',
              fontSize: '0.78rem',
              color: 'var(--text-muted)'
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.35rem 0.65rem',
                background: 'rgba(34, 38, 32, 0.5)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <Calendar size={13} color="var(--accent-gold)" />
              <span>Released {game.releaseDate}</span>
            </div>
            {game.developer && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.65rem',
                  background: 'rgba(34, 38, 32, 0.5)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <Shield size={13} color="var(--accent-gold)" />
                <span>Dev: {game.developer}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Game Metadata & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            {/* Eyebrow Label */}
            <div className="eyebrow" style={{ marginBottom: '0.5rem' }}>
              Vault Discovery Unsealed
            </div>

            {/* Game Name */}
            <h2
              id="revealed-game-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                lineHeight: 1.12,
                color: 'var(--text-ivory)',
                marginBottom: '1rem'
              }}
            >
              {game.name}
            </h2>

            {/* Rating Category Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                background: isPositiveSentiment ? 'var(--accent-sage-bg)' : 'var(--accent-burgundy-bg)',
                border: `1px solid ${isPositiveSentiment ? 'var(--accent-sage-border)' : 'var(--accent-burgundy-border)'}`,
                color: isPositiveSentiment ? 'var(--accent-sage)' : '#d48884',
                fontSize: '0.85rem',
                fontWeight: 600,
                marginBottom: '1.25rem'
              }}
            >
              {isPositiveSentiment ? <ThumbsUp size={15} /> : <ThumbsDown size={15} />}
              <span>{game.ratingCategory}</span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>•</span>
              <span style={{ color: 'var(--text-ivory)', fontWeight: 700 }}>
                {game.ratingPercentage}%
              </span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>
                ({formatReviewCount(game.reviewCount)} reviews)
              </span>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: '0.92rem',
                lineHeight: 1.6,
                color: 'var(--text-muted)',
                marginBottom: '1.25rem'
              }}
            >
              {game.shortDescription}
            </p>

            {/* Genre Tags */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.45rem',
                marginBottom: '1.75rem'
              }}
            >
              {game.genres.map((genre) => (
                <span
                  key={genre}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.74rem',
                    padding: '0.25rem 0.6rem',
                    background: 'rgba(34, 38, 32, 0.7)',
                    border: '1px solid var(--border-divider)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-ivory)'
                  }}
                >
                  <Tag size={11} color="var(--accent-gold)" />
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Reveal Actions Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a
              href={game.steamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              style={{
                width: '100%',
                padding: '0.95rem 1.5rem',
                fontSize: '0.95rem'
              }}
            >
              <span>Open on Steam</span>
              <ExternalLink size={16} />
            </a>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '0.65rem'
              }}
            >
              <button
                onClick={onRevealAnother}
                className="btn-secondary"
                title="Pick another random game matching your filters"
              >
                <RefreshCw size={14} />
                <span>Reveal Another</span>
              </button>

              <button
                onClick={onReplayReveal}
                className="btn-secondary"
                title="Replay the 3D unsealing animation for this game"
              >
                <RotateCcw size={14} />
                <span>Replay Reveal</span>
              </button>

              <button
                onClick={onChangeFilters}
                className="btn-secondary"
                title="Return to the Filter Laboratory to adjust constraints"
              >
                <SlidersHorizontal size={14} />
                <span>Change Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Gameplay Trailer Section */}
      <TrailerPlayer game={game} />
    </article>
  );
};
