import { JSX } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type MaterialInputProps = {
  src: JSX.Element;
  label: string;
  register?: UseFormRegisterReturn;
  type?:string;
}

function MaterialInput({src,label,register,type}:MaterialInputProps) {
  return (
    <div className=" h-10 flex items-center relative mt-5">
      <div className="pointer-events-none ml-4 absolute">{src}</div>
      <input
        type={type}
        autoComplete="off"
        {...register}
        className="w-full h-full pl-[48px] font-light pr-6 bg-transparent text-base border-[1px] border-border-2 text-txt-1 focus:border-primary rounded-[5px] outline-none peer valid:border-primary hover:border-gray-500 valid:hover:border-primary"
        required
      />
      <label className="pointer-events-none font-light absolute ml-[50px] text-base text-txt-1 peer-focus:text-primary peer-valid:text-primary peer-focus:-translate-y-5 peer-valid:-translate-y-5 peer-focus:bg-background peer-valid:bg-background peer-focus:px-1 peer-valid:px-1 peer-focus:ml-[38px] peer-valid:ml-[38px] peer-focus:text-sm peer-valid:text-sm duration-200">
        {label}
      </label>
    </div>
  );
}

export default MaterialInput