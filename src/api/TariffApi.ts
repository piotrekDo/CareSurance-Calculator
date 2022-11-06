import axios from "axios";
import { PricingRequest } from "../models/PricingRequest";
import { PricingResponse } from "../models/PricingResponse";

export class TariffApi {
  static postPricing = async (request: PricingRequest) =>
    await axios.post<PricingResponse>("http://localhost:8080/pricing", request);
}
