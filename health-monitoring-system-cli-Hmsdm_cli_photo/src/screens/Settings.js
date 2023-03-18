import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    ToastAndroid,
    Image
  } from "react-native";
  import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
  import "react-native-gesture-handler";
  import AntDesign from "react-native-vector-icons/AntDesign";
  import React, { createContext, useContext, useEffect, useState } from "react";
  import "react-native-svg";
  import CustomButton from "../components/atoms/buttons";
  import fonts from "../theme/fonts.js";
  import colors from "../theme/colors.js";
  import { AuthContext } from "../store/services/AuthContext";
  import FormInput from "../components/atoms/textInputs";
  import Clipboard from '@react-native-clipboard/clipboard';
import { Shadow } from "@shopify/react-native-skia";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
  const Tab = createBottomTabNavigator();
  
  export default function Settings() {
    const navigation = useNavigation(); 
    const { userToken, url } = useContext(AuthContext);
    
    return (
      <View style={styles.container1_1} >
        <View style={styles.setting_background}>
          <View style={{flexDirection:"row"}}>
        <Ionicons style={styles.Icon_title}
              name="settings-sharp"
              size={40}
            />
          <Text style={styles.Text_title2}>  Settings</Text>
          </View>
        </View>
        <View style={styles.container1}>
        <View style={{flexDirection:"row", borderBottomWidth:1, borderColor:"gray"}}>
        <Image
            source={require("../assets/images/empty_profile_avatar.jpg")}
            style={styles.profile_image}
          />
          <Text style={styles.Text_title}>  Jan Kowalski</Text>
          </View>

          <Text style={styles.Text_title3}>  Account Settings</Text>
          <View style={{flexDirection:"row",width:"80%"}}>
          <Text style={styles.Text_title}>  Edit Profile</Text>
          <Text style={styles.Text_title_1}>  {'                   >'}</Text>
          </View>
          <TouchableOpacity  onPress={() => navigation.navigate("ChangePassword")  }>
          <View style={{flexDirection:"row",width:"80%"}}>
          <Text style={styles.Text_title}>  Change password</Text>
          <Text style={styles.Text_title_1}>  {'       >'}</Text>
          </View>
          </TouchableOpacity>
          <View style={{flexDirection:"row",width:"80%"}}>
          <Text style={styles.Text_title}>  Google Fit</Text>
          
          <Text style={styles.Text_title_1}>  {'                    >'}</Text>
          </View>
          <View style={{flexDirection:"row", borderBottomWidth:1, borderColor:"gray"}}>
          <Text style={styles.Text_title_1}>  Dark mode</Text>
          <Text style={styles.Text_title_1}>                    off</Text>
          </View>
          <Text style={styles.Text_title3}>  More</Text>
          <TouchableOpacity  onPress={() => navigation.navigate("DeleteAccount")  }>
          <View style={{flexDirection:"row",width:"80%"}}>
          <Text style={styles.Text_title}>  Delete account</Text>
          <Text style={styles.Text_title_1}>  {'            >'}</Text>
          </View>
          </TouchableOpacity>
          <View style={{flexDirection:"row",width:"80%"}}>
          <Text style={styles.Text_title}>  Privacy policy</Text>
          <Text style={styles.Text_title_1}>  {'              >'}</Text>
          </View>
          <View style={{flexDirection:"row",width:"80%"}}>
          <Text style={styles.Text_title}>  Terms and conditions</Text>
          
          <Text style={styles.Text_title_1}>  {'>'}</Text>
          </View>
          </View>
      </View>
    );
  }
  const styles = StyleSheet.create({
   container1: {
    position: 'absolute',
    backgroundColor: "#fff",
    flexDirection: "column",
    width: "90%",
    marginLeft:"5%",
    height:625,
    borderRadius:25,
    top:"15%",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 20,
    },
    shadowOpacity: 0.83,
    shadowRadius: 9.51,
    
    elevation: 15,
   },
   setting_background: {
    height:200,
    backgroundColor: "#00A651",
    borderBottomRightRadius:25,
    borderBottomLeftRadius:25
   },
    container1_1: {
      flex: 1,
      flexDirection: "column",
      width: "100%",
      marginBottom: "20%",
    },
    container2_1: {
      alignItems: "flex-end",
      flexDirection: "row",
      backgroundColor: "#fff",
      marginBottom: 10,
    },
    container2: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "#fff",
      width: "100%",
      marginBottom: 10,
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
      marginTop:30
    },
    Text_title_1: {
      fontWeight: "500",
      fontSize: 16,
      fontFamily: "sans-serif-medium",
      marginLeft: 10,
      marginTop:30,
      textAlign:'right',
    },
    Text_title2: {
      fontWeight: "500",
      fontSize: 26,
      fontFamily: "sans-serif-medium",
      color: "#FFFFFF",
      top:"10%"
    },
    Icon_title: {
      fontWeight: "500",
      fontFamily: "sans-serif-medium",
      color: "#FFFFFF",
      top:"10%",
      marginLeft:10
    },
    Text_title3: {
      fontWeight: "500",
      fontFamily: "sans-serif-medium",
      color: "gray",
      marginLeft:10,
      top:10,
      fontSize:17
    },
    Pairing_c: {
      fontWeight: "300",
      fontSize: 25,
      fontFamily: "sans-serif-medium",
      marginTop: 5,
      alignItems: "center",
      textAlign: "center",
      borderWidth: 1,
      bordecrolor: "gray",
      width: "60%",
      marginLeft: "20%",
      borderWidth: 1,
      borderColor: "gray",
      height: 40,
      borderRadius: 10,
      fontSize: 25,
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
      width: "85%",
      alignItems: "center",
      textAlign: "center",
      marginTop: 10,
    },
    notification_text2: {
      fontWeight: "light",
      marginLeft: 10,
      marginTop: 10,
    },
    notification_text2_1: {
      fontWeight: "light",
      marginLeft: 10,
      marginTop: 10,
      marginRight: "40%",
    },
    profile_image: {
      textAlign: "Left",
      height: 70,
      width: 70,
      borderRadius: 100,
      marginBottom: 10,
      marginLeft: 30,
      marginTop:10
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
  