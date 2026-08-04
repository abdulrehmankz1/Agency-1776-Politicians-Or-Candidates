'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import Icon from '@/components/icon'
import RevealBorder from '@/components/reveal-border'
import SplitText from '@/components/split-text'
import { PRICING_CALCULATOR } from '@/constants/pricing'
import { useSectionReveal } from '@/hooks/use-section-reveal'
import { cn } from '@/utils/cn'

/*
 * Calculator layout — deliberately NOT a pricing-table grid. The four fields
 * are laid out as a full-width editorial stack, each stage numbered and
 * broken by a hairline rule. Options render as pressable chip-cards with
 * their own hover / active states, so the user is always looking at one
 * decision at a time. When all four decisions land, the recommendation
 * panel below the stack fades in and gains its accent border.
 *
 * No dollar amounts, no invented feature bullets, no fabricated plans —
 * every string on this section is drawn straight from the constants file.
 */

const PricingCalculator = () => {
  const scopeRef = useSectionReveal()
  const [selections, setSelections] = useState({})
  const total = PRICING_CALCULATOR.fields.length
  const completed = Object.values(selections).filter(Boolean).length
  const allSelected = completed === total

  const setSelection = (fieldId, value) => {
    setSelections((prev) => ({ ...prev, [fieldId]: value }))
  }

  return (
    <section
      ref={scopeRef}
      id="calculator"
      className="relative isolate overflow-hidden bg-surface py-32"
    >
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        {/* Section header — number badge only, no invented descriptor copy. */}
        <header className="max-w-[1180px] pb-16">
          <div className="flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.28em] text-foreground/60">
            <span className="border border-muted px-2 py-0.5 font-mono text-[0.8rem] text-foreground/80">
              02
            </span>
            <span
              data-reveal="icon"
              aria-hidden="true"
              className="h-px w-8 bg-muted"
            />
            <span className="font-mono text-foreground/70">
              {String(completed).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>
        </header>

        {/* Four stacked stages. Each one occupies a full-width band, so the
            reader focuses on one field at a time — no crammed two-column
            grid competing for attention. */}
        <ol className="flex flex-col">
          {PRICING_CALCULATOR.fields.map((field, i) => {
            const number = String(i + 1).padStart(2, '0')
            const selected = selections[field.id]
            return (
              <li
                key={field.id}
                className="relative grid grid-cols-12 items-start gap-x-8 gap-y-6 border-t border-muted/70 py-14 last:border-b"
              >
                {/* Number rail — running index anchored to the left. */}
                <div className="col-span-12 flex items-center gap-4 lg:col-span-3 lg:flex-col lg:items-start lg:gap-6">
                  <span
                    data-reveal="icon"
                    aria-hidden="true"
                    className="block h-2 w-2 bg-accent"
                  />
                  <div>
                    <div className="font-mono text-[0.78rem] uppercase tracking-[0.28em] text-accent">
                      Stage {number}
                    </div>
                    <h3 className="mt-3 text-2xl leading-[1.02] tracking-[0.005em] lg:text-3xl">
                      <SplitText mode="words">{field.title}</SplitText>
                    </h3>
                  </div>
                </div>

                {/* Options — chip cards. */}
                <div className="col-span-12 flex flex-wrap gap-3 lg:col-span-9">
                  {field.options.map((option) => (
                    <OptionChip
                      key={option}
                      label={option}
                      selected={selected === option}
                      onSelect={() => setSelection(field.id, option)}
                    />
                  ))}
                </div>
              </li>
            )
          })}
        </ol>

        {/* Recommendation panel — muted until all four fields carry a
            selection, then draws its accent border and un-dims the copy. */}
        <div className="relative mt-24">
          <motion.div
            initial={false}
            animate={{
              opacity: allSelected ? 1 : 0.55,
              y: allSelected ? 0 : 8,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-background p-10 lg:p-16"
          >
            <RevealBorder tone={allSelected ? 'accent' : 'muted'} />

            <div className="grid grid-cols-12 items-center gap-8">
              <div className="col-span-12 lg:col-span-2">
                <div className="flex items-center gap-3 font-mono text-[0.78rem] uppercase tracking-[0.28em] text-accent">
                  <span
                    data-reveal="icon"
                    aria-hidden="true"
                    className="block h-2 w-2 bg-accent"
                  />
                  <span>03</span>
                </div>
              </div>

              <p className="col-span-12 text-lg leading-relaxed text-foreground/85 lg:col-span-9 lg:text-xl">
                <SplitText mode="block">{PRICING_CALCULATOR.result}</SplitText>
              </p>

              <div className="col-span-12 flex justify-start lg:col-span-1 lg:justify-end">
                <AnimatePresence>
                  {allSelected && (
                    <motion.span
                      key="ready-arrow"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      aria-hidden="true"
                      className="inline-flex h-10 w-10 items-center justify-center border border-accent text-accent"
                    >
                      <Icon name="arrow" className="h-4 w-4" strokeWidth={1.75} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const OptionChip = ({ label, selected, onSelect }) => (
  <button
    type="button"
    onClick={onSelect}
    aria-pressed={selected}
    data-reveal="icon"
    className={cn(
      'group relative inline-flex items-center gap-3 border px-4 py-3 text-left text-sm leading-tight transition-colors',
      'lg:text-base',
      selected
        ? 'border-accent bg-accent/[0.08] text-foreground'
        : 'border-muted/70 text-foreground/75 hover:border-accent/70 hover:text-foreground',
    )}
  >
    <span
      aria-hidden="true"
      className={cn(
        'block h-2 w-2 shrink-0 transition-colors',
        selected ? 'bg-accent' : 'bg-muted group-hover:bg-accent/60',
      )}
    />
    <span>{label}</span>
  </button>
)

export default PricingCalculator
