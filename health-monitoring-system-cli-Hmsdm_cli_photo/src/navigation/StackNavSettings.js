import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AddPatients from "../screens/AddPatients";
import Settings from "../screens/Settings";
import ChangePassword from "../screens/ChangePassword";
import DeleteAccount from "../screens/DeleteAccount";
const Stack = createStackNavigator();

const StackNavSettings = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerStatusBarHeight: 30,
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerStatusBarHeight: 30,
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccount}
        options={{
          headerStatusBarHeight: 30,
          headerTransparent: true,
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavSettings;
