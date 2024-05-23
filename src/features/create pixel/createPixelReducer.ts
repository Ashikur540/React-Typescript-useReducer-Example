import { CreatePixelState } from "@/types/createPixel.types";
import { SELECTED_PAGES } from "./actionTypes";

type CreatePixelAction<T> = {
  type: string;
  payload: T;
};

export const initialState: CreatePixelState = {
  selectedPages: [],
  // pixelsList: JSON.parse(localStorage.getItem("pixee-pixel") ?? "[]"),
  pixelName: "",
  pixelID: "",
  capiStatus: false,
  PageSelectionOption: "allPages",
};

export const createPixelReducer = <T>(
  state: CreatePixelState,
  action: CreatePixelAction<T>
): CreatePixelState => {
  console.log("✨ ~ action:", action);
  switch (action.type) {
    case SELECTED_PAGES: {
      console.log("Adding new page:", action.payload);
      return {
        ...state,
        selectedPages: [...state.selectedPages, action.payload as string],
      };
    }
    // case ADD_NEW_PIXEL: {
    //   console.log("Adding new pixel:", action.payload);
    //   return {
    //     ...state,
    //     pixelsList: [...state.pixelsList, action.payload as PixelInfo],
    //   };
    //   // return state;
    // }
    default:
      return state;
  }
};
