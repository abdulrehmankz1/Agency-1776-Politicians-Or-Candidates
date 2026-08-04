'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import LineBackdrop from '@/components/line-backdrop'
import RevealBorder from '@/components/reveal-border'
import SplitText from '@/components/split-text'
import { SOLUTIONS } from '@/constants/campaign'
import { useScrubHeading } from '@/hooks/use-scrub-heading'
import { useSectionReveal } from '@/hooks/use-section-reveal'

const Audiences = () => {
  const scopeRef = useSectionReveal()
  const headingRef = useScrubHeading()
  // Multi-open accordion — the reader can compare audiences side-by-side
  // without collapsing an earlier one. Every accordion starts expanded so
  // the section reads as "content is here" on first paint.
  const [openIndices, setOpenIndices] = useState(
    () => new Set([0, 1, 2, 3]),
  )

  const toggle = (i) => {
    setOpenIndices((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <section
      ref={scopeRef}
      id="solutions-audiences"
      className="relative isolate overflow-hidden bg-surface py-32"
    >
      <LineBackdrop tone="muted" columns={12} pulses={3} />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        <header className="max-w-[1180px] pb-16">
          <div className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.28em] text-foreground/60">
            <span className="border border-muted px-2 py-0.5 font-mono text-[0.8rem] text-foreground/80">
              02
            </span>
            <span
              className="h-px w-8 bg-muted"
              data-reveal="icon"
              aria-hidden="true"
            />
            <span>{SOLUTIONS.audiences.eyebrow}</span>
          </div>

          <h2
            ref={headingRef}
            className="mt-8 text-balance text-[clamp(2.75rem,6.5vw,5.75rem)] leading-[0.92] tracking-[0.005em]"
          >
            <SplitText mode="words">{SOLUTIONS.audiences.heading}</SplitText>
          </h2>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-foreground/80 lg:text-xl">
            <SplitText mode="block">{SOLUTIONS.audiences.intro}</SplitText>
          </p>
        </header>

        {/* Accordion column — 4 categories, click to expand. */}
        <ul className="flex flex-col gap-px bg-muted/60">
          {SOLUTIONS.audiences.items.map((audience, i) => (
            <AudienceAccordion
              key={audience.title}
              audience={audience}
              index={i}
              open={openIndices.has(i)}
              onToggle={() => toggle(i)}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

const AudienceAccordion = ({ audience, index, open, onToggle }) => {
  return (
    <li className="relative bg-background">
      <RevealBorder tone="muted" />

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`audience-panel-${index}`}
        data-cursor="button"
        className="group flex w-full items-start gap-6 px-6 py-8 text-left lg:gap-10 lg:px-10 lg:py-10"
      >
        <span
          data-reveal="icon"
          aria-hidden="true"
          className="mt-3 font-mono text-[0.8rem] uppercase tracking-[0.28em] text-accent"
        >
          0{index + 1}
        </span>

        <div className="flex-1">
          <h3 className="text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[0.98] tracking-[0.005em] text-foreground">
            <SplitText mode="words">{audience.title}</SplitText>
          </h3>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/75 lg:text-lg">
            <SplitText mode="block">{audience.description}</SplitText>
          </p>
        </div>

        {/* Plus/minus indicator — two hairlines that cross to a plus when
            closed and align into a minus when open. Rectangular language. */}
        <span
          aria-hidden="true"
          className="relative mt-3 flex h-6 w-6 shrink-0 items-center justify-center"
        >
          <span className="absolute h-[2px] w-6 bg-accent" />
          <motion.span
            className="absolute h-[2px] w-6 bg-accent"
            animate={{ rotate: open ? 0 : 90 }}
            transition={{ duration: 0.28, ease: [0.85, 0, 0, 1] }}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            id={`audience-panel-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.85, 0, 0, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-muted/60 px-6 pb-10 pt-6 lg:px-10 lg:pl-[calc(2.5rem+3.75rem)]">
              {audience.intro && (
                <p className="mb-6 text-[0.82rem] uppercase tracking-[0.28em] text-foreground/60">
                  {audience.intro}
                </p>
              )}

              {/* Position list — hairline separators, columnised so long
                  lists (State/Local has 15 items) stay legible. */}
              <ul className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                {audience.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border-b border-muted/40 py-2 text-base text-foreground/85"
                  >
                    <span
                      aria-hidden="true"
                      className="block h-1.5 w-1.5 shrink-0 bg-accent"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export default Audiences
