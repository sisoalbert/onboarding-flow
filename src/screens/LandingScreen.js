import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";

import { AuthContext } from "../navigation/AuthProvider";

const LandingScreen = ({ navigation }) => {
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
};

export default LandingScreen;

const styles = StyleSheet.create({});
