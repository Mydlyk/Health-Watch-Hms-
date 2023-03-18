import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AddPatients from "../screens/AddPatients";
import PatientList from "../screens/PatientList";
import Screen3 from "../screens/Associatedusers";
import BottomtabmenuPatients from "./BottomtabmenuPatients";
const Stack = createStackNavigator();

const StackNavPatients = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PatientList"
        component={PatientList}
        options={{
          headerStatusBarHeight: 30,
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="AddPatients"
        component={AddPatients}
        options={{
          headerStatusBarHeight: 30,
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="BottomtabmenuPatients"
        component={BottomtabmenuPatients}
        options={{
          headerStatusBarHeight: 30,
          headerTransparent: true,
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavPatients;
