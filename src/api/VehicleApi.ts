import axios from "axios";
import { Manufacturer } from "../models/Manufacturer";

export class VehicleApi {
  static getManufacturers = async () =>
    await axios.get<Manufacturer[]>("http://localhost:8080/manufacturers");
}
