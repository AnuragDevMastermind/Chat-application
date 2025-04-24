import { useState, useEffect } from "react";
import { UserResponse } from "@repo/datamodel/user";
import UserServices from "../services/user.services";

const useUser = () => {
  const [users, setUsers] = useState<Array<UserResponse>>([]);

  useEffect(() => {
    UserServices.getAllUsers()
      .then((response: any) => {
        setUsers(response.data);
      })
      .catch((e: Error) => {});
  }, []);

  return { users };
};

export default useUser;
