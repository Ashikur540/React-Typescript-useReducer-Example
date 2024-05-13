import { CAPI_STATUS, PIXEL_ID, PIXEL_NAME } from "./actionTypes";

export const changePixelName = (pixelName: string) => {
  return {
    type: PIXEL_NAME,
    payload: pixelName,
  };
};

export const changePixelID = (id: string) => {
  return {
    type: PIXEL_ID,
    payload: id,
  };
};

export const changePixelStatus = (status: boolean) => {
  return {
    type: CAPI_STATUS,
    payload: status,
  };
};
