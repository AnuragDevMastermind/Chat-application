import { LockIcon, Phone, User } from "lucide-react";
import MaterialInput from "../components/custom/MaterialInput";
import TopBar from "../components/custom/TopBar";
import { Button } from "../components/shadcn/Button";
import { useNavigate } from "react-router-dom";
import { LOGIN_ENDPOINT } from "@repo/utils/endpoints";
import { useAppSelector } from "../hooks/useRedux";
import useSignUp from "../hooks/useSignUp";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpData } from "../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpValidationSchema } from "../Utils/validation";
import { LOADING_STATUS } from "../constants/enums";
import { useEffect } from "react";

function SignupPage() {
  const { response, setSignUpData } = useSignUp();
  const loadingStatus = useAppSelector((state) => state.loadingStatus);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpValidationSchema),
  });

  const onSubmit: SubmitHandler<SignUpData> = async (data: SignUpData) => {
    setSignUpData(data);
  };

  useEffect(() => {
    if (response != null) {
      navigate(LOGIN_ENDPOINT);
    }
  }, [response]);

  return (
    <div className="size-full flex flex-col">
      <TopBar/>
      <div className="w-full flex-1 flex flex-col justify-center items-center">
        <p className="font-bold text-txt-1 text-xl">Signup into Your Account</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MaterialInput 
            label="Name"
            src={<User className="size-5 text-txt-1"/>}
            type="text"
            register={register("name",{required:"Name is required"})}
          />
          {errors.name && (
            <p className="ml-4 mr-2 text-sm text-error">
              {errors.name.message}
            </p>
          )}
          <MaterialInput 
            label="Number"
            src={<Phone className="size-5 text-txt-1"/>}
            type="text"
            register={register("number",{required:"Number is required"})}
          />
          {errors.number && (
            <p className="ml-4 mr-2 text-sm text-error">
              {errors.number.message}
            </p>
          )}
          <MaterialInput 
            label="Password"
            src={<LockIcon className="size-5 text-txt-1"/>}
            type="password"
            register={register("password",{required:"password is required"})}
          />
          {errors.password && (
            <p className="ml-4 mr-2 text-sm text-error">
              {errors.password.message}
            </p>
          )}
          <Button
            className="mt-5 w-72"
            type="submit"
            disabled={loadingStatus === LOADING_STATUS.LOADING}
          >{
            loadingStatus === LOADING_STATUS.LOADING
              ? "Signing up..."
              : "SIGNUP"
          }</Button>
        </form>

        <div className="flex mt-2 justify-center">
          <p>Already have an account?</p>
          <p className="ms-1 underline" onClick={()=>navigate(LOGIN_ENDPOINT)}>
            LOGIN
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;