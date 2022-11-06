import { useContext } from "react";
import { DataContext } from "../App";

export const DetailsPage = () => {
  const context = useContext(DataContext);

  return <div>Szczegóły: {context.basicData.registrationNumber}</div>;
};
