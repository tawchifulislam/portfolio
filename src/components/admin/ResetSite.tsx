'use client';

import { useState } from 'react';
import { toast } from '@payloadcms/ui';

export default function ResetSite() {
  const [text, setText] = useState('');
  const [working, setWorking] = useState(false);

  const canReset = text === 'RESET' && !working;

  const reset = async () => {
    setWorking(true);
    try {
      const res = await fetch('/api/reset-site', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirm: 'RESET' }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Reset failed');
      toast.success('Site restored to the original version');
      setTimeout(() => window.location.reload(), 1200);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Reset failed');
      setWorking(false);
    }
  };

  return (
    <details className="pf-danger">
      <summary>Danger zone</summary>
      <div className="pf-danger__body">
        <p>
          Restores all content and images to the original version saved in the
          code. Projects, capstones, experience, tech stack, images, Profile and
          About are replaced. Messages and users are not touched. This cannot be
          undone.
        </p>
        <div className="pf-danger__row">
          <input
            className="pf-danger__input"
            type="text"
            value={text}
            placeholder="Type RESET to confirm"
            onChange={event => setText(event.target.value)}
            disabled={working}
          />
          <button
            type="button"
            className="pf-danger__btn"
            disabled={!canReset}
            onClick={reset}
          >
            {working ? 'Resetting, please wait...' : 'Reset site'}
          </button>
        </div>
      </div>
    </details>
  );
}
