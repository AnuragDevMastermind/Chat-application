import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";
import AuthServices from "../services/auth.services";
import { setUser } from "../store/slice/authSlice";

export enum STATE {
  IDDLE,
  IS_LOADING,
  ERROR,
  INVALID_USER,
  VALID_USER,
}

const useLoggedInUser = () => {
  const [state, setState] = useState<STATE>(STATE.IDDLE);

  const user = useAppSelector((state) => state.loginSlice).user;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user == null) {
      setState(STATE.IS_LOADING);
      AuthServices.loggedInUser()
        .then((response: any) => {
          if (response.data.user) {
            setState(STATE.VALID_USER);
            dispatch(setUser(response.data.user));
          } else {
            setState(STATE.INVALID_USER);
          }
        })
        .catch((e: Error) => {
          setState(STATE.ERROR);
        });
    } else {
      setState(STATE.VALID_USER);
    }
  }, []);

  return { state, user };
};

export default useLoggedInUser;
