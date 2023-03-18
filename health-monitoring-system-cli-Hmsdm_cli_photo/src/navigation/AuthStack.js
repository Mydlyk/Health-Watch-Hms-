import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/welcomeScreen";
import UserRegisterScreen from "../screens/userRegisterScreen";
import LoginScreen from "../screens/loginScreen";
import DoctorPersonalInfo from "../screens/DoctorPersonalInfo";
import DoctorRegisterScreen from "../screens/DoctorRegisterScreen";
import AddAssociateduser from "../screens/AddAssociateduser";
import EditProfile from "../screens/EditProfile";
import PasswordRecovery from "../screens/PasswordRecovery";
const Stack = createStackNavigator();

const AuthStack = () => {
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
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerStatusBarHeight: 30,
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="DoctorRegisterScreen"
        component={DoctorRegisterScreen}
        options={{
          headerStatusBarHeight: 30,
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="DoctorPersonalInfo"
        component={DoctorPersonalInfo}
        options={{
          headerStatusBarHeight: 30,
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="AddAssociateduser"
        component={AddAssociateduser}
        options={{
          headerStatusBarHeight: 30,
          headerTransparent: true,
          headerTitle: "",
        }}
      />
       <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerStatusBarHeight: 30,
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="PasswordRecovery"
        component={PasswordRecovery}
        options={{
          headerStatusBarHeight: 30,
          headerTransparent: true,
          headerTitle: "",
        }}
      />

    </Stack.Navigator>
  );
};

export default AuthStack;
