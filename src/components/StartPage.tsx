import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";
import { isPeselNumberValid } from "../utils/validators";
import { PeselInput } from "./PeselInput";
import { Wrapper } from "./Wrapper";

export const StartPage = () => {
  const navigate = useNavigate();
  const context = useContext(DataContext);

  const onRegistrationNumberChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    context.basicDataModifier({
      ...context.basicData,
      registrationNumber: event.currentTarget.value,
    });
  };

  const onPrivacyPolicyConsentChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    context.basicDataModifier({
      ...context.basicData,
      privacyPolicyConsent: event.currentTarget.checked,
    });
  };

  const isRegistrationNumberValid = () => {
    if (!context.basicData.registrationNumber) {
      return false;
    }

    return context.basicData.registrationNumber.length <= 8;
  };

  return (
    <Wrapper heading="My ubezpieczamy, Ty jesteś bezpieczny">
      <FormControl
        isInvalid={
          !!context.basicData.registrationNumber && !isRegistrationNumberValid()
        }
      >
        <FormLabel>Numer rejestracyjny</FormLabel>
        <Input
          type="text"
          value={context.basicData.registrationNumber}
          onChange={onRegistrationNumberChanged}
        />
        <FormErrorMessage>Niewłaściwy numer rejestracyjny</FormErrorMessage>
      </FormControl>
      <PeselInput />
      <Checkbox
        onChange={onPrivacyPolicyConsentChanged}
        isInvalid={!context.basicData.privacyPolicyConsent}
      >
        Akceptuję politykę prywatności
      </Checkbox>
      <Button
        colorScheme="red"
        disabled={
          !isRegistrationNumberValid() ||
          !isPeselNumberValid(context.basicData.peselNumber) ||
          !context.basicData.privacyPolicyConsent
        }
        onClick={() => navigate("/details-form")}
      >
        Sprawdź cenę
      </Button>
    </Wrapper>
  );
};
