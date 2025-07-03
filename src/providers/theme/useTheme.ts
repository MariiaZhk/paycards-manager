import { useContext } from "react";
import type { ThemeProviderState } from "./themeTypes";
import { ThemeProviderContext } from "./ThemeContext";

export const useTheme = (): ThemeProviderState => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
