import { useContext } from "react";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { DataContext } from "../App";
import { Wrapper } from "./Wrapper";
import { format } from "date-fns";

export const DetailsPage = () => {
  const context = useContext(DataContext);

  return (
    <Wrapper>
      <Heading as="h2" size="lg">
        Dane ubezpieczającego
      </Heading>
      <FormControl>
        <FormLabel>Data rozpoczęcia ubezpieczenia</FormLabel>
        <Input
          type="date"
          placeholder="Wybierz datę"
          min={format(new Date(), "yyyy-MM-dd")}
        />
      </FormControl>
    </Wrapper>
  );
};
