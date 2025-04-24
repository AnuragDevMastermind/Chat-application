import { LoginData, SignUpData } from "../types/auth";
import http from "../Utils/http-common";
import {
  LOGGED_IN_USER_ENDPOINT,
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
  SIGNUP_ENDPOINT,
} from "@repo/utils/endpoints";
import { UserResponse } from "@repo/datamodel/user";

class AuthServices {
  register(signUpData: SignUpData) {
    return http.post<String>(SIGNUP_ENDPOINT, signUpData, {
      withCredentials: true,
    });
  }
  login(loginData: LoginData) {
    return http.post<String>(LOGIN_ENDPOINT, loginData, {
      withCredentials: true,
    });
  }
  logout() {
    return http.post<String>(LOGOUT_ENDPOINT, {
      withCredentials: true,
    });
  }
  loggedInUser() {
    return http.post<UserResponse>(LOGGED_IN_USER_ENDPOINT, {
      withCredentials: true,
    });
  }
}

export default new AuthServices();
