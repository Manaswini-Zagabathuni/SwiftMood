import React from 'react';

const styles = {
  wrapper: (role) => ({
    display: 'flex',
    justifyContent: role === 'user' ? 'flex-end' : 'flex-start',
    animation: 'fadeUp 0.35s ease both',
    marginBottom: '4px',
  }),
  bubble: (role) => ({
    maxWidth: '78%',
    padding: role === 'user' ? '12px 18px' : '16px 20px',
    borderRadius: role === 'user'
      ? '20px 20px 4px 20px'
      : '20px 20px 20px 4px',
    background: role === 'user'
      ? 'linear-gradient(135deg, #7a2c3e, #c9717b)'
      : 'rgba(255,255,255,0.85)',
    color: role === 'user' ? '#fdf6ec' : '#1a1017',
    fontSize: '0.92rem',
    lineHeight: '1.65',
    boxShadow: role === 'user'
      ? '0 4px 16px rgba(122,44,62,0.25)'
      : '0 2px 12px rgba(0,0,0,0.08)',
    backdropFilter: 'blur(8px)',
    border: role === 'user' ? 'none' : '1px solid rgba(242,196,196,0.4)',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  }),
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #f2c4c4, #c9a84c)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    flexShrink: 0,
    marginRight: '8px',
    marginTop: '4px',
    boxShadow: '0 2px 8px rgba(201,160,76,0.3)',
  },
};

export default function Message({ role, content }) {
  return (
    <div style={styles.wrapper(role)}>
      {role === 'assistant' && (
        <div style={styles.avatar}>🎵</div>
      )}
      <div style={styles.bubble(role)}>
        {content}
      </div>
    </div>
  );
}
