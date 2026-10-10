import { createContext, useContext, useState, useEffect, useCallback } from "react";

const OptionsContext = createContext(null);

const STORAGE_KEY = "aries-portfolio-options";
const DEFAULT_ACCENT = "#D4162B";
const ACCENT_PRESETS = {
  red: "#D4162B",
  blue: "#2E8BFF",
  green: "#2BD18B",
};

export function OptionsProvider({ children }) {
  const [accent, setAccent] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.accent || DEFAULT_ACCENT;
      }
    } catch (e) {
      console.warn("Failed to read options from localStorage:", e);
    }
    return DEFAULT_ACCENT;
  });
  const [reduceMotion, setReduceMotion] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.reduceMotion || false;
      }
    } catch (e) {
      console.warn("Failed to read options from localStorage:", e);
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", accent);
  }, [accent]);

  useEffect(() => {
    document.documentElement.dataset.motion = reduceMotion ? "reduced" : "normal";
  }, [reduceMotion]);

  const saveOptions = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ accent, reduceMotion }));
    } catch (e) {
      console.warn("Failed to save options to localStorage:", e);
    }
  }, [accent, reduceMotion]);

  useEffect(() => {
    saveOptions();
  }, [saveOptions]);

  const setAccentPreset = useCallback((preset) => {
    const value = ACCENT_PRESETS[preset];
    if (value) setAccent(value);
  }, []);

  const toggleReduceMotion = useCallback(() => {
    setReduceMotion((prev) => !prev);
  }, []);

  return (
    <OptionsContext.Provider
      value={{
        accent,
        setAccent,
        accentPresets: ACCENT_PRESETS,
        setAccentPreset,
        reduceMotion,
        setReduceMotion,
        toggleReduceMotion,
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
}

export function useOptions() {
  const context = useContext(OptionsContext);
  if (!context) {
    throw new Error("useOptions must be used within an OptionsProvider");
  }
  return context;
}