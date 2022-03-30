import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

const RegistrationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Registration screen</Text>
      <Button
        onPress={() => navigation.navigate("Onboarding")}
        title="Register User"
      />
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({});
