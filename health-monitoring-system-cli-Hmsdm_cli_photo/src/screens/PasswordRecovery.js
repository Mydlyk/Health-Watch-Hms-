import { View, Text, StyleSheet, Image,Alert } from "react-native";
import LoginScreen from "./loginScreen";
import CustomButton from "../components/atoms/buttons";
import fonts from "../theme/fonts.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import React, { createContext, useContext, useEffect, useState } from "react";
import colors from "../theme/colors.js";
import FormInput from "../components/atoms/textInputs";
import { AuthContext } from "../store/services/AuthContext";
const PasswordRecovery = ({ navigation }) => {
    const [email, setemail] = useState("");
    const { url } = useContext(AuthContext);

    const params = new URLSearchParams({
      email: email.toString(),
      
    }).toString();
    const recovery = async () => {
      var polaczenie = true;
      try {
        fetch(`http://${url}:8080/api/recovery/resetPassword?`+ params,{  
          headers: {
            email: email.toString()
          },
          method: 'POST',
         
        });
        
      
       } catch (error) {
         console.log(error);
         Alert.alert("Something went wrong", "We are unable to post your reading data to server!");
       }
    }
    









  return (
    <View style={styles.center}>
      <Image
        source={require("../assets/images/hms_logo.png")}
        style={{ width: 200, height: 200 }}
      />
      <Text style={[styles.title]}>Password recovery</Text>
      <Text style={styles.subtitle}>Please enter your email address</Text>
      <Text style={styles.subtitle}> to search for your account.</Text>
      
        <FormInput
           placeholder="E-mail"
           inputstyle={{ marginTop: 20 }}
          onChangeText={(val) => setemail(val)}
        />
      <View style={[styles.row]}>
      <CustomButton
        buttonColor={"gray"}
        title="Cancel"
        buttonStyle={{
          width: "35%",
          alignSelf: "center",
          borderRadius: 6,
          borderColor: "gray",
        }}
        textStyle={{
          fontSize: fonts.size.font24,
          fontWeight: fonts.weight.bold,
        }}
        onPress={() => navigation.navigate("LoginScreen")}
      ></CustomButton>
      <Text style={{marginLeft:"10%"}}></Text>
      <CustomButton
        buttonColor={colors.mainGreen}
        title="Send"
        titleColor="#fff"
        buttonStyle={{
          width: "35%",
          borderColor: "colors.mainGreen",
          alignSelf: "center",
          borderRadius: 6,
        }}
        textStyle={{
          fontSize: fonts.size.font24,
          fontWeight: fonts.weight.bold,
        }}
        onPress={recovery}
      ></CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
    top: 100,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    
  },
  subtitle: {
    fontsize: fonts.size.font50,
    color: "#A8A6A7",
  },
  getHere: {
    fontSize: fonts.size.font18,
    fontWeight: fonts.weight.normal,
  },
  getHereLink: {
    fontSize: fonts.size.font18,
    fontWeight: fonts.weight.normal,
    color: "#8595FE",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    top:"20%"
  },
});
export default PasswordRecovery;