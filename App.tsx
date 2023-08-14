import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base"; // this provider serve for access in application the components
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Loading } from "@components/Loading";
import { THEME } from "./src/theme";
import { Routes } from "./src/routes";
import { AuthContextProvider } from "@contexts/AuthContext"; // we let's to share data of user with the context 'AuthContext'
import OneSignal from "react-native-onesignal";

OneSignal.setAppId("5deef90f-4809-47b1-90d7-65f52a99174d");

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
