import React, { useState, useRef, useEffect } from 'react';
import Message from './Message.jsx';
import TypingIndicator from './TypingIndicator.jsx';
import MoodChips from './MoodChips.jsx';
import { getMoodRecommendations } from './api.js';

const WELCOME = `Hey Swiftie! 💫 I'm SwiftMood — your personal Taylor Swift song matchmaker.

Tell me how you're feeling right now, and I'll find the perfect songs for your mood. You can describe your emotions, share what's happening in your life, or just pick a vibe below. 

What's going on with you today?`;

const floatingNotes = ['🎵', '🎶', '✨', '🌙', '💫', '🎸'];

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [keyEntered, setKeyEntered] = useState(false);
  const [keyError, setKeyError] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const beginChat = () => {
    if (!apiKey.trim().startsWith('sk-ant-')) {
      setKeyError('Please enter a valid Anthropic API key (starts with sk-ant-)');
      return;
    }
    setKeyError('');
    setKeyEntered(true);
    setStarted(true);
    setMessages([{ role: 'assistant', content: WELCOME }]);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput('');

    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const apiMessages = newMessages.map(m => ({ role: m.role, content: m.content }));
      const reply = await getMoodRecommendations(apiMessages, apiKey);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Oops, something went wrong 😔 — ${err.message}. Please check your API key and try again.`,
      }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #fdf6ec 0%, #f5e6e8 40%, #ede0f0 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Floating background notes */}
      {floatingNotes.map((note, i) => (
        <div key={i} style={{
          position: 'absolute',
          fontSize: `${16 + (i % 3) * 8}px`,
          opacity: 0.08 + (i % 4) * 0.03,
          left: `${10 + i * 15}%`,
          top: `${8 + (i * 13) % 80}%`,
          animation: `float ${4 + i * 0.7}s ease-in-out ${i * 0.5}s infinite`,
          userSelect: 'none',
          pointerEvents: 'none',
        }}>{note}</div>
      ))}

      {/* Soft radial glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 30% 20%, rgba(201,113,123,0.12) 0%, transparent 60%), radial-gradient(ellipse at 75% 80%, rgba(201,160,76,0.10) 0%, transparent 55%)',
        pointerEvents: 'none',
      }} />

      {/* Card */}
      <div style={{
        width: '100%',
        maxWidth: '660px',
        height: '90vh',
        maxHeight: '780px',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(253,246,236,0.75)',
        backdropFilter: 'blur(20px)',
        borderRadius: '28px',
        boxShadow: '0 24px 80px rgba(122,44,62,0.15), 0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
        border: '1px solid rgba(242,196,196,0.5)',
        overflow: 'hidden',
        margin: '0 16px',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Header */}
        <div style={{
          padding: '20px 28px 18px',
          borderBottom: '1px solid rgba(242,196,196,0.35)',
          background: 'rgba(255,255,255,0.4)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px', height: '44px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #7a2c3e, #c9a84c)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px',
              boxShadow: '0 4px 14px rgba(122,44,62,0.3)',
            }}>🎵</div>
            <div>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.45rem',
                fontWeight: '700',
                color: '#7a2c3e',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}>SwiftMood</h1>
              <p style={{
                fontSize: '0.75rem',
                color: '#c9717b',
                marginTop: '3px',
                fontWeight: '400',
                letterSpacing: '0.02em',
              }}>Taylor Swift · Mood Matchmaker</p>
            </div>
            {keyEntered && (
              <div style={{
                marginLeft: 'auto',
                background: 'rgba(201,168,76,0.15)',
                border: '1px solid rgba(201,168,76,0.4)',
                borderRadius: '100px',
                padding: '4px 12px',
                fontSize: '0.7rem',
                color: '#8a6a1a',
                fontWeight: '500',
              }}>✦ Connected</div>
            )}
          </div>
        </div>

        {/* Content area */}
        {!keyEntered ? (
          // API Key screen
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 36px',
            gap: '24px',
            animation: 'fadeUp 0.5s ease both',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '52px', marginBottom: '16px', animation: 'float 3s ease-in-out infinite' }}>🎵</div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: '700',
                color: '#7a2c3e',
                marginBottom: '8px',
              }}>Welcome to SwiftMood</h2>
              <p style={{ color: '#9a6a70', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '340px' }}>
                Your AI-powered Taylor Swift song recommender. Share your mood, get the perfect playlist.
              </p>
            </div>

            <div style={{ width: '100%', maxWidth: '380px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.78rem',
                fontWeight: '600',
                color: '#7a2c3e',
                marginBottom: '8px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}>Anthropic API Key</label>
              <input
                type="password"
                placeholder="sk-ant-..."
                value={apiKey}
                onChange={e => { setApiKey(e.target.value); setKeyError(''); }}
                onKeyDown={e => e.key === 'Enter' && beginChat()}
                style={{
                  width: '100%',
                  padding: '13px 16px',
                  borderRadius: '12px',
                  border: `1.5px solid ${keyError ? '#ef4444' : 'rgba(201,113,123,0.35)'}`,
                  background: 'rgba(255,255,255,0.8)',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-body)',
                  color: '#1a1017',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#c9717b'}
                onBlur={e => e.target.style.borderColor = keyError ? '#ef4444' : 'rgba(201,113,123,0.35)'}
              />
              {keyError && (
                <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '6px' }}>{keyError}</p>
              )}
              <p style={{ fontSize: '0.72rem', color: '#b08890', marginTop: '8px', lineHeight: 1.5 }}>
                Your key is never stored or sent anywhere except directly to Anthropic's API.
              </p>
            </div>

            <button
              onClick={beginChat}
              style={{
                padding: '13px 36px',
                borderRadius: '100px',
                border: 'none',
                background: 'linear-gradient(135deg, #7a2c3e, #c9717b)',
                color: '#fdf6ec',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-body)',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(122,44,62,0.3)',
                transition: 'transform 0.15s, box-shadow 0.15s',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 28px rgba(122,44,62,0.4)';
              }}
              onMouseLeave={e => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 6px 20px rgba(122,44,62,0.3)';
              }}
            >
              Start Listening ✦
            </button>
          </div>
        ) : (
          <>
            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '24px 24px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              {messages.map((msg, i) => (
                <Message key={i} role={msg.role} content={msg.content} />
              ))}
              {loading && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Mood chips + Input */}
            <div style={{
              padding: '12px 20px 20px',
              borderTop: '1px solid rgba(242,196,196,0.3)',
              background: 'rgba(255,255,255,0.3)',
              flexShrink: 0,
            }}>
              <MoodChips onSelect={sendMessage} disabled={loading} />
              <div style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-end',
                marginTop: '4px',
              }}>
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={e => {
                    setInput(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe how you're feeling..."
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: '16px',
                    border: '1.5px solid rgba(201,113,123,0.3)',
                    background: 'rgba(255,255,255,0.85)',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-body)',
                    color: '#1a1017',
                    resize: 'none',
                    outline: 'none',
                    lineHeight: '1.5',
                    maxHeight: '100px',
                    overflowY: 'auto',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = '#c9717b'}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,113,123,0.3)'}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '14px',
                    border: 'none',
                    background: loading || !input.trim()
                      ? 'rgba(201,113,123,0.3)'
                      : 'linear-gradient(135deg, #7a2c3e, #c9717b)',
                    color: '#fdf6ec',
                    fontSize: '18px',
                    cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    flexShrink: 0,
                    boxShadow: loading || !input.trim() ? 'none' : '0 4px 12px rgba(122,44,62,0.3)',
                  }}
                >↑</button>
              </div>
              <p style={{
                fontSize: '0.67rem',
                color: '#c0a0a5',
                textAlign: 'center',
                marginTop: '10px',
              }}>Press Enter to send · Shift+Enter for new line</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
