import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StartPage } from "./components/StartPage";
import { DetailsPage } from "./components/DetailsPage";
import { createContext, useState } from "react";
import { BasicData } from "./models/BasicData";

interface DataContext {
  basicData: BasicData;
  basicDataModifier: (value: BasicData) => void;
}

export const DataContext = createContext<DataContext>({
  basicData: {
    registrationNumber: "",
    isRegistrationNumberValid: false,
    peselNumber: "",
    isPeselNumberValid: false,
    privacyPolicyConsent: false,
  },
  basicDataModifier: (value: BasicData) => {},
});

function App() {
  const [basicData, setBasicData] = useState<BasicData>({
    registrationNumber: "",
    isRegistrationNumberValid: false,
    peselNumber: "",
    isPeselNumberValid: false,
    privacyPolicyConsent: false,
  });

  const basicDataModifier = (value: BasicData) => {
    setBasicData(value);
  };

  return (
    <DataContext.Provider
      value={{ basicData: basicData, basicDataModifier: basicDataModifier }}
    >
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StartPage />}></Route>
            <Route path="/details-form" element={<DetailsPage />}></Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </DataContext.Provider>
  );
}

export default App;
