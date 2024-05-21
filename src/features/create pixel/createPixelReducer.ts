// import { InitialState, PixelInfo } from "@/types/createPixel.types";
// import { ADD_PIXEL, SELECTED_PAGES } from "./actionTypes";

import { CreatePixelState, PixelInfo } from "@/types/createPixel.types";
import { ADD_PIXEL, SELECTED_PAGES } from "./actionTypes";

// export const initialState: InitialState = {
//   pixelName: "",
//   pixelID: "",
//   capiStatus: false,
//   selectedPages: [],
//   pixelsList: JSON.parse(localStorage.getItem("pixee-pixel") ?? "[]"),
// };

// type Action<T> = {
//   type: string;
//   payload?: T;
// };

// export const createPixelReducer = <T>(
//   state: InitialState,
//   action: Action<T>
// ) => {
//   const { type, payload } = action;
//   switch (type) {
//     /*
//     case PIXEL_NAME:
//       return {
//         ...state,
//         pixelName: payload,
//       };

//     case PIXEL_ID:
//       return {
//         ...state,
//         pixelID: payload,
//       };

//     case CAPI_STATUS:
//       return {
//         ...state,
//         capiStatus: !state?.capiStatus,
//       };
// */
//     case SELECTED_PAGES:
//       if (state?.selectedPages?.includes(payload as string)) {
//         return {
//           ...state,
//           selectedPages: state?.selectedPages?.filter(
//             (page) => page !== payload
//           ),
//         };
//       }
//       return {
//         ...state,
//         selectedPages: [...state.selectedPages, payload],
//       };

//     case ADD_PIXEL:
//       return {
//         ...state,
//         pixelsList: [...state.pixelsList, payload as PixelInfo],
//       };

//     default:
//       break;
//   }
// };

type CreatePixelAction<T> = {
  type: string;
  payload: T;
};

export const initialState: CreatePixelState = {
  selectedPages: [],
  pixelsList: JSON.parse(localStorage.getItem("pixee-pixel") ?? "[]"),
  pixelName: "",
  pixelID: "",
  capiStatus: false,
  PageSelectionOption: "allPages",
};

export const createPixelReducer = <T>(
  state: CreatePixelState,
  action: CreatePixelAction<T>
): CreatePixelState => {
  switch (action.type) {
    case SELECTED_PAGES:
      return {
        ...state,
        selectedPages: [...state.selectedPages, action.payload as string],
      };
    case ADD_PIXEL:
      return {
        ...state,
        pixelsList: [...state.pixelsList, action.payload as PixelInfo],
      };
    default:
      return state;
  }
};
