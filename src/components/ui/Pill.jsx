import { forwardRef } from "react";

export const Pill = forwardRef(function Pill({
  active = false,
  onClick,
  children,
  className = "",
  ...props
}, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className={`pill ${active ? "pill-active" : "hover:text-ink hover:bg-white/10"} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
});

Pill.displayName = "Pill";