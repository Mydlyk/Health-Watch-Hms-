import { View, Text, StyleSheet, Image } from "react-native";
import * as React from "react";
import LoginScreen from "./loginScreen";
import CustomButton from "../components/atoms/buttons";
import fonts from "../theme/fonts.js";
import colors from "../theme/colors.js";
import { TouchableOpacity } from "react-native-gesture-handler";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.center}>
      <Image
        source={require("../assets/images/hms_logo.png")}
        style={{ width: 200, height: 200 }}
      />
      <Text style={[styles.title]}>HealthWatch</Text>
      <Text style={styles.subtitle}>Your life in your hands</Text>
      <CustomButton
        buttonColor={colors.mainGreen}
        title="Create Account"
        buttonStyle={{
          width: "90%",
          alignSelf: "center",
          borderRadius: 6,
        }}
        textStyle={{
          fontSize: fonts.size.font24,
          fontWeight: fonts.weight.bold,
        }}
        onPress={() => navigation.navigate("UserRegisterScreen")}
      ></CustomButton>
      <CustomButton
        buttonColor="transparent"
        title="Sign In"
        titleColor={colors.mainGreen}
        buttonStyle={{
          width: "90%",
          borderWidth: 1.25,
          borderColor: colors.mainGreen,
          alignSelf: "center",
          borderRadius: 6,
        }}
        textStyle={{
          fontSize: fonts.size.font24,
          fontWeight: fonts.weight.bold,
        }}
        onPress={() => navigation.navigate("LoginScreen")}
      ></CustomButton>
      <View style={styles.row}>
        <Text style={styles.getHere}>Are You A Doctor? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("DoctorRegisterScreen")}
        >
          <Text style={styles.getHereLink}>Get Here!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    top: 100,
  },
  title: {
    fontSize: fonts.size.font50,
    fontWeight: fonts.weight.light,
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
    top: "45%",
  },
});
export default WelcomeScreen;
