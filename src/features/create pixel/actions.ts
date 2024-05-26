import { PixelInfo } from "@/types/createPixel.types";
import {
  ADD_NEW_PIXEL,
  DELETE_PIXEL,
  EDIT_PIXEL,
  TOGGLE_CREATE_SUCCESS_TOAST,
  TOGGLE_DELETE_SUCCESS_TOAST,
  TOGGLE_PIXEL_STATUS,
} from "./actionTypes";

export const addNewPixel = (pixel: PixelInfo) => {
  // console.log("✨ ~ addNewPixel ~ pixel:", pixel);
  return {
    type: ADD_NEW_PIXEL,
    payload: pixel,
  };
};
export const togglePixelStatus = (id: string) => {
  // console.log("✨ ~ togglePixelStatus ~ id:", id);
  return {
    type: TOGGLE_PIXEL_STATUS,
    payload: id,
  };
};

export const editPixel = (pixel: PixelInfo) => {
  // console.log("✨ ~ pixel :", pixel);
  return {
    type: EDIT_PIXEL,
    payload: pixel,
  };
};

export const deletePixel = (id: string) => {
  // console.log("✨ ~ pixel :", pixel);
  return {
    type: DELETE_PIXEL,
    payload: id,
  };
};

export const toggleCreatePixelSuccessToast = () => {
  return {
    type: TOGGLE_CREATE_SUCCESS_TOAST,
  };
};

export const toggleDeletePixelSuccessToast = () => {
  return {
    type: TOGGLE_DELETE_SUCCESS_TOAST,
  };
};
