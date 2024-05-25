import {
  CreatePixelAction,
  createPixelInitialState,
  createPixelReducer,
} from "@/features/create pixel/createPixelReducer";
import { CreatePixelState, PixelInfo } from "@/types/createPixel.types";
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

interface PixelContextType {
  createPixelState: CreatePixelState;
  dispatch: Dispatch<CreatePixelAction<PixelInfo | unknown>>;
}

const PixelStateContext = createContext<PixelContextType | undefined>(
  undefined
);

interface FBPixelProviderProps {
  children: ReactNode;
}

export const FBPixelProvider: React.FC<FBPixelProviderProps> = ({
  children,
}) => {
  const [createPixelState, dispatch] = useReducer(
    createPixelReducer,
    createPixelInitialState
  );

  return (
    <PixelStateContext.Provider
      value={{
        createPixelState,
        dispatch,
      }}
    >
      {children}
    </PixelStateContext.Provider>
  );
};

export const usePixelStateContext = (): PixelContextType => {
  const context = useContext(PixelStateContext);
  if (!context) {
    throw new Error("usePixelStateContext must be used within a PixelProvider");
  }
  return context;
};
