'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';

const box: CSSProperties = {
  border: '1px solid var(--theme-elevation-150)',
  borderRadius: 6,
  padding: 20,
  marginBottom: 24,
  background: 'var(--theme-elevation-50)',
};

const dangerButton: CSSProperties = {
  background: '#c0392b',
  color: '#fff',
  border: 'none',
  borderRadius: 4,
  padding: '8px 16px',
  cursor: 'pointer',
};

const plainButton: CSSProperties = {
  background: 'transparent',
  color: 'inherit',
  border: '1px solid var(--theme-elevation-300)',
  borderRadius: 4,
  padding: '8px 16px',
  cursor: 'pointer',
};

export default function ResetSite() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [status, setStatus] = useState<'idle' | 'working' | 'done' | 'error'>(
    'idle',
  );
  const [message, setMessage] = useState('');

  const working = status === 'working';
  const canReset = text === 'RESET' && !working;

  const reset = async () => {
    setStatus('working');
    setMessage('');
    try {
      const res = await fetch('/api/reset-site', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirm: 'RESET' }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Reset failed');
      setStatus('done');
      setMessage('Done. The site now matches the original. Reloading...');
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Reset failed');
    }
  };

  return (
    <div style={box}>
      <h3 style={{ margin: '0 0 8px' }}>Reset site to original</h3>
      <p style={{ margin: '0 0 12px' }}>
        Restores all content and images to the original version saved in the
        code. Projects, capstones, experience, tech stack, images, Profile and
        About are replaced. Messages and users are not touched. This cannot be
        undone.
      </p>

      {!open && (
        <button
          type="button"
          style={dangerButton}
          onClick={() => setOpen(true)}
        >
          Reset site...
        </button>
      )}

      {open && (
        <div>
          <p style={{ margin: '0 0 8px' }}>
            Type <strong>RESET</strong> to confirm.
          </p>
          <input
            type="text"
            value={text}
            onChange={event => setText(event.target.value)}
            disabled={working}
            style={{ padding: 8, marginRight: 8 }}
          />
          <button
            type="button"
            style={{ ...dangerButton, opacity: canReset ? 1 : 0.4 }}
            disabled={!canReset}
            onClick={reset}
          >
            {working ? 'Resetting, please wait...' : 'Yes, reset everything'}
          </button>{' '}
          <button
            type="button"
            style={plainButton}
            disabled={working}
            onClick={() => {
              setOpen(false);
              setText('');
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {message && (
        <p
          style={{
            margin: '12px 0 0',
            color: status === 'error' ? '#c0392b' : 'inherit',
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
