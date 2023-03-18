import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Screen1 from "../screens/HomeScreen";
import Screen2 from "../screens/DoctorScreen";
import Screen4 from "../screens/Account";
import { createStackNavigator } from "@react-navigation/stack";
import StackNav from "./StackNavAssociatedUsers";
import BottomtabmenuPupil from "./BottomtabmenuPupil";
import StackNavAccount from "./StackNavAccount";
import StackNavDoctor from "./StackNavDoctor";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator;
export default function Bottomtabmenu() {
  const getTabBarStyle = (route) => {  
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'PupilDetails';
    let display = (routeName === 'BottomtabmenuPupil') ? 'none':'flex';
    return {display}
  }
  return (
    <Tab.Navigator
      initialRouteName="Screen1"
      screenOptions={{
        tabBarActiveTintColor: "#00A651",
        header: () => null,
      }}
    >
      <Tab.Screen
        name="Screen1"
        component={Screen1}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={37} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="StackNavDoctor"
        component={StackNavDoctor}
        options={{
          tabBarLabel: "Doctor",
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="doctor" color={color} size={30} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Associated users"
        component={StackNav}
        
        options={({route}) =>({
          tabBarStyle: getTabBarStyle(route),
          tabBarLabel: "Associated users",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-heart" color={color} size={37} />
          ),
        })}
        
      ></Tab.Screen>

      <Tab.Screen
        name="StackNavAccount"
        component={StackNavAccount}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={37} />
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
