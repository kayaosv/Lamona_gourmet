import { SparkleIcon } from '@/components/icons'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow: string
  title: string
  description?: string
  align?: 'center' | 'left'
}) {
  return (
    <div
      data-reveal
      className={`flex flex-col gap-3 ${
        align === 'center' ? 'items-center text-center' : 'items-start text-left'
      }`}
    >
      <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold">
        <SparkleIcon className="h-3.5 w-3.5" />
        {eyebrow}
      </span>
      <h2 className="max-w-2xl font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground text-balance sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>
      )}
    </div>
  )
}
