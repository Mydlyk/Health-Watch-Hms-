import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
import Screen1 from "../screens/HomeScreen";
import Screen2 from "../screens/DoctorScreen";
import Screen4 from "../screens/Account";
import { createStackNavigator } from "@react-navigation/stack";
import StackNav from "./StackNavAssociatedUsers";
import PatientProfile from "../screens/PatientProfile";
import PatientAlerts from "../screens/PatientAlerts";
import PatientChat from "../screens/PatientChat";
import EditPatient from "../screens/EditPatient";
import PatientReadings from "../screens/PatientReadings";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator;
export default function BottomtabmenuPatients() {
  return (
    <Tab.Navigator
      initialRouteName="PatientProfile"
      screenOptions={{
        tabBarActiveTintColor: "#00A651",
        header: () => null,
      }}
    >
      <Tab.Screen
        name="PatientProfile"
        component={PatientProfile}
        options={{
          tabBarLabel: "Patient profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-details-outline" color={color} size={30} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="PatientAlerts"
        component={PatientAlerts}
        options={{
          tabBarLabel: "Patient alerts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alert-circle" color={color} size={30} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="PatientChat"
        component={PatientChat}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-ellipses-outline" color={color} size={30} />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="PatientReadings"
        component={PatientReadings}
        options={{
          tabBarLabel: "Patient readings",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="heartbeat" color={color} size={30} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="EditPatient"
        component={EditPatient}
        options={{
          tabBarLabel: "Edit patient",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-edit-outline" color={color} size={30} />
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
