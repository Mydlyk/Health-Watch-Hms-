import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    ToastAndroid,
    ScrollView,
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
  const Tab = createBottomTabNavigator();
  
  export default function ChangePassword() {
    const { userToken, url } = useContext(AuthContext);
    const [passwordold, setPasswordold] = useState("");
    const [passwordnew1, setPasswordnew1] = useState("");
    const [passwordnew2, setPasswordnew2] = useState("");
    const [passwordVisibleold, setPasswordVisibleold] = useState(true);
    const [passwordVisiblenew1, setPasswordVisiblenew1] = useState(true);
    const [passwordVisiblenew2, setPasswordVisiblenew2] = useState(true);


    const params = new URLSearchParams({
      old_password:passwordold.toString(),
      new_password:passwordnew1.toString(),
      Authorization: "Bearer " + userToken,
      
    }).toString();
    const change_p = async () => {
      var polaczenie = true;
      
        if(passwordnew1!=passwordnew2){
          Alert.alert("The passwords are not identical");
        }
        else{
      try {
        
        fetch(`http://${url}:8080/api/user/changePassword?`+ params,{  
          headers: {
            old_password:passwordold.toString(),
            new_password:passwordnew1.toString(),
            Authorization: "Bearer " + userToken,
          },
          method: 'PUT',
         
        }).then((response) => console.log(response.text))
        .then((quote) => {
          console.log(quote);
          Alert.alert(quote.error);
        }
        );
      
       } catch (error) {
         console.log(error);
         Alert.alert("Something went wrong", "We are unable to post your reading data to server!");
       }
      }
    }

    
    return (
      <ScrollView>
      <View style={styles.center}>
        <Image
          source={require("../assets/images/hms_logo.png")}
          style={{ width: 200, height: 200 }}
        />
        <Text style={styles.title}>HealthWatch</Text>
        <Text style={styles.subtitle}>Your life in your hands</Text>
        <View style={styles.container2}>
        <FormInput
          placeholder="Old Password"
          inputstyle={{ marginTop: 50 }}
          onChangeText={setPasswordold}
          secureTextEntry={passwordVisibleold}
        />
        <TouchableOpacity
            onPress={() => setPasswordVisibleold(!passwordVisibleold)}
            style={{  top: "17%" }}
          >
            <Image
              source={require("../assets/images/passwordEye.png")}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
          </View>
          <View style={styles.container2}>
        <FormInput
          placeholder="New Password"
          inputstyle={{ marginTop: 20 }}
          onChangeText={setPasswordnew1}
          secureTextEntry={passwordVisiblenew1}
        />
         <TouchableOpacity
            onPress={() => setPasswordVisiblenew1(!passwordVisiblenew1)}
            style={{ top: "10%" }}
          >
            <Image
              source={require("../assets/images/passwordEye.png")}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
          </View>
          <View style={styles.container2}>
        <FormInput
          placeholder="Confirm Password"
          inputstyle={{ marginTop: 20 }}
          onChangeText={setPasswordnew2}
          secureTextEntry={passwordVisiblenew2}
        />
         <TouchableOpacity
            onPress={() => setPasswordVisiblenew2(!passwordVisiblenew2)}
            style={{ top: "10%" }}
          >
            <Image
              source={require("../assets/images/passwordEye.png")}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
          </View>
        <CustomButton
          buttonColor={colors.mainGreen}
          title="Change"
          titleColor={"#fff"}
          buttonStyle={{
            width: "80%",
            borderWidth: 1.25,
            borderColor: colors.mainGreen,
            alignSelf: "center",
            borderRadius: 6,
          }}
          textStyle={{
            fontSize: fonts.size.font24,
            fontWeight: fonts.weight.bold,
          }}
          onPress={change_p}
        ></CustomButton>
      </View>
      
    </ScrollView>
    );
  }
  const styles = StyleSheet.create({
    container1: {
      backgroundColor: "#fff",
      flexDirection: "row",
      top: 10,
      width: "100%",
    },
    container1_1: {
      flex: 1,
      backgroundColor: "#fff",
      flexDirection: "column",
      top: 10,
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
      
      flexDirection: "row",
      
      width: "95%",
      
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
    center: {
      alignItems: "center",
      paddingTop: "15%",
    },
    title: {
      fontSize: fonts.size.font50,
      fontWeight: fonts.weight.light,
    },
    subtitle: {
      fontsize: fonts.size.font50,
      color: "#A8A6A7",
    },
    getHereLink: {
      fontSize: fonts.size.font18,
      fontWeight: fonts.weight.normal,
      color: "#8595FE",
      marginTop:"50%",
      width:"60%",  
      marginLeft:"25%"
    },
  });
  