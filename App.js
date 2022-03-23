import React from "react";

// make sure this matches the file name of navigator config
// import MainStackNavigator from "./src/navigation/AppNavigator";

import AuthProvider from "./src/navigation/AuthProvider";
import Root from "./src/navigation/Root";

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
