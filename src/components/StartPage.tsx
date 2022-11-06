import {
  Center,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface BasicData {
  registrationNumber: string;
  isRegistrationNumberValid: boolean;
  peselNumber: string;
  isPeselNumberValid: boolean;
  privacyPolicyConsent: boolean;
}

export const StartPage = () => {
  const navigate = useNavigate();

  const [basicData, setBasicData] = useState<BasicData>({
    registrationNumber: "",
    isRegistrationNumberValid: false,
    peselNumber: "",
    isPeselNumberValid: false,
    privacyPolicyConsent: false,
  });

  const onRegistrationNumberChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBasicData({
      ...basicData,
      registrationNumber: event.currentTarget.value,
    });
  };

  const onPeselNumberChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBasicData({
      ...basicData,
      peselNumber: event.currentTarget.value,
    });
  };

  const onPrivacyPolicyConsentChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBasicData({
      ...basicData,
      privacyPolicyConsent: event.currentTarget.checked,
    });
  };

  const isPeselNumberValid = () => {
    if (!basicData.peselNumber) {
      return false;
    }

    return basicData.peselNumber.length === 11;
  };

  const isRegistrationNumberValid = () => {
    if (!basicData.registrationNumber) {
      return false;
    }

    return basicData.registrationNumber.length <= 8;
  };

  return (
    <Center bg="#ccc" h="100vh" flexDirection={"column"}>
      <Heading as={"h2"} size="lg">
        My ubezpieczamy, Ty jesteś bezpieczny
      </Heading>
      <Stack direction={"column"} bg="white" p={16}>
        <FormControl
          isInvalid={
            !!basicData.registrationNumber && !isRegistrationNumberValid()
          }
        >
          <FormLabel>Numer rejestracyjny</FormLabel>
          <Input
            type="text"
            value={basicData.registrationNumber}
            onChange={onRegistrationNumberChanged}
          />
          <FormErrorMessage>Niewłaściwy numer rejestracyjny</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!basicData.peselNumber && !isPeselNumberValid()}
        >
          <FormLabel>Numer PESEL właściciela pojazdu</FormLabel>
          <Input
            type="text"
            value={basicData.peselNumber}
            onChange={onPeselNumberChanged}
          />
          <FormErrorMessage>Niewłaściwy numer PESEL</FormErrorMessage>
        </FormControl>
        <Checkbox
          onChange={onPrivacyPolicyConsentChanged}
          isInvalid={!basicData.privacyPolicyConsent}
        >
          Akceptuję politykę prywatności
        </Checkbox>
        <Button
          colorScheme="red"
          disabled={
            !isRegistrationNumberValid() ||
            !isPeselNumberValid() ||
            !basicData.privacyPolicyConsent
          }
          onClick={() => navigate("/details-form")}
        >
          Sprawdź cenę
        </Button>
      </Stack>
    </Center>
  );
};
