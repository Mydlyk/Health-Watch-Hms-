import {  StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import React, { createContext, useContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Bottomtabmenu from "./Bottomtabmenu";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Alerts from "../screens/Alerts";
import ChatScreen from "../screens/ChatScreen";
import CustomDrawer from "../containers/CustomDrawer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Detailedreadings from "../screens/Detailedreadings";
import StackNavPatients from "./StackNavPatients";
import Settings from "../screens/Settings";
import StackNavSettings from "./StackNavSettings";
import { AuthContext } from "../store/services/AuthContext";
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function DrawerSideMenu() {

  const { isDoctor } = useContext(AuthContext);
  const [show, Setshow] = useState(isDoctor);

  function showpatients() {
    if(show.toString()!="False"){
    
      return(
        <Drawer.Screen
        name="Patients"
        component={StackNavPatients}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="card-account-details-outline"
              size={30}
            />
          ),
        }}
      />
 
)
}

else{
  
}

};

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: { marginLeft: -20, fontSize: 15 },
        drawerActiveBackgroundColor: "#00A651",
        drawerActiveTintColor: "#000000",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Bottomtabmenu}
        screenOptions={{ unmountOnBlur: true }}
        options={{
          drawerIcon: () => <MaterialCommunityIcons name="home" size={30} />,
        }}
      />

      <Drawer.Screen
        name="Doctor chat"
        component={ChatScreen}
        options={{
          drawerIcon: () => (
            <Ionicons name="chatbubble-ellipses-outline" size={30} />
          ),
        }}
      />
      <Drawer.Screen
        name="Alerts"
        component={Alerts}
        options={{
          drawerIcon: () => (
            <FontAwesome name="warning" size={30} color={"#ff0000"} />
          ),
        }}
      />
      <Drawer.Screen
        name="Detailed readings"
        component={Detailedreadings}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="heart-pulse"
              size={30}
              color={"#E32636"}
            />
          ),
        }}
      />

      {showpatients()}
      <Drawer.Screen
        name="Settings"
        component={StackNavSettings}
        options={{
          drawerIcon: () => (
            <AntDesign
              name="setting"
              size={33}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
export default DrawerSideMenu;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "vertical",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    textAlign: "center",
  },
});
