import { createTheme } from "@mui/material/styles";
import { primaryColor, white } from "./colors";

export const appTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      contrastText: white,
    },
  },
});
