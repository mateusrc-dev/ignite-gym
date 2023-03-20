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
import { AuthContext } from "@contexts/AuthContext"; // we let's to share data of user with the context 'AuthContext'

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
      <AuthContext.Provider
        value={{
          user: {
            name: "Mateus",
            id: "1",
            avatar: "mateus.png",
            email: "mateus@hotmail.com",
          }
        }}
      >
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}
