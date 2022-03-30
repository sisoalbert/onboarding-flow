import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { AuthContext } from "../navigation/AuthProvider";

const LoginScreen = ({ navigation }) => {
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
};

export default LoginScreen;

const styles = StyleSheet.create({});
