import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  );
}

// creating a context navigation - context of auth routes and application routes