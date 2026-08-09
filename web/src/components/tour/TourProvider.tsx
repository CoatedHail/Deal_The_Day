"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { TOUR_STEPS, type TourStep } from "@/content/tour";

const TOUR_STORAGE_KEY = "dtd.tour.v1";

interface TourContextValue {
  active: boolean;
  index: number;
  step: TourStep | null;
  total: number;
  start: () => void;
  next: () => void;
  back: () => void;
  stop: () => void;
}

const TourContext = createContext<TourContextValue | null>(null);

/**
 * Position in the guided tour, kept above the router so it survives navigation.
 *
 * The tour walks the real pages, so its state cannot live on any one of them.
 * It is mirrored into sessionStorage rather than localStorage: a reload
 * mid-tour should not lose your place, but coming back tomorrow should not drop
 * you back into a tour you had finished with.
 */
export function TourProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);

  // Restored after mount rather than during render, so the server and the first
  // client render agree and hydration stays quiet.
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(TOUR_STORAGE_KEY);
      if (!raw) return;
      const saved = Number(raw);
      if (Number.isInteger(saved) && saved >= 0 && saved < TOUR_STEPS.length) {
        setIndex(saved);
        setActive(true);
      }
    } catch {
      // A blocked or full sessionStorage is not a reason to break the app.
    }
  }, []);

  const remember = useCallback((value: number | null) => {
    try {
      if (value === null) window.sessionStorage.removeItem(TOUR_STORAGE_KEY);
      else window.sessionStorage.setItem(TOUR_STORAGE_KEY, String(value));
    } catch {
      // As above.
    }
  }, []);

  const goTo = useCallback(
    (nextIndex: number) => {
      setIndex(nextIndex);
      remember(nextIndex);
      router.push(TOUR_STEPS[nextIndex].href);
    },
    [remember, router],
  );

  const start = useCallback(() => {
    setActive(true);
    goTo(0);
  }, [goTo]);

  // Both read `index` directly rather than using a setState updater. An updater
  // runs during render, and navigating from inside one means updating the
  // router while this component is rendering — React warns, and rightly.
  const next = useCallback(() => {
    if (index >= TOUR_STEPS.length - 1) return;
    goTo(index + 1);
  }, [goTo, index]);

  const back = useCallback(() => {
    if (index <= 0) return;
    goTo(index - 1);
  }, [goTo, index]);

  const stop = useCallback(() => {
    setActive(false);
    setIndex(0);
    remember(null);
  }, [remember]);

  const value = useMemo<TourContextValue>(
    () => ({
      active,
      index,
      step: active ? TOUR_STEPS[index] : null,
      total: TOUR_STEPS.length,
      start,
      next,
      back,
      stop,
    }),
    [active, index, start, next, back, stop],
  );

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
}

export function useTour(): TourContextValue {
  const context = useContext(TourContext);
  if (!context) throw new Error("useTour must be used inside a TourProvider");
  return context;
}
