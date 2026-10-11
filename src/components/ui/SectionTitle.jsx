export function SectionTitle({ id, eyebrow, title, align = "center", className = "" }) {
  return (
    <header className={`${align === "center" ? "text-center" : align === "left" ? "text-left" : "text-right"} ${className}`}>
      {eyebrow && (
        <span className="inline-block text-label uppercase tracking-[0.2em] text-ink-muted mb-2">
          {eyebrow}
        </span>
      )}
      <h2 id={id} className="section-title">{title}</h2>
    </header>
  );
}
