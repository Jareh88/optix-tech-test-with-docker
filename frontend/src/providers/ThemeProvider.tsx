import React, { useState, useMemo, useEffect } from "react";
import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import { ThemeContext } from "./ThemeProviderExports";

interface MainThemeProviderProps {
  mode?: PaletteMode;
  children: React.ReactNode;
}

export const MainThemeProvider = ({
  mode: initialMode,
  children,
}: MainThemeProviderProps) => {
  const [mode, setThemeMode] = useState<PaletteMode>(initialMode ?? "dark");

  useEffect(() => {
    if (initialMode) {
      setThemeMode(initialMode);
    }
  }, [initialMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, setThemeMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
