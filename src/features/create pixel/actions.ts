import { PixelInfo } from "@/types/createPixel.types";
import { ADD_NEW_PIXEL, SELECTED_PAGES } from "./actionTypes";

// export const changePixelName = (pixelName: string) => {
//   return {
//     type: PIXEL_NAME,
//     payload: pixelName,
//   };
// };

// export const changePixelID = (id: string) => {
//   return {
//     type: PIXEL_ID,
//     payload: id,
//   };
// };

// export const changePixelStatus = () => {
//   return {
//     type: CAPI_STATUS,
//   };
// };

export const selectPagesHandler = (pages: string) => {
  return {
    type: SELECTED_PAGES,
    payload: pages,
  };
};

export const addNewPixel = (pixel: PixelInfo) => {
  console.log("✨ ~ addNewPixel ~ PixelInfo:", pixel);
  return {
    type: ADD_NEW_PIXEL,
    payload: pixel,
  };
};
