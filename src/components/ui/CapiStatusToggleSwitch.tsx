import { Badge } from "@shopify/polaris";
import { ChangeEventHandler } from "react";

interface ICapiStatusSwitchProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: boolean;
}

const CapiStatusToggleSwitch = ({
  onChange,
  value,
}: ICapiStatusSwitchProps) => {
  return (
    <div className="flex gap-2 items-center">
      <label
        htmlFor="toggle"
        className={`relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300
                 ${value && "bg-slate-900"} 
                 ${value && "before:translate-x-full"}`}
      >
        <input
          type="checkbox"
          className="peer sr-only opacity-0"
          id="toggle"
          onChange={onChange}
          checked={value}
          defaultValue="false"
        />
        <span className="sr-only">Enable</span>
      </label>
      <Badge tone={value ? "success" : "attention"}>{`${
        value ? "Enabled" : "Disabled"
      }`}</Badge>
    </div>
  );
};

export default CapiStatusToggleSwitch;
