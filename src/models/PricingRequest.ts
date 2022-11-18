import { BasicData } from "./BasicData";
import { ExtendedData } from "./ExtendedData";

export interface PricingRequest {
  basicData: BasicData;
  extendedData: ExtendedData;
}
