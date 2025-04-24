import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpData } from "../types/auth";
import { signUpValidationSchema } from "../Utils/validation";
import { LOGIN_ENDPOINT } from "@repo/utils/endpoints";
import useSignUp from "../hooks/useSignUp";
import { useEffect } from "react";
import ic_call from "../assets/icons/ic_call.svg";
import ic_lock from "../assets/icons/ic_lock.svg";
import ic_person from "../assets/icons/ic_person.svg";
import { useAppSelector } from "../hooks/useRedux";
import { LOADING_STATUS } from "../constants/enums";
import ic_research_logo from "../assets/icons/ic_research_logo.svg";
import { Button } from "../components/Button";

export default function SignUp() {
  const { response, setSignUpData } = useSignUp();
  const loadingStatus = useAppSelector((state) => state.loadingStatus);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
    <div className="relative h-screen flex flex-col bg-background">
      <div className="h-16 "/>
      <div className="flex flex-grow">
        <div className="w-1/2 h-full flex justify-center items-center">
          <img className="w-[calc(100%-100px)]" src={ic_research_logo} alt="" />
        </div>
        <div className="w-1/2 h-full">
          <div className="h-full flex justify-center items-center">
            <div className="w-[441px] flex flex-col items-center">
              <p className="font-medium text-[24px]">Signup into Your Account</p>
              <div className="w-[calc(100%-80px)]">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <>
                    <div className="w-full h-10 flex items-center relative mt-[20px]">
                      <img
                        src={ic_person}
                        className="pointer-events-none ml-4 absolute"
                        alt=""
                      />
                      <input
                        {...register("name")}
                        type="text"
                        autoComplete="off"
                        className="w-full h-full pl-[48px] font-light pr-6 bg-transparent text-base border-[1px] border-gray-400 text-black focus:border-primary rounded-[5px] outline-none peer valid:border-primary hover:border-gray-500 valid:hover:border-primary"
                        required
                      />
                      <label className="pointer-events-none font-light absolute ml-[50px] text-base text-black peer-focus:text-primary peer-valid:text-primary peer-focus:-translate-y-5 peer-valid:-translate-y-5 peer-focus:bg-background peer-valid:bg-background peer-focus:px-1 peer-valid:px-1 peer-focus:ml-[38px] peer-valid:ml-[38px] peer-focus:text-sm peer-valid:text-sm duration-200">
                        Name
                      </label>
                    </div>
                    {errors.name && (
                      <p className="ml-4 mr-2 text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </>
                  <>
                    <div className="w-full h-10 flex items-center relative mt-[20px]">
                      <img
                        src={ic_call}
                        className="pointer-events-none ml-4 absolute"
                        alt=""
                      />
                      <input
                        {...register("number")}
                        type="text"
                        autoComplete="off"
                        className="w-full h-full pl-[48px] font-light pr-6 bg-transparent text-base border-[1px] border-gray-400 text-black focus:border-primary rounded-[5px] outline-none peer valid:border-primary hover:border-gray-500 valid:hover:border-primary"
                        required
                      />
                      <label className="pointer-events-none font-light absolute ml-[50px] text-base text-black peer-focus:text-primary peer-valid:text-primary peer-focus:-translate-y-5 peer-valid:-translate-y-5 peer-focus:bg-background peer-valid:bg-background peer-focus:px-1 peer-valid:px-1 peer-focus:ml-[38px] peer-valid:ml-[38px] peer-focus:text-sm peer-valid:text-sm duration-200">
                        Number
                      </label>
                    </div>
                    {errors.number && (
                      <p className="ml-4 mr-2 text-sm text-red-500">
                        {errors.number.message}
                      </p>
                    )}
                  </>
                  <>
                    <div className="w-full h-10 flex items-center relative mt-[20px]">
                      <img
                        src={ic_lock}
                        className="pointer-events-none ml-4 absolute"
                        alt=""
                      />
                      <input
                        {...register("password")}
                        type="password"
                        autoComplete="off"
                        className="w-full h-full pl-[48px] font-light pr-6 bg-transparent text-base border-[1px] border-gray-400 text-black focus:border-primary rounded-[5px] outline-none peer valid:border-primary hover:border-gray-500 valid:hover:border-primary"
                        required
                      />
                      <label className="pointer-events-none font-light absolute ml-[50px] text-base text-black peer-focus:text-primary peer-valid:text-primary peer-focus:-translate-y-5 peer-valid:-translate-y-5 peer-focus:bg-background peer-valid:bg-background peer-focus:px-1 peer-valid:px-1 peer-focus:ml-[38px] peer-valid:ml-[38px] peer-focus:text-sm peer-valid:text-sm duration-200">
                        Password
                      </label>
                    </div>
                    {errors.password && (
                      <p className="ml-4 mr-2 text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </>
                  <Button
                    type="submit"
                    disabled={loadingStatus === LOADING_STATUS.LOADING}
                    className="mt-[20px]"
                    sizeVariant="md"
                  >
                    {loadingStatus === LOADING_STATUS.LOADING
                      ? "Signing up..."
                      : "SIGNUP"}
                  </Button>
                </form>

                <div className="flex mt-2 justify-center">
                  <p>Already a user?</p>
                  <p className="ms-1 underline">
                    <Link to={LOGIN_ENDPOINT}>{"LOGIN"}</Link>..
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
