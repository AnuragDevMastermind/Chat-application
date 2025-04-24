import http from "../Utils/http-common";
import { ALL_USERS_ENDPOINT } from "@repo/utils/endpoints";
import { UserResponse } from "@repo/datamodel/user";

class UserServices {
  getAllUsers() {
    return http.post<Array<UserResponse>>(ALL_USERS_ENDPOINT);
  }
}

export default new UserServices();
