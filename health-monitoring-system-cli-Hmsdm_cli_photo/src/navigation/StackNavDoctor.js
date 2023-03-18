import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import DoctorScreen from "../screens/DoctorScreen";

import ChatSreen from "../screens/ChatScreen";

const Stack = createStackNavigator();

const StackNavDoctor = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DoctorScreen"
        component={DoctorScreen}
        options={{
          headerStatusBarHeight: 30,
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="ChatSreen"
        component={ChatSreen}
        options={{
          headerStatusBarHeight: 30,
          headerTransparent: true,
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavDoctor;
