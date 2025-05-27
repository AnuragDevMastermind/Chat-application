import { twMerge } from "tailwind-merge";

interface IcSearchProps {
  className?: string;
}

const IcSearch = ({ className }:IcSearchProps) => (
  <svg
    viewBox="0 -960 960 960"
    className={twMerge("w-6 h-6 text-txt-2", className)}
    fill="currentColor"
  >
    <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
  </svg>
);

export default IcSearch;
