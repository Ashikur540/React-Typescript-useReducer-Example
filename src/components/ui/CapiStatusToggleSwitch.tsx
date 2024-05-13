import { changePixelStatus } from "@/features/create pixel/actions";
import {
  createPixelReducer,
  initialState,
} from "@/features/create pixel/createPixelReducer";
import { Badge } from "@shopify/polaris";
import { useCallback, useReducer } from "react";

type CapiStatusToggleSwitchProps = {
  capiActive: boolean;
  setCapiActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const CapiStatusToggleSwitch = ({
  capiActive,
  setCapiActive,
}: CapiStatusToggleSwitchProps) => {
  const { capiStatus } = initialState;
  const { dispatch } = useReducer(createPixelReducer, initialState);

  const handleToggleCapiStatus = useCallback((value: boolean) => {
    dispatch(changePixelStatus(value));
  }, []);

  return (
    <div className="flex gap-2 items-center">
      <label
        htmlFor="toggle"
        className={`relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300
                 ${capiStatus && "bg-green-600"} 
                 ${capiStatus && "before:translate-x-full"}`}
      >
        <input
          type="checkbox"
          className="peer sr-only opacity-0"
          id="toggle"
          onChange={handleToggleCapiStatus}
          checked={capiActive}
        />
        <span className="sr-only">Enable</span>
      </label>
      <Badge
        tone={capiActive ? "success" : "attention"}
      >{`${capiActive}`}</Badge>
    </div>
  );
};

export default CapiStatusToggleSwitch;
