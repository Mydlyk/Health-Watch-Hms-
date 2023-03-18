import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  ScrollView
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

export default function AddAssociateduser() {
  const { userToken, url } = useContext(AuthContext);
  const [Pairing_code, setPairing_code] = useState("");
  const [pairing, setpairing] = useState([]);
  const [error, seterror] = useState([]);
  const params = new URLSearchParams({
    pairing_code: Pairing_code.toString(),
    Authorization: "Bearer " + userToken,
  }).toString();

  const pairing_code = async () => {
    try {
      await fetch(`http://${url}:8080/api/user/generatePairingCode`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userToken,
        },
      })
        .then((response) => response.text())
        .then((quote) => {
          setpairing(JSON.parse(quote));
          if (quote == null) {
            Alert.alert("Users are Paired now");
          } else {
            setpairing(JSON.parse(quote));
          }
        });
    } catch (error) {
      const errors = error.request._response;
      isRegisterSuccess = false;

      Alert.alert("Something went wrong", error);
    }
  };
  const pairing_code2 = async () => {
    var polaczenie = true;
    try {
      await fetch(`http://${url}:8080/api/user/pair?` + params, {
        method: "POST",
        headers: {
          pairing_code: Pairing_code.toString(),
          Authorization: "Bearer " + userToken,
        },
        
      })
        .then((response1) => response1.text())
        .then((quote) => {
          console.log(quote);
          try{
            seterror(JSON.parse(quote));
           var error2=JSON.parse(quote)
           console.log(typeof error2.message)
           if(typeof error2.message==undefined){Alert.alert("ok");}
           else{
            Alert.alert("Something went wrong", error2.message);}
        }catch(error){
          Alert.alert("ok", error2.message);
        }
          }
        );
    } catch (error) {
      Alert.alert("           Users are paired now",);

      
    }
  };
  const copy=async ()=>{
    Clipboard.setString(pairing.PairingCode)
    ToastAndroid.show("Code copied",ToastAndroid.SHORT,ToastAndroid.BOTTOM)
  }
  return (
    <ScrollView style={styles.container3}>

      <View style={styles.container1_1}>
        <Text style={styles.Text_title3}>Generate paring code</Text>

        <Text style={styles.Pairing_c}>{pairing.PairingCode}</Text>

        <CustomButton
          buttonColor={"gray"}
          title="Copy"
          buttonStyle={{
            width: 80,
            borderRadius: 3,
            height:40,
            marginLeft:"65%"
          }}
          textStyle={{
            fontSize: 22,
            fontWeight: fonts.weight.bold,
            
          }}
          onPress={copy}
        ></CustomButton>

        <CustomButton
          buttonColor={colors.mainGreen}
          title="Generate"
          buttonStyle={{
            width: "70%",
            alignSelf: "center",
            borderRadius: 6,
          }}
          textStyle={{
            fontSize: fonts.size.font24,
            fontWeight: fonts.weight.bold,
          }}
          onPress={pairing_code}
        ></CustomButton>


        <Text style={styles.Text_title3}>Enter pairing code</Text>

        <FormInput
          inputstyle={{
            textalign: "center",
            marginTop: 5,
            width: "60%",
            marginLeft: "20%",
            borderWidth: 1,
            borderColor: "gray",
            height: 40,
            borderRadius: 10,
            fontSize: 25,
          }}
          onChangeText={(val) => setPairing_code(val)}
        />

        <CustomButton
          buttonColor={colors.mainGreen}
          title="Pair"
          buttonStyle={{
            width: "70%",
            alignSelf: "center",
            borderRadius: 6,
          }}
          textStyle={{
            fontSize: fonts.size.font24,
            fontWeight: fonts.weight.bold,
          }}
          onPress={pairing_code2}
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
});
