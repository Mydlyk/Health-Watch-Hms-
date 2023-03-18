import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Screen1 from "../screens/HomeScreen";
import Screen2 from "../screens/DoctorScreen";
import Screen4 from "../screens/Account";
import { createStackNavigator } from "@react-navigation/stack";
import StackNav from "./StackNavAssociatedUsers";
import PupilDetails from "../screens/PupilDetails";
import ChatScreen from "../screens/ChatScreen";
import PupilmoreDetails from "../screens/Pupilmoredetails";
import PupilAlerts from "../screens/PupilAlerts";
import PupilLocalization from "../screens/PupilLocalization";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator;
export default function BottomtabmenuPupil() {
  return (
    <Tab.Navigator
      initialRouteName="PupilDetails"
      screenOptions={{
        tabBarActiveTintColor: "#00A651",
        header: () => null,
      }}
    >
      <Tab.Screen
        name="PupilDetails"
        component={PupilDetails}
        options={{
          tabBarLabel: "Pupil",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-outline" color={color} size={37} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="PupilmoreDetails"
        component={PupilmoreDetails}
        options={{
          tabBarLabel: "Pupil Details",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="hearto" color={color} size={37} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="PupilAlert"
        component={PupilAlerts}
        options={{
          tabBarLabel: "Pupil Alerts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alert-circle" color={color} size={37} />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="PupilLocalization"
        component={PupilLocalization}
        options={{
          tabBarLabel: "Pupil Localization",
          tabBarIcon: ({ color, size }) => (
            <EvilIcons name="location" color={color} size={40} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
