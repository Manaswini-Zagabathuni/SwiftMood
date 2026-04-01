import React from 'react';
import { MOOD_CHIPS } from './moods.js';

export default function MoodChips({ onSelect, disabled }) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      padding: '4px 0 8px',
    }}>
      {MOOD_CHIPS.map((chip) => (
        <button
          key={chip.label}
          onClick={() => onSelect(chip.prompt)}
          disabled={disabled}
          style={{
            padding: '7px 14px',
            borderRadius: '100px',
            border: '1.5px solid rgba(201,113,123,0.35)',
            background: 'rgba(255,255,255,0.7)',
            color: '#7a2c3e',
            fontSize: '0.78rem',
            fontFamily: 'var(--font-body)',
            fontWeight: '500',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(6px)',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => {
            if (!disabled) {
              e.target.style.background = 'rgba(201,113,123,0.15)';
              e.target.style.borderColor = '#c9717b';
              e.target.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={e => {
            e.target.style.background = 'rgba(255,255,255,0.7)';
            e.target.style.borderColor = 'rgba(201,113,123,0.35)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}
