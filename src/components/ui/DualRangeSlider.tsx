import React from 'react';

interface DualRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  minValue: number;
  maxValue: number;
  onChange: (minVal: number, maxVal: number) => void;
  formatValue?: (val: number) => string;
}

export const DualRangeSlider: React.FC<DualRangeSliderProps> = ({
  min,
  max,
  step = 1,
  minValue,
  maxValue,
  onChange,
  formatValue = (v) => v.toString()
}) => {
  const minPercent = Math.min(100, Math.max(0, ((minValue - min) / (max - min)) * 100));
  const maxPercent = Math.min(100, Math.max(0, ((maxValue - min) / (max - min)) * 100));

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), maxValue - step);
    onChange(val, maxValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), minValue + step);
    onChange(minValue, val);
  };

  return (
    <div style={{ position: 'relative', width: '100%', padding: '1rem 0' }}>
      {/* Slider Track Background */}
      <div
        style={{
          position: 'relative',
          height: '6px',
          width: '100%',
          backgroundColor: 'var(--border-divider)',
          borderRadius: '3px'
        }}
      >
        {/* Active Range Fill in Antique Gold */}
        <div
          style={{
            position: 'absolute',
            height: '100%',
            left: `${minPercent}%`,
            width: `${Math.max(0, maxPercent - minPercent)}%`,
            backgroundColor: 'var(--accent-gold)',
            borderRadius: '3px',
            boxShadow: '0 0 10px rgba(184, 154, 105, 0.4)'
          }}
        />
      </div>

      {/* Range inputs overlapping on top */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minValue}
        onChange={handleMinChange}
        aria-label="Minimum value"
        style={{
          position: 'absolute',
          top: '4px',
          left: 0,
          width: '100%',
          pointerEvents: 'none',
          WebkitAppearance: 'none',
          appearance: 'none',
          background: 'none',
          height: '20px',
          margin: 0,
          zIndex: minValue > max - 100 ? 5 : 3
        }}
        className="dual-slider-thumb"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxValue}
        onChange={handleMaxChange}
        aria-label="Maximum value"
        style={{
          position: 'absolute',
          top: '4px',
          left: 0,
          width: '100%',
          pointerEvents: 'none',
          WebkitAppearance: 'none',
          appearance: 'none',
          background: 'none',
          height: '20px',
          margin: 0,
          zIndex: 4
        }}
        className="dual-slider-thumb"
      />

      <style>{`
        .dual-slider-thumb::-webkit-slider-thumb {
          pointer-events: auto;
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--text-ivory);
          border: 2px solid var(--accent-gold);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
          cursor: pointer;
          transition: transform 150ms ease, box-shadow 150ms ease;
        }
        .dual-slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 0 12px var(--accent-gold);
        }
        .dual-slider-thumb::-moz-range-thumb {
          pointer-events: auto;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--text-ivory);
          border: 2px solid var(--accent-gold);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
          cursor: pointer;
          transition: transform 150ms ease;
        }
      `}</style>

      {/* Min/Max Boundary Labels */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0.45rem',
          fontSize: '0.75rem',
          color: 'var(--text-dim)',
          fontFamily: 'var(--font-sans)'
        }}
      >
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
};
