import { useState, useEffect } from "react";
import { SignUpData } from "../types/auth";
import AuthServices from "../services/auth.services";

const useSignUp = () => {
  const [signUpData, setSignUpData] = useState<SignUpData | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = () => {
      if (signUpData) {
        AuthServices.register(signUpData)
          .then((response: any) => {
            setResponse(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }
    };

    fetchData();
  }, [signUpData]);

  return { response, setSignUpData };
};

export default useSignUp;
