import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeMode } from "../providers/ThemeProviderExports";

const ToggleThemeButton = () => {
  const { mode, setThemeMode } = useThemeMode();

  const toggleTheme = () => {
    setThemeMode(mode === "light" ? "dark" : "light");
  };

  return (
    <IconButton onClick={toggleTheme} size="large">
      <DarkModeIcon />
    </IconButton>
  );
};

export default ToggleThemeButton;
