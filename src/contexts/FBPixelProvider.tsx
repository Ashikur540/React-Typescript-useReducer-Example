import { PixelInfo } from "@/types/createPixel.types";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface PixelContextType {
  pixelsList: PixelInfo[];
  setPixelsList: React.Dispatch<React.SetStateAction<PixelInfo[]>>;
}

const PixelContext = createContext<PixelContextType | undefined>(undefined);

interface FBPixelProviderProps {
  children: ReactNode;
}

export const FBPixelProvider = ({ children }: FBPixelProviderProps) => {
  const [pixelsList, setPixelsList] = useState<PixelInfo[]>(
    JSON.parse(localStorage.getItem("pixee-pixel") ?? "[]")
  );

  return (
    <PixelContext.Provider value={{ pixelsList, setPixelsList }}>
      {children}
    </PixelContext.Provider>
  );
};

export const usePixelContext = () => {
  const context = useContext(PixelContext);
  if (!context) {
    throw new Error("usePixelContext must be used within a PixelProvider");
  }
  return context;
};
