import { useEffect, useRef } from "react";
import { X, Palette, Move, Check } from "lucide-react";
import { Modal } from "../ui/Modal";
import { useOptions } from "../../context/OptionsContext";

const ACCENT_OPTIONS = [
  { id: "red", label: "Red", value: "#D4162B", icon: "🔴" },
  { id: "blue", label: "Blue", value: "#2E8BFF", icon: "🔵" },
  { id: "green", label: "Green", value: "#2BD18B", icon: "🟢" },
];

export function OptionsModal({ open, onClose }) {
  const { accent, setAccentPreset, reduceMotion, toggleReduceMotion } = useOptions();
  const contentRef = useRef(null);

  useEffect(() => {
    if (open) {
      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, onClose]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="OPTIONS"
      size="md"
      className="max-h-[80vh]"
    >
      <div className="space-y-8">
        <div>
          <h4 className="text-label uppercase tracking-[0.2em] text-ink-muted mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5" aria-hidden="true" />
            ACCENT COLOR
          </h4>
          <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Accent color options">
            {ACCENT_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={accent === option.value}
                onClick={() => setAccentPreset(option.id)}
                className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                  accent === option.value
                    ? "border-accent bg-accent/10"
                    : "border-line hover:border-blue/50 hover:bg-white/5"
                }`}
              >
                <div
                  className="w-12 h-12 mx-auto mb-3 rounded-full border-2 border-line flex items-center justify-center text-2xl"
                  style={{ backgroundColor: option.value + "20" }}
                  aria-hidden="true"
                >
                  <span style={{ color: option.value }}>{option.icon}</span>
                </div>
                <span className="text-sm font-medium text-ink text-center block">{option.label}</span>
                {accent === option.value && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-accent text-black rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3" aria-hidden="true" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-line">
          <h4 className="text-label uppercase tracking-[0.2em] text-ink-muted mb-4 flex items-center gap-2">
            <Move className="w-5 h-5" aria-hidden="true" />
            MOTION
          </h4>
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface border border-line flex items-center justify-center">
                <Move className="w-5 h-5 text-ink-dim" aria-hidden="true" />
              </div>
              <div>
                <p className="font-medium text-ink">Reduce Motion</p>
                <p className="text-sm text-ink-dim">Disable animations and transitions</p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={reduceMotion}
              onClick={toggleReduceMotion}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 flex items-center p-1 ${
                reduceMotion ? "bg-accent" : "bg-white/10"
              }`}
              aria-label={reduceMotion ? "Enable animations" : "Disable animations"}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                  reduceMotion ? "translate-x-6" : "translate-x-0"
                }`}
                aria-hidden="true"
              />
            </button>
          </label>
        </div>

        <div className="pt-4 border-t border-line text-center text-sm text-ink-dim">
          <p>Settings are saved locally in your browser</p>
        </div>
      </div>
    </Modal>
  );
}