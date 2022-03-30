import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";

import { AuthContext } from "../navigation/AuthProvider";

const OnboardingScreen = () => {
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
};

export default OnboardingScreen;

const styles = StyleSheet.create({});
