import { Navigate, Outlet } from "react-router-dom";
import { HOME_ENDPOINT, LOGIN_ENDPOINT } from "@repo/utils/endpoints";
import useLoggedInUser, { STATE } from "../../hooks/useLoggedInUser";
import LinearProgressIndicator from "./LinearProgressIndicator";

export const ProtectedRoute = () => {
  const { state, user } = useLoggedInUser();

  if (user == null) return <Navigate to={LOGIN_ENDPOINT} replace />;

  switch (state) {
    case STATE.IDDLE:
      return <div></div>;
    case STATE.IS_LOADING:
      return <div></div>;
    case STATE.ERROR:
      return <div></div>;
    case STATE.INVALID_USER:
      return <Navigate to={LOGIN_ENDPOINT} replace />;
    case STATE.VALID_USER:
      return <Outlet />;
  }
};

export const AuthRoute = () => {
  const { state } = useLoggedInUser();
  switch (state) {
    case STATE.IDDLE:
      return <LinearProgressIndicator />;
    case STATE.IS_LOADING:
      return <LinearProgressIndicator />;
    case STATE.ERROR:
      return <Outlet />;
    case STATE.INVALID_USER:
      return <Outlet />;
    case STATE.VALID_USER:
      return <Navigate to={HOME_ENDPOINT} replace />;
  }
};
