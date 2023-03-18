import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/welcomeScreen";
import UserRegisterScreen from "../screens/userRegisterScreen";
import LoginScreen from "../screens/loginScreen";
import DoctorPersonalInfo from "../screens/DoctorPersonalInfo";
import DoctorRegisterScreen from "../screens/DoctorRegisterScreen";
import AddAssociateduser from "../screens/AddAssociateduser";
const Stack = createStackNavigator();

const StackBottomtabnavigation = () => {
  return (
    <Stack.Navigator initialRouteName="WelcomeScreen">
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{
          headerShown: false,
          headerStatusBarHeight: 30,
        }}
      />
      <Stack.Screen
        name="UserRegisterScreen"
        component={UserRegisterScreen}
        options={{
          headerStatusBarHeight: 30,
          headerTransparent: true,
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackBottomtabnavigation;
