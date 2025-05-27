import clsx from "clsx";
import { LOADING_STATUS } from "../../constants/enums";
import { useAppSelector } from "../../hooks/useRedux";
import { Bar, HorizontalLoadingBar } from "../shadcn/custom/HorizontalLoadingBar";

const LinearProgressIndicator = () => {
  const loadingStatus = useAppSelector((state) => state.loadingStatus);
  return (
    <HorizontalLoadingBar 
      className={clsx("absolute", {
        hidden: !(loadingStatus === LOADING_STATUS.LOADING),
      })}
    >
      <Bar/>
    </HorizontalLoadingBar>
  );
};

export default LinearProgressIndicator;
