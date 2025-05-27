import MaterialInput from "../components/custom/MaterialInput"
import TopBar from "../components/custom/TopBar"
import { Button } from "../components/shadcn/Button"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../hooks/useRedux"
import { LOADING_STATUS } from "../constants/enums"
import useLogin from "../hooks/useLogin"
import { SubmitHandler, useForm } from "react-hook-form"
import { LoginData } from "../types/auth"
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "../Utils/validation"
import { LockIcon, User } from "lucide-react"
import { useEffect } from "react"
import { HOME_ENDPOINT, SIGNUP_ENDPOINT } from "@repo/utils/endpoints"

function LoginPage() {
  const navigate = useNavigate();
  const loadingStatus = useAppSelector((state) => state.loadingStatus);
  const { user, login } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginValidationSchema),
  });

  const onSubmit: SubmitHandler<LoginData> = async (data: LoginData) => {
    login(data);
  };

  useEffect(() => {
    if (user != null) {
      navigate(HOME_ENDPOINT);
    }
  }, [user]);
  
  return (
    <div className="size-full flex flex-col">
      <TopBar/>
      <div className="w-full flex-1 flex flex-col justify-center items-center">
        <p className="font-bold text-txt-1 text-xl">Login into Your Account</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MaterialInput 
            label="Number"
            src={<User className="size-5 text-txt-1"/>}
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
              ? "Loging in..."
              : "LOGIN"
          }</Button>
        </form>

        <div className="flex mt-2 justify-center">
          <p>Don't have an account?</p>
          <p className="ms-1 underline" onClick={()=>navigate(SIGNUP_ENDPOINT)}>
            SIGNUP
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage