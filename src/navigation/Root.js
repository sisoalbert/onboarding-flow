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

import Onboarding from "react-native-onboarding-swiper";

import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./AuthProvider";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";

function HomeScreen() {
  const { setIsLoggedIn } = React.useContext(AuthContext);
  const logout = async () => {
    await AsyncStorage.removeItem("@token");
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Text>User is logged in!</Text>
      <Button onPress={logout} title="LOGOUT" />
    </View>
  );
}

function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Landing screen</Text>
      <Button
        // onPress={() => navigation.navigate("Register")}
        onPress={() => navigation.navigate("Onboarding")}
        title="Continue With Onboarding"
      />
      <Button
        onPress={() => navigation.navigate("Login")}
        title="Skip Onboarding"
      />
    </View>
  );
}

function LoginScreen({ navigation }) {
  const { setIsLoggedIn } = React.useContext(AuthContext);
  const { setItem } = useAsyncStorage("@token");
  const logInUser = async () => {
    setIsLoggedIn(true);
    await setItem("DUMMY TOKEN");
  };
  return (
    <View style={styles.container}>
      <Text>Registration screen</Text>
      <Button onPress={logInUser} title="Login User" />
    </View>
  );
}

function RegistrationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Registration screen</Text>
      <Button
        onPress={() => navigation.navigate("Onboarding")}
        title="Register User"
      />
    </View>
  );
}

function OnboardingScreen() {
  const { setIsLoggedIn } = React.useContext(AuthContext);
  const { setItem } = useAsyncStorage("@token");
  const logInUser = async () => {
    setIsLoggedIn(true);
    await setItem("DUMMY TOKEN");
  };

  // return (
  //   <View style={styles.container}>
  //     <Text>Onboarding Screen</Text>

  //     <Button onPress={logInUser} title="FINISH" />
  //   </View>
  // );
  const Dots = ({ selected }) => {
    let backgroundColor;

    backgroundColor = selected ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)";

    return (
      <View
        style={{
          width: 6,
          height: 6,
          marginHorizontal: 3,
          backgroundColor,
        }}
      />
    );
  };

  const Skip = ({ ...props }) => (
    <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
      <Text style={{ fontSize: 16 }}>Skip</Text>
    </TouchableOpacity>
  );

  const Next = ({ ...props }) => (
    <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
      <Text style={{ fontSize: 16 }}>Next</Text>
    </TouchableOpacity>
  );

  const Done = ({ ...props }) => (
    <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
      <Text style={{ fontSize: 16 }}>Done</Text>
    </TouchableOpacity>
  );

  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      // onSkip={() => navigation.replace("Login")}
      onSkip={logInUser}
      onDone={logInUser}
      pages={[
        {
          backgroundColor: "#a6e4d0",
          image: <Image source={require("../../assets/onboarding-img1.png")} />,
          title: "Connect to the World",
          subtitle: "A New Way To Connect With The World",
        },
        {
          backgroundColor: "#fdeb93",
          image: <Image source={require("../../assets/onboarding-img2.png")} />,
          title: "Share Your Favorites",
          subtitle: "Share Your Thoughts With Similar Kind of People",
        },
        {
          backgroundColor: "#e9bcbe",
          image: <Image source={require("../../assets/onboarding-img3.png")} />,
          title: "Become The Star",
          subtitle: "Let The Spot Light Capture You",
        },
      ]}
    />
  );
}

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
