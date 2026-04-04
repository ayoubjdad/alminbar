"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  THEME_DARK,
  THEME_LIGHT,
  THEME_STORAGE_KEY,
} from "../lib/theme/constants";

const ThemeContext = createContext(null);

function readThemeFromDom() {
  if (typeof document === "undefined") return THEME_DARK;
  return document.documentElement.getAttribute("data-theme") === THEME_LIGHT
    ? THEME_LIGHT
    : THEME_DARK;
}

function applyTheme(mode) {
  if (typeof document === "undefined") return;
  const m = mode === THEME_LIGHT ? THEME_LIGHT : THEME_DARK;
  document.documentElement.setAttribute("data-theme", m);
  document.documentElement.style.colorScheme =
    m === THEME_LIGHT ? "light" : "dark";
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readThemeFromDom);

  const setTheme = useCallback((mode) => {
    const m = mode === THEME_LIGHT ? THEME_LIGHT : THEME_DARK;
    setThemeState(m);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, m);
    } catch {
      /* private mode */
    }
    applyTheme(m);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === THEME_DARK ? THEME_LIGHT : THEME_DARK);
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx == null) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
