import { CreatePixelState, PixelInfo } from "@/types/createPixel.types";
import {
  ADD_NEW_PIXEL,
  DELETE_PIXEL,
  EDIT_PIXEL,
  TOGGLE_PIXEL_STATUS,
} from "./actionTypes";

export type CreatePixelAction<T> = {
  type: string;
  payload: T;
};

export const createPixelInitialState: CreatePixelState = {
  createdPixelsList: JSON.parse(localStorage.getItem("pixee-pixel") || "[]"),
};

export const createPixelReducer = <T>(
  state: CreatePixelState = createPixelInitialState,
  action: CreatePixelAction<T>
): CreatePixelState => {
  switch (action.type) {
    case ADD_NEW_PIXEL: {
      const updatedPixelList = [
        ...state.createdPixelsList,
        action.payload as PixelInfo,
      ];
      localStorage.setItem("pixee-pixel", JSON.stringify(updatedPixelList));
      return {
        ...state,
        createdPixelsList: updatedPixelList,
      };
    }

    case TOGGLE_PIXEL_STATUS: {
      const updatedPixelList = state.createdPixelsList?.map((pixel) => {
        if (pixel.pixelID === action.payload) {
          pixel.currentPixelStatus = !pixel.currentPixelStatus;
        }
        return pixel;
      });
      localStorage.setItem("pixee-pixel", JSON.stringify(updatedPixelList));
      return {
        ...state,
        createdPixelsList: updatedPixelList,
      };
    }
    case EDIT_PIXEL: {
      const { payload } = action as CreatePixelAction<PixelInfo>;
      console.log("✨ ~ payload:", payload);
      const updatedPixelsList = state.createdPixelsList?.map((pixel) => {
        if (pixel._id === payload._id) {
          pixel["pixelName"] = payload["pixelName"];
          pixel["capiStatus"] = payload["capiStatus"];
          pixel["pixelID"] = payload["pixelID"];
          pixel["userSelectedPages"] = payload["userSelectedPages"];
        }
        return pixel;
      });
      console.log(
        "✨ ~ updatedPixelsList ~ updatedPixelsList:",
        updatedPixelsList
      );
      localStorage.setItem("pixee-pixel", JSON.stringify(updatedPixelsList));
      return {
        ...state,
        createdPixelsList: updatedPixelsList,
      };
    }

    case DELETE_PIXEL: {
      const updatedPixelsList = state.createdPixelsList?.filter(
        (pixel) => pixel.pixelID !== action.payload
      );
      localStorage.setItem("pixee-pixel", JSON.stringify(updatedPixelsList));
      return {
        ...state,
        createdPixelsList: updatedPixelsList,
      };
    }

    default:
      return state;
  }
};
