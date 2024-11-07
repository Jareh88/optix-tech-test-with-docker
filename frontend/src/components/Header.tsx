import { Box } from "@mui/material";
import ToggleThemeButton from "./ToggleThemeButton";

export const Header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
      }}
    >
      <ToggleThemeButton />
    </Box>
  );
};
