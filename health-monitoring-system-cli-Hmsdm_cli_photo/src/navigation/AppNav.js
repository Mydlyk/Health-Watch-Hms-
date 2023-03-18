import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerSideMenu from "./DrawerSideMenu";
import AuthStack from "./AuthStack";
import { AuthContext } from "../store/services/AuthContext";

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);
  let auth = false;
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {userToken !== "" ? <DrawerSideMenu /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
