import * as React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./AuthProvider";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import LandingScreen from "../screens/LandingScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import OnboardingScreen from "../screens/OnboardingScreen";

const Stack = createStackNavigator();
function Root() {
  const { isLoggedIn, setIsLoggedIn } = React.useContext(AuthContext);
  const { getItem } = useAsyncStorage("@token");
  const [checking, setIsChecking] = React.useState(true);

  React.useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      const item = await getItem();

      // user is logged in
      if (item !== null) {
        setIsLoggedIn(true);
      }

      setIsChecking(false);
    };

    checkIfUserIsLoggedIn();
  }, []);

  if (checking) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Register" component={RegistrationScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Root;
