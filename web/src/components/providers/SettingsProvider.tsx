"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_SETTINGS,
  SETTINGS_STORAGE_KEY,
  Settings,
  applySettings,
  parseSettings,
} from "@/lib/settings";

interface SettingsContextValue {
  settings: Settings;
  /** True once preferences have been read from storage on the client. */
  ready: boolean;
  updateSettings: (patch: Partial<Settings>) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [ready, setReady] = useState(false);

  // Read stored preferences once on mount. The inline bootstrap script in the
  // root layout has already applied them to <html>; this brings React state
  // into agreement so the settings UI shows the right values.
  useEffect(() => {
    const stored = parseSettings(window.localStorage.getItem(SETTINGS_STORAGE_KEY));
    setSettings(stored);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    applySettings(settings, document.documentElement);
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [settings, ready]);

  // When the user has chosen "system", track OS theme changes live.
  useEffect(() => {
    if (settings.theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handle = () => applySettings(settings, document.documentElement);
    media.addEventListener("change", handle);
    return () => media.removeEventListener("change", handle);
  }, [settings]);

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    setSettings((current) => ({ ...current, ...patch }));
  }, []);

  const resetSettings = useCallback(() => setSettings(DEFAULT_SETTINGS), []);

  const value = useMemo(
    () => ({ settings, ready, updateSettings, resetSettings }),
    [settings, ready, updateSettings, resetSettings],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used inside a SettingsProvider");
  }
  return context;
}
