import React from "react";
import { Switch, Tooltip } from "@mui/material";
import { useThemeContext } from "../Contexts/ThemeContext";

const ThemeSwitch: React.FC = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Tooltip title={mode === "dark" ? "Dark Theme" : "Light Theme"}>
      <Switch
        checked={mode === "dark"}
        onChange={toggleTheme}
        color="default"
        inputProps={{ "aria-label": "toggle theme" }}
        sx={{ mx: 1 }}
      />
    </Tooltip>
  );
};

export default ThemeSwitch;