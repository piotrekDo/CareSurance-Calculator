import { useCallback, useContext, useEffect, useState } from "react";
import { TariffApi } from "../api/TariffApi";
import { DataContext } from "../App";
import { Wrapper } from "./Wrapper";
import {
  Heading,
  Box,
  Text,
  FormControl,
  FormLabel,
  Switch,
  Stack,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import { PricingResponse } from "../models/PricingResponse";
import { Option } from "../models/Option";

export const OfferPage = () => {
  const context = useContext(DataContext);

  const [pricing, setPricing] = useState<PricingResponse>();
  const [finalPrice, setFinalPrice] = useState<number>(0);

  const postPricing = useCallback(async () => {
    const pricingResult = await TariffApi.postPricing({
      basicData: context.basicData,
      extendedData: context.extendedData,
    });

    setPricing(pricingResult.data);

    let price = 0;

    pricingResult.data.products.forEach((product) => {
      price += product.basePrice;
    });

    setFinalPrice(price);
  }, []);

  useEffect(() => {
    postPricing();
  }, [postPricing]);

  const getOptionValuesComponent = (option: Option) => {
    if (option.values.length < 2) {
      return <Checkbox>Zawarte w polisie</Checkbox>;
    } else {
      return (
        <Select>
          {option.values.map((value) => (
            <option value={value.name}>{value.name}</option>
          ))}
        </Select>
      );
    }
  };

  return (
    <Wrapper heading="Poznaj cenę">
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={8}
        textAlign="center"
      >
        <Text fontSize="lg">{`Numer rejestracyjny: ${context.basicData.registrationNumber}`}</Text>
        <Text fontSize="lg">{`Marka pojazdu: ${context.extendedData.manufacturer}`}</Text>
      </Box>
      <Heading as="h4" size="lg">
        Twoja wyjątkowa cena {finalPrice} PLN
      </Heading>
      {pricing?.products.map((product) => (
        <>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">{product.name}</FormLabel>
            <Switch isDisabled={product.name === "OC"} />
          </FormControl>
          {product.options.map((option) => (
            <Stack direction={"row"} spacing="8">
              <Text fontSize={"md"}>{option.name}</Text>
              {getOptionValuesComponent(option)}
            </Stack>
          ))}
        </>
      ))}
    </Wrapper>
  );
};
