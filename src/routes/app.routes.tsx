import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const { Navigator, Screen } = createBottomTabNavigator();
import { Home } from "@screens/Home";
import { Exercise } from "@screens/Exercise";
import { Profile } from "@screens/Profile";
import { History } from "@screens/History";

export function AppRoutes() {
  return ( // this order reflects in the bottom menu
    <Navigator>
      <Screen name="home" component={Home} />
      <Screen name="history" component={History} />
      <Screen name="profile" component={Profile} />
      <Screen name="exercise" component={Exercise} />
    </Navigator>
  );
}
