'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function HeroPhoto({ src, alt }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-34/43 overflow-hidden rounded-t-[200px] rounded-b-[28px] border border-line-2 bg-panel-2">
      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-[6rem] font-bold text-brass">
            TI
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 420px) 340px, calc(100vw - 80px)"
          priority
          onError={() => setFailed(true)}
          className="object-cover object-top"
        />
      )}
    </div>
  );
}
