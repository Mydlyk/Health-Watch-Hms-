import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Account from "../screens/Account";
import EditProfile from "../screens/EditProfile";
import Associatedusers from "../screens/Associatedusers";
const Stack = createStackNavigator();

const StackNavAccount = () => {
  return (
    <Stack.Navigator>


      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          unmountOnBlur: true,
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
    </Stack.Navigator>
  );
};

export default StackNavAccount;
