import { useCallback, useContext, useEffect, useState } from "react";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  Stack,
  Select,
  Skeleton,
  useToast,
  Button,
} from "@chakra-ui/react";
import { DataContext } from "../App";
import { Wrapper } from "./Wrapper";
import { format } from "date-fns";
import { PeselInput } from "./PeselInput";
import { DataApi } from "../api/DataApi";
import { UsageIntent } from "../models/UsageIntent";
import { CustomVehicleUsage } from "../models/CustomVehicleUsage";
import { VehicleApi } from "../api/VehicleApi";
import { Manufacturer } from "../models/Manufacturer";
import { useNavigate } from "react-router-dom";
import { isPeselNumberValid } from "../utils/validators";

interface RequestStatus<T> {
  isLoaded: boolean;
  data: T;
}

export const DetailsPage = () => {
  const context = useContext(DataContext);
  const toast = useToast();
  const navigate = useNavigate();

  const [requestManufacturers, setRequestManufacturers] = useState<
    RequestStatus<Manufacturer[]>
  >({
    isLoaded: false,
    data: [],
  });

  const [requestVehicleUsages, setRequestVehicleUsages] = useState<
    RequestStatus<CustomVehicleUsage[]>
  >({
    isLoaded: false,
    data: [],
  });

  const onInsuranceStartDateChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    context.extendedDataModifier({
      ...context.extendedData,
      insuranceStartDate:
        event.currentTarget.valueAsDate ||
        context.extendedData.insuranceStartDate,
    });
  };

  const onManufacturerSelected = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    context.extendedDataModifier({
      ...context.extendedData,
      manufacturer: event.currentTarget.value,
    });
  };

  const fetchVehicleUsage = useCallback(async () => {
    try {
      setRequestVehicleUsages({ data: [], isLoaded: false });

      const usages = await DataApi.getVehicleUsage();

      setRequestVehicleUsages({ data: usages.data, isLoaded: true });
    } catch (error) {
      setRequestVehicleUsages({ data: [], isLoaded: true });
      toast({
        title: "Uwaga!",
        description: "Wystąpił błąd poczas pobierania danych",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }, []);

  const fetchManufacturers = useCallback(async () => {
    try {
      setRequestManufacturers({ data: [], isLoaded: false });

      const manufactuers = await VehicleApi.getManufacturers();

      setRequestManufacturers({ data: manufactuers.data, isLoaded: true });
    } catch (error) {
      setRequestManufacturers({ data: [], isLoaded: true });
    }
  }, []);

  useEffect(() => {
    fetchVehicleUsage();
    fetchManufacturers();
  }, []);

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
          onChange={onInsuranceStartDateChanged}
        />
      </FormControl>
      <PeselInput />
      <Heading as="h2" size="lg">
        Dane pojazdu
      </Heading>
      <FormControl>
        <FormLabel>Sposób użytkowania pojazdu</FormLabel>
        <RadioGroup
          defaultValue={context.extendedData.usageIntent}
          onChange={(newValue: UsageIntent) => {
            context.extendedDataModifier({
              ...context.extendedData,
              usageIntent: newValue,
            });
          }}
        >
          <Stack spacing={5} direction="row">
            <Radio colorScheme="red" value={UsageIntent.Private}>
              Prywatny
            </Radio>
            <Radio colorScheme="red" value={UsageIntent.Custom}>
              Niestandardowy
            </Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      {context.extendedData.usageIntent === UsageIntent.Custom && (
        <FormControl>
          <FormLabel>Sposób niestandardowego wykorzystania</FormLabel>
          <Skeleton isLoaded={requestVehicleUsages.isLoaded}>
            <Select placeholder="Wybierz sposób">
              {requestVehicleUsages.data.map((vehicleUsage) => (
                <option value={vehicleUsage.name}>{vehicleUsage.name}</option>
              ))}
            </Select>
          </Skeleton>
        </FormControl>
      )}
      <FormControl>
        <FormLabel>Producent</FormLabel>
        <Skeleton isLoaded={requestManufacturers.isLoaded}>
          <Select
            placeholder="Wybierz producenta"
            onChange={onManufacturerSelected}
          >
            {requestManufacturers.data.map((manufacturer) => (
              <option value={manufacturer.name}>{manufacturer.name}</option>
            ))}
          </Select>
        </Skeleton>
      </FormControl>
      <Button
        colorScheme="red"
        disabled={
          !isPeselNumberValid(context.basicData.peselNumber) ||
          !context.extendedData.manufacturer
        }
        onClick={() => navigate("/offer")}
      >
        Dalej
      </Button>
    </Wrapper>
  );
};
