'use client';

import { motion } from 'framer-motion';
import { variants } from '@/lib/constants';

export default function TitleBlock({ index, total, status, action }) {
  return (
    <div>
      <motion.div
        variants={variants.drawLine}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="h-px bg-line origin-left"
      />
      <div className="title-block px-6 sm:px-8 py-4">
        {index && total && (
          <span>
            <strong>{index}</strong> / {total}
          </span>
        )}
        {status && (
          <span className="stamp">
            <span className="w-1.5 h-1.5 rounded-full bg-brass" />
            {status}
          </span>
        )}
        {action && <div className="ml-auto">{action}</div>}
      </div>
    </div>
  );
}
