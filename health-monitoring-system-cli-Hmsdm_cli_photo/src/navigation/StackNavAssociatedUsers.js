import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AddAssociateduser from "../screens/AddAssociateduser";
import Screen3 from "../screens/Associatedusers";
import GuardianDetails from "../screens/GuardianDetails";
import PupilDetails from "../screens/PupilDetails";
import BottomtabmenuPupil from "./BottomtabmenuPupil";
const Stack = createStackNavigator();

const StackNavAssociatedUsers = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Associateduser"
        component={Screen3}
        options={{
          unmountOnBlur: true,
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
        name="GuardianDetails"
        component={GuardianDetails}
        options={{
          headerStatusBarHeight: 30,
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="PupilDetails"
        component={PupilDetails}
        options={{
          
          headerStatusBarHeight: 30,
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="BottomtabmenuPupil"
        component={BottomtabmenuPupil}
        options={{
          headerStatusBarHeight: 30,
          headerTransparent: true,
          headerTitle: "",
          
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavAssociatedUsers;
