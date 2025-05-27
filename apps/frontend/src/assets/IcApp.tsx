import { twMerge } from "tailwind-merge";

interface IcAppProps {
  className?: string;
}

const IcApp = ({className}:IcAppProps) => (
  <svg
    viewBox="0 0 36 36"
    className={twMerge("w-9 h-9 text-primary",className)}
    fill="currentColor"
  >
    <path d="M0 0V35.3476H18.5507L11.8281 23.9375L6.1914 29.8515V3.62109L24.9844 35.3476L35.6289 35.3906V0H17.6953L24.0585 10.6055L29.6446 4.74609V30.625L11.25 0H0Z" />
  </svg>
);

export default IcApp;
