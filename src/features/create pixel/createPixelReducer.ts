import {
  CAPI_STATUS,
  PIXEL_ID,
  PIXEL_NAME,
  SELECTED_PAGES,
} from "./actionTypes";

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
  payload?: T;
};

export const createPixelReducer = <T>(
  state: initialStateProps,
  action: CreatePixelReducerActionProp<T>
) => {
  const { type, payload } = action;
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

    case SELECTED_PAGES:
      if (state?.selectedPages?.includes(payload)) {
        return {
          ...state,
          selectedPages: state?.selectedPages?.filter(
            (page) => page !== payload
          ),
        };
      }
      return {
        ...state,
        selectedPages: [...state.selectedPages, payload],
      };

    default:
      break;
  }
};
