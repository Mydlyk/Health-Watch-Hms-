import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Box,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { color } from "react-native-reanimated";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import React, { useState } from "react";
import "react-native-svg";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
const Tab = createBottomTabNavigator();

export default function PatientChat({route,navigation}) {
  console.log(route);
    //const {json,gender} = route.params;
  return (
    <View style={styles.container3}>
      
       
       

        
    <View style={styles.container1}>
    <Image
source={require('../assets/images/empty_profile_avatar.jpg')}
style={styles.profile_image}

/>
<View style={styles.container3}>
  <View style={styles.container2}>
<Text style={styles.Text_title}>Name:</Text>
<Text style={styles.doctor_text}></Text>
</View>
<View style={styles.container2}>
<Text style={styles.Text_title}>Gender:</Text>
<Text style={styles.doctor_text}></Text>
</View>
<View style={styles.container2}>
<Text style={styles.Text_title}>Age:</Text>
<Text style={styles.doctor_text}></Text>
</View>
</View>

</View>
<View style={styles.container1_1}>
<View style={styles.container2}>
<Text style={styles.Text_title}>Address:</Text>
<Text style={styles.doctor_text}></Text>
</View>
<View style={styles.container2}>
<Text style={styles.Text_title}>Phone number:</Text>
<Text style={styles.doctor_text}></Text>
</View>
<View style={styles.container2}>
<Text style={styles.Text_title}>Email:</Text>
<Text style={styles.doctor_text}></Text>
</View>
<Text style={styles.doctor_text2}>Doctor Note:</Text>
<Text style={styles.doctor_text3}></Text>
</View>
<Text style={styles.Text_title3}>PupilRanges</Text>

      <View style={styles.container2_1}>
        <TouchableOpacity onPress={() => {}} style={{ marginTop: 20 }}>
          <AntDesign
            name="close"
            size={80}
            color={"#fff"}
            style={{
              alignItems: "center",
              textAlign: "center",
              borderWidth: 5,
              borderColor: "#A60000",
              marginLeft: 7,
              width: 80,
              height: 80,
              backgroundColor: "#A60000",
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container1: {
    backgroundColor: "#fff",
    flexDirection: "row",
    top: 50,
    width: "100%",
    marginTop:30
  },
  container1_1: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    top: 50,
    width: "100%",
  },
  container2_1: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  container2: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
    marginBottom:20
  },
  container3: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    width: "100%",
    textAlign: "center",
    
  },
  Text_title: {
    fontWeight: "500",
    fontSize: 16,
    fontFamily: "sans-serif-medium",
    marginLeft: 10,
  },
  Text_title2: {
    fontWeight: "500",
    fontSize: 20,
    fontFamily: "sans-serif-medium",
    color: "#FFFFFF",
  },
  Text_title3: {
    fontWeight: "300",
    fontSize: 18,
    fontFamily: "sans-serif-medium",
    marginTop: 20,
    marginBottom: 5,
    alignItems: "center",
    textAlign: "center",
    top: "5%",
    borderBottomWidth: 1,
    borderBottomColor: "#00A651",
    width: "85%",
    marginLeft: "7%",
    marginBottom: "15%",
  },
  navtitle: {
    top: 44,
    flexDirection: "row",
    alignItems: "center",
    justycontent: "center",
    marginLeft: "30%",
    width: "100%",
  },
  readings_view: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    margin: 5,
  },
  icon_style: {
    marginTop: 5,
    alignItems: "center",
    height: 55,
    width: 55,
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
  },
  notification_text1: {
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "sans-serif-medium",
    marginBottom: 5,
    alignItems: "center",
    marginLeft: 10,
  },
  notification_text2: {
    fontWeight: "light",
    marginLeft: 10,
  },
  profile_image: {
    textAlign: "Left",
    height: 150,
    width: 150,
    borderRadius: 30,
    marginBottom: 10,
    borderWidth: 5,
    borderColor: "#00A651",
    marginLeft: 7,
  },
  doctor_text: {
    flex: 1,
    color: "#00A651",
    fontWeight: "300",
    fontSize: 16,
    fontFamily: "sans-serif-medium",
    textAlign: "right",
    width: "100%",
    marginRight: 10,
  },
  doctor_text2: {
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "sans-serif-medium",
    marginLeft: 10,
    color: "#00A651",
  },
  doctor_text3: {
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "sans-serif-medium",
    marginLeft: 10,
    color: "#808080",
    marginBottom: 10,
  },
});
