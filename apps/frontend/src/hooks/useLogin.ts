import { LoginData } from "../types/auth";
import AuthServices from "../services/auth.services";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { setUser } from "../store/slice/authSlice";
import { getUserFromToken } from "../Utils/tokenUtils";
import { UserResponse } from "@repo/datamodel/user";
import { useSocketIO } from "../context/SocketIOContext";

const useLogin = () => {
  const user = useAppSelector((state) => state.loginSlice).user;
  const dispatch = useAppDispatch();
  const { socket } = useSocketIO();

  const isUserLoggedIn = () => {
    return user != null;
  };

  const login = (loginFormData: LoginData) => {
    AuthServices.login(loginFormData)
      .then((response: any) => {
        const user: UserResponse = getUserFromToken(response.data.accessToken);
        dispatch(setUser(user));
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const logout = () => {
    AuthServices.logout()
      .then((response: any) => {
        socket?.disconnect();
        dispatch({ type: "reset" });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return { user, login, logout, isUserLoggedIn };
};

export default useLogin;
