import React, { createContext, useMemo, useState, useContext, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

type ThemeMode = "light" | "dark";

interface ThemeContextProps {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  mode: "light",
  toggleTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Tema ayarını localStorage'dan yükle veya varsayılan olarak "light" ayarla
  const [mode, setMode] = useState<ThemeMode>(
    (localStorage.getItem("themeMode") as ThemeMode) || "light"
  );

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode); // Tema ayarını localStorage'a kaydet
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === "dark" ? "#05070a" : "#fcfcfc", // Arka plan rengi
            paper: mode === "dark" ? "#0c1017" : "#f5f6fa", // Kart veya Drawer gibi bileşenlerin rengi
          },
          text: {
            primary: mode === "dark" ? "#ffffff" : "#000000", // Ana metin rengi
            secondary: mode === "dark" ? "#b3b3b3" : "#4f4f4f", // İkincil metin rengi
          },
        },
      }),
    [mode]
  );

  // Body'nin arka plan rengini temaya göre ayarla
  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};