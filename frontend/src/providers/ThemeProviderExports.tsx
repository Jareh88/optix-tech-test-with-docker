import { createContext, useContext } from "react";

// Create a context for the theme mode
interface ThemeModeContext {
  mode: "light" | "dark";
  setThemeMode: (mode: "light" | "dark") => void;
}
export const ThemeContext = createContext<ThemeModeContext>(
  {} as ThemeModeContext
);
export const useThemeMode = () => useContext(ThemeContext);
