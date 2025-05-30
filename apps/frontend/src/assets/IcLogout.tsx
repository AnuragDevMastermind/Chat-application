import { twMerge } from "tailwind-merge";

interface IcLogoutProps {
  className?: string;
}

const IcLogout = ({ className }:IcLogoutProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={twMerge("w-[24px] h-[24px] text-error", className)}
    fill="currentColor"
  >
    <path
      d="M16.6 8.1L17.8 6.9L22.9 12L17.8 17.1L16.6 15.9L19.6 12.9H8.7V11.1H19.6L16.6 8.1ZM3.8 19.9H12.9C13.9 19.9 14.7 19.1 14.7 18.1V16.7H12.9V18.1H3.8V5.8H12.9V7.2H14.7V5.8C14.7 4.8 13.9 4 12.9 4H3.8C2.8 4 2 4.8 2 5.8V18.2C2 19.1 2.8 19.9 3.8 19.9Z"
    />
  </svg>
);

export default IcLogout;
