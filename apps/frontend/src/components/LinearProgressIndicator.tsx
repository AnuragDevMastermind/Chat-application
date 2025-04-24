import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { LOADING_STATUS } from "../constants/enums";
import { useAppSelector } from "../hooks/useRedux";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "../constants/theme.constant";

const LinearProgressIndicator = () => {
  const loadingStatus = useAppSelector((state) => state.loadingStatus);
  return (
    <>
      <ThemeProvider theme={appTheme}>
        <Box sx={{ width: "100%", position: "absolute" }}>
          {loadingStatus === LOADING_STATUS.LOADING && <LinearProgress />}
        </Box>
      </ThemeProvider>
    </>
  );
};

export default LinearProgressIndicator;
