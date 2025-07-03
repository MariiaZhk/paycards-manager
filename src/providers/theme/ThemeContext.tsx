import { createContext } from "react";
import type { ThemeProviderState } from "./themeTypes";

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);
