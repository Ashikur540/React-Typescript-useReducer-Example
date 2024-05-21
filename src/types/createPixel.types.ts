export type PixelInfo = {
  pixelName: string;
  pixelID: string;
  capiStatus: boolean;
  selectedPages: string | string[];
  PageSelectionOption?: string;
};
export type CreatePixelState = {
  selectedPages: string | string[];
  pixelsList: PixelInfo[];
  pixelName: string;
  pixelID: string;
  capiStatus: boolean;
  PageSelectionOption: string;
};
