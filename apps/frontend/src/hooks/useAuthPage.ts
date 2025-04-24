import { useLocation } from "react-router-dom";
import { LOGIN_ENDPOINT, SIGNUP_ENDPOINT } from "@repo/utils/endpoints";

export const useAuthPage = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === LOGIN_ENDPOINT;
  const isSignupPage = location.pathname === SIGNUP_ENDPOINT;

  const isAuthPage = isLoginPage || isSignupPage;

  return isAuthPage;
};
