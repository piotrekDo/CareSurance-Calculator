import axios from "axios";
import { CustomVehicleUsage } from "../models/CustomVehicleUsage";

export class DataApi {
  static getVehicleUsage = async () =>
    await axios.get<CustomVehicleUsage[]>(
      "http://localhost:8080/vehicle-usage"
    );
}
