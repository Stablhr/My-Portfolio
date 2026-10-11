import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export function Modal({ open, onClose, title, children, className = "", size = "lg" }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const previousActiveElement = useRef(null);

  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    full: "max-w-[90vw]",
  };

  useEffect(() => {
    if (!open) return;

    previousActiveElement.current = document.activeElement;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "Tab") {
        trapFocus(e);
      }
    };

    const trapFocus = (e) => {
      const focusableElements = contentRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const focusTimer = setTimeout(() => contentRef.current?.focus(), 0);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      clearTimeout(focusTimer);
      previousActiveElement.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const modalContent = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in-200"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        ref={contentRef}
        tabIndex={-1}
        className={`w-full ${sizes[size]} bg-surface-2 border border-line rounded-t-2xl sm:rounded-2xl shadow-[0_20px_60px_-20px_rgba(27,111,168,.45)] animate-in zoom-in-95 fade-in-200 flex flex-col max-h-[90svh] ${className}`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {(title || onClose) && (
          <header className="sticky top-0 z-10 flex items-center justify-between gap-4 p-4 sm:p-6 border-b border-line bg-surface-2 rounded-t-2xl">
            {title && (
              <h3 id="modal-title" className="text-xl font-heading text-chrome">
                {title}
              </h3>
            )}
            {onClose && (
              <button
                type="button"
                className="flex-shrink-0 inline-flex items-center justify-center w-11 h-11 text-ink-muted hover:text-ink transition-colors rounded-lg hover:bg-white/5"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            )}
          </header>
        )}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}