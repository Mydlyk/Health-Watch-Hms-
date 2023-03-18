import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableNativeFeedback,
  Alert,
} from "react-native";
import fonts from "../theme/fonts";
import FormInput from "../components/atoms/textInputs";
import CustomButton from "../components/atoms/buttons";
import colors from "../theme/colors";
import React, { Component, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import { registerRootComponent } from "expo";
import { ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../store/services/AuthContext";

const DoctorPersonalInfo = ({ route, navigation }) => {
  const [specializations, setSpecializations] = useState([]);
  const { url } = useContext(AuthContext);
  const { json, gender } = route.params;
  const data = JSON.parse(json);
  const [doctorData, setData] = useState({
    specialization: "",
    personalInfo: "",
    education: "",
    clinic: "",
    isSpecializationValid: true,
    isPersonalInfoValid: true,
    isEducationValid: true,
    isClinicValid: true,
    isFormValid: true,
  });
  useEffect(() => {
    getSpecializations();
  }, []);

  const getSpecializations = async () => {
    try {
      await axios
        .get(`http://${url}:8080/api/specialization`)
        .then((response) => {
          setSpecializations(response.data);
        });
      console.log(specializations);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Data fetching cancelled");
      } else {
        Alert.alert("Alert", "Fatal error while fetching data");
      }
    }
  };
  const handleSpecialization = (val) => {
    setData({
      ...doctorData,
      specialization: val,
      isSpecializationValid: true,
      isFormValid: true,
    });
  };
  const handlePersonalInfo = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...doctorData,
        personalInfo: val,
        isPersonalInfoValid: true,
        isFormValid: true,
      });
    } else {
      setData({
        ...doctorData,
        personalInfo: val,
        isPersonalInfoValid: false,
        isFormValid: false,
      });
    }
  };

  const handleEducation = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...doctorData,
        education: val,
        isEducationValid: true,
        isFormValid: true,
      });
    } else {
      setData({
        ...doctorData,
        education: val,
        isEducationValid: false,
        isFormValid: false,
      });
    }
  };
  const handleClinic = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...doctorData,
        clinic: val,
        isClinicValid: true,
        isFormValid: true,
      });
    } else {
      setData({
        ...doctorData,
        clinic: val,
        isClinicValid: false,
        isFormValid: false,
      });
    }
  };
  const params = new URLSearchParams({
    name: data.name,
    second_name: data.secondName,
    surname: data.surname,
    birth_day: data.birthday,
    gender: gender,
    phone_number: data.phoneNumber,
    email: data.email,
    password: data.password,
    street: data.street,
    zip_code: data.zipCode,
    city: data.city,
    street_number: data.streetNumber,
    apartment_number: data.apartmentNumber,
    country: data.country,
    education: doctorData.education,
    personal_info: doctorData.personalInfo,
    specialization_id: doctorData.specialization,
    clinic: doctorData.clinic,
  }).toString();

  function testNulls() {
    let isNull = false;
    Object.keys(doctorData).map((key, index) => {
      if (doctorData[key] === "") {
        isNull = true;
      }
    });
    if (isNull === false) {
      return true;
    } else return false;
  }

  var isRegisterSuccess = true;
  const register = async () => {
    let message = "";
    console.log(`http://${url}:8080/api/doctor/register?` + params);
    if (testNulls() == true) {
      try {
        await axios.post(
          "http://192.168.100.29:8080/api/doctor/register?" + params
        );
      } catch (error) {
        const errors = error.request._response;
        console.log(error.request._response);
        isRegisterSuccess = false;
        if (errors.includes("phone_number"))
          message += "Phone number is already taken! \n";
        if (errors.includes("email")) message += "Email is already taken!";
        Alert.alert("Something went wrong", message);
      }

      if (isRegisterSuccess == true) {
        alert("Rejestracja przebiegła pomyślnie");
        navigation.navigate("WelcomeScreen");
      }
    } else {
      Alert.alert("Something went wrong", "Fill in the required data");
    }
  };
  return (
    <ScrollView>
      <View style={styles.center}>
        <Image
          source={require("../assets/images/hms_logo.png")}
          style={{ width: 200, height: 200 }}
        />
        <Text style={styles.title}>HealthWatch</Text>
        <Text style={styles.subtitle}>Your life in your hands</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          dropdownPosition="bottom"
          itemTextStyle={styles.itemTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={specializations}
          maxHeight={150}
          labelField="specialization"
          valueField="id"
          placeholder="Specialization"
          onChange={(item) => {
            handleSpecialization(item.id);
          }}
        />
        <FormInput
          placeholder="Education"
          inputstyle={{ marginTop: 20 }}
          onChangeText={(val) => handleEducation(val)}
        />
        {doctorData.isEducationValid ? null : (
          <Text style={styles.errorMsg}>Put your education here</Text>
        )}
        <FormInput
          placeholder="personal info"
          inputstyle={{ marginTop: 50 }}
          onChangeText={(val) => handlePersonalInfo(val)}
        />
        {doctorData.isPersonalInfoValid ? null : (
          <Text style={styles.errorMsg}> Put personal info here.</Text>
        )}
        <FormInput
          placeholder="Clinic"
          inputstyle={{ marginTop: 20 }}
          onChangeText={(val) => handleClinic(val)}
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
          onPress={() => register()}
        ></CustomButton>
      </View>
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
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A8E9CA",
  },
  title: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
  },
  datePickerStyle: {
    width: 230,
  },
  text: {
    textAlign: "left",
    width: 230,
    fontSize: 16,
    color: "#000",
  },
  dropdown: {
    height: 28,
    width: "90%",
    marginRight: "1%",
    borderBottomColor: "#A8A6A7",
    borderBottomWidth: 1.5,
    color: "#A8A6A7",
    fontSize: 13,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 13,
    color: "#A8A6A7",
  },
  selectedTextStyle: {
    fontSize: 13,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 13,
    color: "#A8A6A7",
  },
  itemTextStyle: {
    fontSize: 13,
    lineHeight: 13,
  },
  errorMsg: {
    fontSize: fonts.size.font10,
    color: "red",
    width: "90%",
  },
});

export default DoctorPersonalInfo;
