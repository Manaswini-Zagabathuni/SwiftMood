import React from 'react';

export default function TypingIndicator() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      animation: 'fadeUp 0.3s ease both',
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #f2c4c4, #c9a84c)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        flexShrink: 0,
      }}>🎵</div>
      <div style={{
        background: 'rgba(255,255,255,0.85)',
        border: '1px solid rgba(242,196,196,0.4)',
        borderRadius: '20px 20px 20px 4px',
        padding: '14px 20px',
        display: 'flex',
        gap: '5px',
        alignItems: 'center',
        backdropFilter: 'blur(8px)',
      }}>
        {[0, 0.2, 0.4].map((delay, i) => (
          <div key={i} style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#c9717b',
            animation: `pulse 1.2s ease-in-out ${delay}s infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}
