export function BackgroundGlow() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-grain" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at 100% 0%, rgba(27,111,168,.35), transparent 60%), radial-gradient(900px 500px at 0% 100%, rgba(10,42,68,.55), transparent 60%), var(--color-bg)",
        }}
      />
    </div>
  );
}