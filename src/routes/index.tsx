import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { useTheme, Box } from "native-base";
import { AppRoutes } from "./app.routes";
import { useAuth } from "@hooks/useAuth";

export function Routes() {
  const { colors } = useTheme();
  const theme = DefaultTheme; // we can override the theme of 'NavigationContainer'
  theme.colors.background = colors.gray[700];
  const { user } = useAuth(); // we let's use object user for redirecting user for routes of app
  

  return ( 
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />} 
      </NavigationContainer>
    </Box>
  );
}

// creating a context navigation - context of auth routes and application routes
// we let's use of Box for not to occur glitch in screen
