import { Option } from "./Option";

export interface Product {
  name: string;
  basePrice: number;
  options: Option[];
}
