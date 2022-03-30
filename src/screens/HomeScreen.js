import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";

import { AuthContext } from "../navigation/AuthProvider";

const HomeScreen = () => {
  const { setIsLoggedIn } = React.useContext(AuthContext);
  const logout = async () => {
    await AsyncStorage.removeItem("@token");
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Text>User is logged in!!!!</Text>
      <Button onPress={logout} title="LOGOUT" />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
