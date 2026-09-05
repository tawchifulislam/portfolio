'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Globe } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { variants, SHEET_NUMBERS, TOTAL_SHEETS } from '@/lib/constants';
import { scrollToSection } from '@/lib/utils';
import SectionTitle from '@/components/ui/SectionTitle';
import CornerMarks from '@/components/ui/CornerMarks';
import TitleBlock from '@/components/ui/TitleBlock';

const specs = [
  { label: 'Role', value: personalInfo.title },
  { label: 'Location', value: personalInfo.location },
  { label: 'Stack', value: 'React / Next.js / Node.js / MongoDB' },
  { label: 'Status', value: 'Open for work' },
];

const measurements = [
  { value: '05', label: 'Projects Shipped' },
  { value: '20+', label: 'Technologies' },
  { value: '1000+', label: 'Hours Logged' },
];

const focuses = [
  {
    title: 'Full Stack Architecture',
    desc: 'Building end-to-end systems, from React interfaces to Express APIs and MongoDB schemas, with clear separation of concerns.',
  },
  {
    title: 'Real-World Problem Solving',
    desc: 'Every project solves a real problem, whether it is booking a doctor, managing a gym, or planning a trip.',
  },
  {
    title: 'UI That Feels Right',
    desc: 'Clean, responsive interfaces built with Tailwind and Framer Motion, fast to load and intuitive to use.',
  },
  {
    title: 'Secure by Default',
    desc: 'JWT authentication, role-based access control, and protected routes are part of the design, not an afterthought.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative px-4 sm:px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="About Me"
          subtitle="A little bit about who I am and what I do."
        />

        <div className="sheet">
          <CornerMarks />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:divide-x lg:divide-line">
            {/* Left: Specification Sheet */}
            <motion.div
              variants={variants.slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-4 p-8 sm:p-10 flex flex-col gap-8"
            >
              <div>
                <p className="font-mono text-[11px] tracking-wide text-faint mb-4">
                  SPEC SHEET
                </p>
                <div className="flex flex-col">
                  {specs.map(spec => (
                    <div
                      key={spec.label}
                      className="flex items-baseline justify-between gap-4 py-2.5 border-b border-line"
                    >
                      <span className="font-mono text-[11px] text-faint">
                        {spec.label}
                      </span>
                      <span className="text-sm text-paper text-right">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {[
                  { icon: <MapPin size={13} />, text: personalInfo.location },
                  { icon: <Mail size={13} />, text: personalInfo.email },
                  { icon: <Globe size={13} />, text: 'tawchif.vercel.app' },
                ].map(item => (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 text-xs text-muted"
                  >
                    <span className="text-brass">{item.icon}</span>
                    <span className="truncate">{item.text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollToSection('contact')}
                className="mt-auto w-full px-6 py-3 bg-brass text-ink text-xs font-medium tracking-wide hover:bg-paper transition-colors duration-300"
              >
                Let&apos;s Talk
              </button>
            </motion.div>

            {/* Right: Bio + measurements + focuses */}
            <motion.div
              variants={variants.slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-8 p-8 sm:p-10 flex flex-col gap-10"
            >
              <div>
                <h3 className="font-display text-h2 font-semibold text-paper leading-tight mb-5">
                  Full-Stack Developer, building toward mastery.
                </h3>
                <div className="measure-lg flex flex-col gap-4 text-sm text-muted leading-relaxed">
                  <p>
                    My formal programming journey began in 2025, but the
                    curiosity started long before. I had been exploring and
                    absorbing everything I could about software development
                    before writing my first line of code.
                  </p>
                  <p>
                    What drives me most is problem solving, that moment when a
                    complex challenge finally clicks into place. I build things
                    that solve real problems for real people.
                  </p>
                  <p>
                    Outside of code, books across all genres and football keep
                    me sharp, both mentally and physically.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-10 gap-y-4 py-6 border-y border-line">
                {measurements.map(item => (
                  <div key={item.label}>
                    <p className="font-mono text-2xl text-paper">
                      {item.value}
                    </p>
                    <p className="font-mono text-[10px] text-faint mt-1">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {focuses.map(item => (
                  <div key={item.title} className="flex gap-3">
                    <span className="w-1.5 h-1.5 mt-1.5 shrink-0 bg-brass" />
                    <div>
                      <p className="text-sm font-medium text-paper mb-1.5">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <TitleBlock sheetNumber={SHEET_NUMBERS.about} total={TOTAL_SHEETS} />
        </div>
      </div>
    </section>
  );
}
