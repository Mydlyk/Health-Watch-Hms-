import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity
} from "react-native";
import fonts from "../theme/fonts";
import FormInput from "../components/atoms/textInputs";
import CustomButton from "../components/atoms/buttons";
import colors from "../theme/colors";
import React, { Component, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../store/services/AuthContext";
import { ScrollView } from "react-native-gesture-handler";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const { login } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(true);

  const params = new URLSearchParams({
    email: email,
    password: password,
  }).toString();

  return (
    <ScrollView>
      <View style={styles.center}>
        <Image
          source={require("../assets/images/hms_logo.png")}
          style={{ width: 200, height: 200 }}
        />
        <Text style={styles.title}>HealthWatch</Text>
        <Text style={styles.subtitle}>Your life in your hands</Text>
        <FormInput
          placeholder="Email"
          inputstyle={{ marginTop: 50 }}
          onChangeText={setEmail}
        />
        <FormInput
          placeholder="Password"
          inputstyle={{ marginTop: 20 }}
          onChangeText={setPassword}
          secureTextEntry={passwordVisible}
        />
        <CustomButton
          buttonColor="transparent"
          title="Log In"
          titleColor={colors.mainGreen}
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
          onPress={() => login(email, password)}
        ></CustomButton>
      </View>
      <TouchableOpacity
          onPress={() => navigation.navigate("PasswordRecovery")}
        >
          <Text style={styles.getHereLink}>Forgotten password?</Text>
        </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
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

export default LoginScreen;
