import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { useTheme, Box } from "native-base";

export function Routes() {
  const { colors } = useTheme();
  const theme = DefaultTheme; // we can override the theme of 'NavigationContainer'
  theme.colors.background = colors.gray[700];

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  );
}

// creating a context navigation - context of auth routes and application routes
// we let's use of Box for not to occur glitch in screen