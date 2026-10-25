import React, { useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Layers,
  RotateCcw,
  ArrowRight,
  AlertCircle,
  Clock,
  DollarSign,
  MessageSquare
} from 'lucide-react';
import type { GameFilters, RatingFilter, AgeFilter } from '../types/filters';
import type { Game } from '../types/game';
import { DualRangeSlider } from '../components/ui/DualRangeSlider';
import { filterGames } from '../utils/filterGames';
import { formatPrice, formatReviewCount } from '../utils/formatters';
import { soundEngine } from '../utils/audio';

interface FilterPageProps {
  filters: GameFilters;
  onUpdateFilters: (filters: GameFilters) => void;
  onContinueToVault: () => void;
  allGames: Game[];
}

export const FilterPage: React.FC<FilterPageProps> = ({
  filters,
  onUpdateFilters,
  onContinueToVault,
  allGames
}) => {
  // Calculate eligible games and count
  const eligibleGames = useMemo(() => {
    return filterGames(allGames, filters);
  }, [allGames, filters]);

  const eligibleCount = eligibleGames.length;

  // Handlers for updating filters
  const handleReviewChange = (min: number, max: number) => {
    onUpdateFilters({
      ...filters,
      minReviews: min,
      maxReviews: max
    });
  };

  const handleRatingChange = (rating: RatingFilter) => {
    soundEngine.playClick();
    onUpdateFilters({
      ...filters,
      rating
    });
  };

  const handleAgeChange = (maxAgeYears: AgeFilter) => {
    soundEngine.playClick();
    onUpdateFilters({
      ...filters,
      maxAgeYears
    });
  };

  const handlePriceChange = (min: number, max: number) => {
    onUpdateFilters({
      ...filters,
      minPrice: min,
      maxPrice: max
    });
  };

  const handleResetFilters = () => {
    soundEngine.playClick();
    onUpdateFilters({
      minReviews: 100,
      maxReviews: 500000,
      rating: 'positive',
      maxAgeYears: null,
      minPrice: 0,
      maxPrice: 60
    });
  };

  const handleContinue = () => {
    if (eligibleCount === 0) return;
    soundEngine.playClick();
    onContinueToVault();
  };

  const handleWidenFilters = () => {
    soundEngine.playClick();
    onUpdateFilters({
      minReviews: 0,
      maxReviews: 2500000,
      rating: 'all',
      maxAgeYears: null,
      minPrice: 0,
      maxPrice: 70
    });
  };

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '2.5rem 1.75rem 4rem'
      }}
    >
      {/* Header & Stepper */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '1.5rem',
          marginBottom: '2.5rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid var(--border-divider)'
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: '0.4rem' }}>
            Discovery Settings
          </div>
          <h1
            className="page-title"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-ivory)' }}
          >
            Define your next discovery.
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.35rem' }}>
            The constraints you set directly filter the local catalog before entering the mystery vault.
          </p>
        </div>

        {/* Stepper Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.5rem 1rem',
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-divider)',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.1em'
          }}
        >
          <span style={{ color: 'var(--accent-gold)' }}>01 FILTERS</span>
          <span style={{ color: 'var(--text-dim)' }}>→</span>
          <span style={{ color: 'var(--text-muted)' }}>02 REVEAL</span>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start'
        }}
      >
        {/* Left Column: Filter Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* ================= FILTER A: STEAM REVIEW COUNT ================= */}
          <div className="vault-panel">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare size={16} color="var(--accent-gold)" />
                <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-ivory)' }}>
                  Steam Review Count
                </h2>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)' }}>
                {formatReviewCount(filters.minReviews)} – {formatReviewCount(filters.maxReviews)}
              </span>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Target niche hidden gems or battle-tested global phenomena.
            </p>

            <DualRangeSlider
              min={0}
              max={1000000}
              step={500}
              minValue={filters.minReviews}
              maxValue={filters.maxReviews}
              onChange={handleReviewChange}
              formatValue={(val) => formatReviewCount(val)}
            />

            {/* Manual Sync Inputs */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginTop: '1rem'
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '0.25rem' }}>
                  Min Reviews
                </label>
                <input
                  type="number"
                  min={0}
                  max={filters.maxReviews}
                  value={filters.minReviews}
                  onChange={(e) => handleReviewChange(Math.max(0, Number(e.target.value)), filters.maxReviews)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-divider)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-ivory)',
                    fontSize: '0.86rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '0.25rem' }}>
                  Max Reviews
                </label>
                <input
                  type="number"
                  min={filters.minReviews}
                  max={2500000}
                  value={filters.maxReviews}
                  onChange={(e) => handleReviewChange(filters.minReviews, Math.max(filters.minReviews, Number(e.target.value)))}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-divider)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-ivory)',
                    fontSize: '0.86rem'
                  }}
                />
              </div>
            </div>
          </div>

          {/* ================= FILTER B: RATING PREFERENCE ================= */}
          <div className="vault-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <TrendingUp size={16} color="var(--accent-gold)" />
              <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-ivory)' }}>
                What kind of reception?
              </h2>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Select between critically acclaimed titles, notorious controversial releases, or the complete spectrum.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '0.85rem'
              }}
            >
              {/* Mostly Positive Option */}
              <button
                type="button"
                onClick={() => handleRatingChange('positive')}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1.1rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  background: filters.rating === 'positive' ? 'var(--accent-sage-bg)' : 'rgba(25, 28, 25, 0.6)',
                  border: `2px solid ${filters.rating === 'positive' ? 'var(--accent-sage)' : 'var(--border-divider)'}`,
                  color: filters.rating === 'positive' ? 'var(--text-ivory)' : 'var(--text-muted)',
                  transform: filters.rating === 'positive' ? 'translateY(-2px)' : 'none',
                  boxShadow: filters.rating === 'positive' ? '0 6px 18px rgba(139, 154, 128, 0.2)' : 'none'
                }}
              >
                <TrendingUp size={22} color={filters.rating === 'positive' ? 'var(--accent-sage)' : 'var(--text-muted)'} />
                <span style={{ fontSize: '0.86rem', fontWeight: 700 }}>Mostly Positive</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>70% - 100% positive</span>
              </button>

              {/* Mostly Negative / Mixed Option */}
              <button
                type="button"
                onClick={() => handleRatingChange('negative')}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1.1rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  background: filters.rating === 'negative' ? 'var(--accent-burgundy-bg)' : 'rgba(25, 28, 25, 0.6)',
                  border: `2px solid ${filters.rating === 'negative' ? 'var(--accent-burgundy-light)' : 'var(--border-divider)'}`,
                  color: filters.rating === 'negative' ? 'var(--text-ivory)' : 'var(--text-muted)',
                  transform: filters.rating === 'negative' ? 'translateY(-2px)' : 'none',
                  boxShadow: filters.rating === 'negative' ? '0 6px 18px rgba(132, 89, 86, 0.25)' : 'none'
                }}
              >
                <TrendingDown size={22} color={filters.rating === 'negative' ? '#d48884' : 'var(--text-muted)'} />
                <span style={{ fontSize: '0.86rem', fontWeight: 700 }}>Mostly Negative</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Mixed & controversial</span>
              </button>

              {/* Any Rating Option */}
              <button
                type="button"
                onClick={() => handleRatingChange('all')}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1.1rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  background: filters.rating === 'all' ? 'var(--accent-gold-dim)' : 'rgba(25, 28, 25, 0.6)',
                  border: `2px solid ${filters.rating === 'all' ? 'var(--accent-gold)' : 'var(--border-divider)'}`,
                  color: filters.rating === 'all' ? 'var(--text-ivory)' : 'var(--text-muted)',
                  transform: filters.rating === 'all' ? 'translateY(-2px)' : 'none',
                  boxShadow: filters.rating === 'all' ? '0 6px 18px rgba(184, 154, 105, 0.2)' : 'none'
                }}
              >
                <Layers size={22} color={filters.rating === 'all' ? 'var(--accent-gold)' : 'var(--text-muted)'} />
                <span style={{ fontSize: '0.86rem', fontWeight: 700 }}>Any Rating</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>All Steam reviews</span>
              </button>
            </div>
          </div>

          {/* ================= FILTER C: MAXIMUM GAME AGE ================= */}
          <div className="vault-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Clock size={16} color="var(--accent-gold)" />
              <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-ivory)' }}>
                How far back should we go?
              </h2>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Define the maximum age from the catalog reference year (2024).
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                gap: '0.5rem'
              }}
            >
              {[
                { label: '1 Year', val: 1 },
                { label: '3 Years', val: 3 },
                { label: '5 Years', val: 5 },
                { label: '10 Years', val: 10 },
                { label: 'Any Age', val: null }
              ].map((opt) => {
                const isSelected = filters.maxAgeYears === opt.val;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleAgeChange(opt.val as AgeFilter)}
                    style={{
                      padding: '0.75rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      background: isSelected ? 'var(--accent-gold-dim)' : 'rgba(25, 28, 25, 0.6)',
                      border: `1px solid ${isSelected ? 'var(--accent-gold)' : 'var(--border-divider)'}`,
                      color: isSelected ? 'var(--accent-gold-bright)' : 'var(--text-muted)',
                      fontWeight: isSelected ? 700 : 500,
                      fontSize: '0.82rem',
                      textAlign: 'center'
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= FILTER D: PRICE RANGE ================= */}
          <div className="vault-panel">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <DollarSign size={16} color="var(--accent-gold)" />
                <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-ivory)' }}>
                  Set your price range
                </h2>
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--accent-gold)' }}>
                {formatPrice(filters.minPrice)} – {formatPrice(filters.maxPrice)}
              </span>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Includes free to play ($0) up to $70 USD.
            </p>

            <DualRangeSlider
              min={0}
              max={70}
              step={1}
              minValue={filters.minPrice}
              maxValue={filters.maxPrice}
              onChange={handlePriceChange}
              formatValue={(val) => formatPrice(val)}
            />

            {/* Synced price inputs */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginTop: '1rem'
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '0.25rem' }}>
                  Min Price (USD)
                </label>
                <input
                  type="number"
                  min={0}
                  max={filters.maxPrice}
                  value={filters.minPrice}
                  onChange={(e) => handlePriceChange(Math.max(0, Number(e.target.value)), filters.maxPrice)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-divider)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-ivory)',
                    fontSize: '0.86rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '0.25rem' }}>
                  Max Price (USD)
                </label>
                <input
                  type="number"
                  min={filters.minPrice}
                  max={70}
                  value={filters.maxPrice}
                  onChange={(e) => handlePriceChange(filters.minPrice, Math.max(filters.minPrice, Number(e.target.value)))}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-divider)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-ivory)',
                    fontSize: '0.86rem'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Selection Summary & Primary Action */}
        <div style={{ position: 'sticky', top: '90px' }}>
          <div
            className="vault-panel"
            style={{
              border: '1px solid var(--accent-bronze)',
              boxShadow: 'var(--shadow-lg)',
              background: 'linear-gradient(180deg, #1d211c 0%, #151814 100%)'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <span className="eyebrow">Active Pool Summary</span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="btn-ghost"
                style={{ fontSize: '0.75rem' }}
                title="Reset all filters to defaults"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            </div>

            {/* Real-time Eligible Games Count Ticker */}
            <div
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(17, 19, 17, 0.75)',
                border: '1px solid var(--border-card)',
                textAlign: 'center',
                marginBottom: '1.5rem'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3.75rem',
                  lineHeight: 1,
                  fontWeight: 700,
                  color: eligibleCount > 0 ? 'var(--accent-gold)' : '#d48884',
                  animation: 'countBump 300ms ease'
                }}
              >
                {eligibleCount}
              </div>
              <div
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: 'var(--text-ivory)',
                  marginTop: '0.45rem'
                }}
              >
                {eligibleCount === 1 ? 'Eligible Game Ready' : 'Eligible Games in Pool'}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                Out of {allGames.length} curated catalog titles
              </div>
            </div>

            {/* Active Constraints Pills */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                fontSize: '0.8rem',
                marginBottom: '1.75rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Reviews:</span>
                <span style={{ color: 'var(--text-ivory)', fontWeight: 600 }}>
                  {formatReviewCount(filters.minReviews)} – {formatReviewCount(filters.maxReviews)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Reception:</span>
                <span style={{ color: 'var(--text-ivory)', fontWeight: 600, textTransform: 'capitalize' }}>
                  {filters.rating === 'all' ? 'Any Rating' : filters.rating === 'positive' ? 'Mostly Positive (70%+)' : 'Mixed / Negative'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Max Age:</span>
                <span style={{ color: 'var(--text-ivory)', fontWeight: 600 }}>
                  {filters.maxAgeYears ? `Within ${filters.maxAgeYears} year(s)` : 'Any Age'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0' }}>
                <span style={{ color: 'var(--text-muted)' }}>Price Range:</span>
                <span style={{ color: 'var(--text-ivory)', fontWeight: 600 }}>
                  {formatPrice(filters.minPrice)} – {formatPrice(filters.maxPrice)}
                </span>
              </div>
            </div>

            {/* Empty State Warning or Thumbnails Preview */}
            {eligibleCount === 0 ? (
              <div
                style={{
                  padding: '1.25rem',
                  background: 'var(--accent-burgundy-bg)',
                  border: '1px solid var(--accent-burgundy-border)',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f0b0ac' }}>
                  <AlertCircle size={18} />
                  <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>No matching games in pool</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-ivory)', lineHeight: 1.5 }}>
                  Nothing in the vault matches those specific constraints. Try widening your review range, allowing older releases, or setting rating to "Any".
                </p>
                <button
                  type="button"
                  onClick={handleWidenFilters}
                  className="btn-secondary"
                  style={{ width: '100%', fontSize: '0.82rem', padding: '0.65rem' }}
                >
                  Widen Filters
                </button>
              </div>
            ) : (
              /* Stacked preview thumbnails of games in pool */
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>
                  Sample Candidates in Current Pool:
                </div>
                <div style={{ display: 'flex', gap: '0.45rem', overflowX: 'auto', paddingBottom: '0.35rem' }}>
                  {eligibleGames.slice(0, 5).map((g) => (
                    <div
                      key={g.id}
                      style={{
                        flexShrink: 0,
                        width: '74px',
                        height: '42px',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        border: '1px solid var(--border-divider)',
                        background: '#111311'
                      }}
                      title={`${g.name} (${formatPrice(g.priceUsd)})`}
                    >
                      <img
                        src={g.headerImage}
                        alt={g.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => ((e.currentTarget as HTMLElement).style.display = 'none')}
                      />
                    </div>
                  ))}
                  {eligibleGames.length > 5 && (
                    <div
                      style={{
                        flexShrink: 0,
                        width: '42px',
                        height: '42px',
                        borderRadius: '3px',
                        background: 'rgba(34, 38, 32, 0.8)',
                        border: '1px solid var(--border-divider)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.74rem',
                        color: 'var(--accent-gold)',
                        fontWeight: 700
                      }}
                    >
                      +{eligibleGames.length - 5}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Primary Continue Button */}
            <button
              type="button"
              onClick={handleContinue}
              disabled={eligibleCount === 0}
              className="btn-gold"
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '0.96rem'
              }}
              id="continue-to-vault-btn"
            >
              <span>CONTINUE TO THE VAULT</span>
              <ArrowRight size={18} />
            </button>

            <p
              style={{
                textAlign: 'center',
                fontSize: '0.74rem',
                color: 'var(--text-dim)',
                marginTop: '0.75rem'
              }}
            >
              Your filters stay with you until you change them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
