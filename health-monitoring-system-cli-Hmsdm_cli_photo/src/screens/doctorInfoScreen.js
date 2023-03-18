import { View, StyleSheet, Image, Text } from "react-native";
import fonts from "../theme/fonts";
import FormInput from "../components/atoms/textInputs";
import CustomButton from "../components/atoms/buttons";
import colors from "../theme/colors";

const DoctorInfoScreen = () => {
  return (
    <View style={styles.center}>
      <Image
        source={require("../assets/images/hms_logo.png")}
        style={{ width: 200, height: 200 }}
      />
      <Text style={styles.subtitle}>First create your account</Text>
      <FormInput placeholder="Specialization" inputstyle={{ marginTop: 5 }} />
      <FormInput placeholder="Education" inputstyle={{ marginTop: 5 }} />
      <FormInput
        multiline
        numberOfLines={3}
        style={styles.input}
        placeholder="Personal info"
        inputstyle={{ marginTop: 5 }}
      />
      <CustomButton
        buttonColor={colors.mainGreen}
        title="Sign up"
        buttonStyle={{
          width: "90%",
          alignSelf: "center",
          borderRadius: 6,
        }}
        textStyle={{
          fontSize: fonts.size.font24,
          fontWeight: fonts.weight.bold,
        }}
      ></CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
  },
  subtitle: {
    fontsize: fonts.size.font18,
    color: "#A8A6A7",
  },
  input: {
    marginTop: 40,
  },
});

export default DoctorInfoScreen;
