import { CAPI_STATUS, PIXEL_ID, PIXEL_NAME } from "./actionTypes";

type initialStateProps = {
  pixelName: string;
  pixelID: string;
  capiStatus: boolean;
  selectedPages: string[];
};

export const initialState = {
  pixelName: "",
  pixelID: "",
  capiStatus: false,
  selectedPages: [],
};

type CreatePixelReducerActionProp<T> = {
  type: string;
  payload: T;
};

export const createPixelReducer = <T>(
  state: initialStateProps,
  action: CreatePixelReducerActionProp<T>
) => {
  const { type, payload } = action;
  console.log("✨ ~ action:", action);
  switch (type) {
    case PIXEL_NAME:
      return {
        ...state,
        pixelName: payload,
      };

    case PIXEL_ID:
      return {
        ...state,
        pixelID: payload,
      };
    case CAPI_STATUS:
      return {
        ...state,
        capiStatus: !state?.capiStatus,
      };

    default:
      break;
  }
};
