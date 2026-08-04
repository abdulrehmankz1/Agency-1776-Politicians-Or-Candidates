import { cn } from '@/utils/cn'

const Eyebrow = ({ children, index, className }) => {
  return (
    <div
      className={cn(
        'flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.28em] text-foreground/60',
        className,
      )}
    >
      {index && (
        <span className="border border-muted px-2 py-0.5 font-mono text-[0.8rem] text-foreground/80">
          {index}
        </span>
      )}
      <span className="h-px w-8 bg-muted" data-reveal="icon" aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
}

export default Eyebrow
