export type PixelInfo = {
  _id: string;
  pixelName: string;
  pixelID: string;
  capiStatus: boolean;
  userSelectedPages: string[];
  pageSelectionOption?: string;
  currentPixelStatus: boolean;
};
export type CreatePixelState = {
  createdPixelsList: PixelInfo[];
};
