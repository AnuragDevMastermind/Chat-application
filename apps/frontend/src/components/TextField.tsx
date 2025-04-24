interface TextFieldProps {
  imgPath: string;
  placeholder: string;
  errorMsg: string;
}

function TextField({ imgPath, placeholder, errorMsg }: TextFieldProps) {
  return (
    <>
      <div className="w-full h-10 flex items-center relative">
        <img
          src={imgPath}
          className="pointer-events-none ml-4 absolute"
          alt=""
        />
        <input
          type="text"
          className="w-full h-full pl-[48px] font-light pr-6 bg-transparent text-base border-[1px] border-gray-400 text-black focus:border-[#0CAD3D] rounded-[5px] outline-none peer valid:border-[#0CAD3D] hover:border-gray-500 valid:hover:border-[#0CAD3D]"
          required
        />
        <label className="pointer-events-none font-light absolute ml-[50px] text-base text-black peer-focus:text-[#0CAD3D] peer-valid:text-[#0CAD3D] peer-focus:-translate-y-5 peer-valid:-translate-y-5 peer-focus:bg-white peer-valid:bg-white peer-focus:px-1 peer-valid:px-1 peer-focus:ml-[38px] peer-valid:ml-[38px] peer-focus:text-sm peer-valid:text-sm duration-200">
          {placeholder}
        </label>
      </div>
      {/* <p className="ml-4 mr-2 text-sm text-red-500">{errorMsg}</p> */}
    </>
  );
}

export default TextField;
