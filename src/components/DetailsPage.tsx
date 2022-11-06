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
} from "@chakra-ui/react";
import { DataContext } from "../App";
import { Wrapper } from "./Wrapper";
import { format } from "date-fns";
import { PeselInput } from "./PeselInput";
import { DataApi } from "../api/DataApi";
import { UsageIntent } from "../models/UsageIntent";
import { CustomVehicleUsage } from "../models/CustomVehicleUsage";

interface RequestStatus<T> {
  isLoaded: boolean;
  data: T;
}

export const DetailsPage = () => {
  const context = useContext(DataContext);

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

  const fetchVehicleUsage = useCallback(async () => {
    try {
      setRequestVehicleUsages({ data: [], isLoaded: false });

      const usages = await DataApi.getVehicleUsage();

      setRequestVehicleUsages({ data: usages.data, isLoaded: true });
    } catch (error) {
      // todo
      setRequestVehicleUsages({ data: [], isLoaded: false });
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchVehicleUsage();
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
    </Wrapper>
  );
};
