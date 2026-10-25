import React from 'react';

interface LootboxLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  onClick?: () => void;
}

export const LootboxLogo: React.FC<LootboxLogoProps> = ({
  size = 'md',
  showSubtitle = false,
  onClick
}) => {
  const iconSizes = {
    sm: 24,
    md: 32,
    lg: 42
  };

  const fontSizes = {
    sm: '1.15rem',
    md: '1.45rem',
    lg: '1.95rem'
  };

  const currentIconSize = iconSizes[size];

  return (
    <div
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size === 'lg' ? '0.85rem' : '0.65rem',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none'
      }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Emblem: Vault container with keyhole star motif */}
      <svg
        width={currentIconSize}
        height={currentIconSize}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Subtle glow filter */}
        <defs>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer beveled frame */}
        <rect
          x="3"
          y="5"
          width="26"
          height="22"
          rx="3"
          fill="#191C19"
          stroke="#80694A"
          strokeWidth="1.5"
        />

        {/* Inner chamfered inset */}
        <rect
          x="5.5"
          y="7.5"
          width="21"
          height="17"
          rx="1.5"
          stroke="rgba(184, 154, 105, 0.4)"
          strokeWidth="0.75"
        />

        {/* Lid seam line */}
        <line
          x1="3"
          y1="12"
          x2="29"
          y2="12"
          stroke="#B89A69"
          strokeWidth="1.25"
        />

        {/* Center Keyhole Emblem / 4-Point Discovery Star */}
        <g filter="url(#goldGlow)">
          <path
            d="M16 11L17.2 13.8L20 15L17.2 16.2L16 19L14.8 16.2L12 15L14.8 13.8L16 11Z"
            fill="#B89A69"
          />
          <circle cx="16" cy="15" r="1.2" fill="#F0EBDD" />
        </g>

        {/* Corner rivets */}
        <circle cx="6" cy="8" r="0.75" fill="#80694A" />
        <circle cx="26" cy="8" r="0.75" fill="#80694A" />
        <circle cx="6" cy="24" r="0.75" fill="#80694A" />
        <circle cx="26" cy="24" r="0.75" fill="#80694A" />
      </svg>

      {/* Wordmark */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: fontSizes[size],
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: 'var(--text-ivory)',
            lineHeight: 1
          }}
        >
          LOOTBOX
        </span>
        {showSubtitle && (
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.62rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--accent-gold)',
              marginTop: '0.2rem'
            }}
          >
            The Midnight Vault
          </span>
        )}
      </div>
    </div>
  );
};
