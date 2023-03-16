import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { Home } from "@screens/Home";
import { Exercise } from "@screens/Exercise";
import { Profile } from "@screens/Profile";
import { History } from "@screens/History";
import HomeSvg from "@assets/home.svg";
import HistorySvg from "@assets/history.svg";
import ProfileSvg from "@assets/profile.svg";
import { useTheme } from "native-base";

type AppRoutes = {
  home: undefined;
  exercise: undefined;
  profile: undefined;
  history: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>; // for use in olther interfaces

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  const iconSize = sizes[6];

  return (
    // this order reflects in the bottom menu
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // to delete menu subtitle
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => ( // we can rescue the default color used by the icons in the application
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen name="history" component={History} options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={iconSize} height={iconSize} />
          ),
        }} />
      <Screen name="profile" component={Profile} options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }} />
      <Screen name="exercise" component={Exercise} />
    </Navigator>
  );
}
