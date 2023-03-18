import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from "react-native";
import fonts from "../theme/fonts";
import FormInput from "../components/atoms/textInputs";
import CustomButton from "../components/atoms/buttons";
import colors from "../theme/colors";
import React, { Component, PropTypes, useState, SafeAreaView } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";

import axios from "axios";

const windowWidth = Dimensions.get("window").width;
let validator = require("email-validator");
let passwordValidator = require("password-validator");
const DoctorRegisterScreen = ({ navigation }) => {
  var schema = new passwordValidator();

  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

  const [date, setDate] = useState(new Date());
  const [gender, setGender] = useState("");

  const genderPick = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);

  const [data, setData] = React.useState({
    name: "",
    secondName: "",
    surname: "",
    birthday: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    street: "",
    zipCode: "",
    city: "",
    streetNumber: "",
    apartmentNumber: "",
    country: "",
    isNameValid: true,
    isSecondNameValid: true,
    isSurnameValid: true,
    isBirtdayValid: true,
    isEmailvalid: true,
    isPasswordValid: true,
    isConfirmPasswordValid: true,
    isPhoneNumberValid: true,
    isStreetValid: true,
    isZipCodeValid: true,
    isCityValid: true,
    isStreetNumberValid: true,
    isApartmentNumberValid: true,
    isCountryValid: true,
    isFormValid: false,
  });

  const validZipCode = new RegExp("^[0-9]{2}-[0-9]{3}$");
  const validPhoneNumber = new RegExp("^\\+[0-9]{2}(\\s[0-9]{3}){3}$");
  const validData = new RegExp("^\\+[0-9]{2}(\\s[0-9]{3}){3}$");
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: "date",
      is24Hour: true,
      color: colors.mainGreen,
      style: {
        color: colors.mainGreen,
      },
    });
  };

  const handleName = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        name: val,
        isNameValid: true,
        isFormValid: true,
      });
    } else {
      setData({
        ...data,
        name: val,
        isNameValid: false,
        isFormValid: false,
      });
    }
  };
  const handleSecondName = (val) => {
    setData({
      ...data,
      secondName: val,
      isSecondNameValid: true,
      isFormValid: true,
    });
  };
  const handleSurname = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        surname: val,
        isSurnameValid: true,
        isFormValid: true,
      });
    } else {
      setData({
        ...data,
        surname: val,
        isSurnameValid: false,
        isFormValid: false,
      });
    }
  };
  const handleBirthday = (val) => {
    if (validData.test(val)) {
      setData({
        ...data,
        birthday: val,
        isBirtdayValid: true,
        isFormValid: true,
      });
    } else {
      setData({
        ...data,
        birthday: val,
        isBirtdayValid: false,
        isFormValid: false,
      });
    }
  };
  const handleEmail = (val) => {
    if (validator.validate(val)) {
      setData({
        ...data,
        email: val,
        isEmailvalid: true,
        isFormValid: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        isEmailvalid: false,
        isFormValid: false,
      });
    }
  };
  const handlePassword = (val) => {
    if (schema.validate(val)) {
      setData({
        ...data,
        password: val,
        isPasswordValid: true,
        isFormValid: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isPasswordValid: false,
        isFormValid: false,
      });
    }
  };
  const handleConfirmPassword = (val) => {
    if (val == data.password) {
      setData({
        ...data,
        confirmPassword: val,
        isConfirmPasswordValid: true,
        isFormValid: true,
      });
    } else {
      setData({
        ...data,
        confirmPassword: val,
        isConfirmPasswordValid: false,
        isFormValid: false,
      });
    }
  };
  const handlePhoneNumber = (val) => {
    if (validPhoneNumber.test(val)) {
      setData({
        ...data,
        phoneNumber: val,
        isPhoneNumberValid: true,
        isFormValid: true,
      });
    } else {
      setData({
        ...data,
        phoneNumber: val,
        isPhoneNumberValid: false,
        isFormValid: false,
      });
    }
  };
  const handleStreet = (val) => {
    if (val.trim().length >= 3) {
      setData({
        ...data,
        street: val,
        isStreetValid: true,
        isFormValid: true,
      });
    } else {
      setData({
        ...data,
        street: val,
        isStreetValid: false,
        isFormValid: false,
      });
    }
  };
  const handleZipCode = (val) => {
    if (validZipCode.test(val)) {
      setData({
        ...data,
        zipCode: val,
        isZipCodeValid: true,
        isFormValid: true,
      });
    } else {
      setData({
        ...data,
        zipCode: val,
        isZipCodeValid: false,
        isFormValid: false,
      });
    }
  };
  const handleCity = (val) => {
    if (val.trim().length >= 3) {
      setData({
        ...data,
        city: val,
        isCityValid: true,
        isFormValid: true,
      });
    } else {
      setData({
        ...data,
        city: val,
        isCityValid: false,
        isFormValid: false,
      });
    }
  };
  const handleStreetNumber = (val) => {
    if (val.trim().length != 0) {
      setData({
        ...data,
        streetNumber: val,
        isStreetNumberValid: true,
        isFormValid: true,
      });
    } else {
      setData({
        ...data,
        streetNumber: val,
        isStreetNumberValid: false,
        isFormValid: false,
      });
    }
  };
  const handleApartmentNumber = (val) => {
    if (val.trim().length != 0) {
      setData({
        ...data,
        apartmentNumber: val,
        isApartmentNumberValid: true,
        isFormValid: true,
      });
    } else {
      setData({
        ...data,
        apartmentNumber: val,
        isApartmentNumberValid: false,
        isFormValid: false,
      });
    }
  };
  const handleCountry = (val) => {
    if (val.trim().length >= 3) {
      setData({
        ...data,
        country: val,
        isCountryValid: true,
        isFormValid: true,
      });
    } else {
      setData({
        ...data,
        country: val,
        isCountryValid: false,
        isFormValid: false,
      });
    }
  };

  function testNulls() {
    let isNull = false;
    Object.keys(data).map((key, index) => {
      if (data[key] === "") {
        isNull = true;
      }
    });
    if (isNull === false) {
      return true;
    } else return false;
  }

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
  }).toString();

  var isRegisterSuccess = true;
  const navigate = () => {
    let message = "";
    if (testNulls() == true) {
      let objectString = JSON.stringify(data);
      navigation.navigate("DoctorPersonalInfo", {
        json: objectString,
        gender: gender,
      });
    } else {
      Alert.alert("Something went wrong", "Fill in the required data");
    }
  };
  return (
    <ScrollView>
      <View style={styles.center}>
        <Image
          source={require("../assets/images/hms_logo.png")}
          style={{ width: 170, height: 170 }}
        />
        <Text style={styles.subtitle}>First create your account</Text>
        <View style={styles.row}>
          <FormInput
            placeholder="Name"
            inputstyle={{ marginTop: 5, width: "44%", marginRight: "1%" }}
            onChangeText={(val) => handleName(val)}
          />
          <FormInput
            placeholder="Second Name"
            inputstyle={{ marginTop: 5, width: "44%", marginLeft: "1%" }}
            onChangeText={(val) => handleSecondName(val)}
          />
        </View>
        <View style={styles.row}>
          {data.isNameValid ? null : (
            <Text style={styles.errorMsg50}>
              {" "}
              Name must be 4 characters long.
            </Text>
          )}
          {data.isNameValid ? null : <Text style={styles.errorMsg50}></Text>}
          {data.isSecondNameValid ? null : (
            <Text style={styles.errorMsg50}></Text>
          )}
          {data.isSecondNameValid ? null : (
            <Text style={styles.errorMsg50}>
              {" "}
              Name must be 4 characters long.
            </Text>
          )}
        </View>
        <FormInput
          style={styles.input}
          placeholder="Surname"
          inputstyle={{ marginTop: 5 }}
          onChangeText={(val) => handleSurname(val)}
        />
        {data.isSurnameValid ? null : (
          <Text style={styles.errorMsg}>
            {" "}
            Surname must be 4 characters long.
          </Text>
        )}
        <FormInput
          placeholder="Email"
          inputstyle={{ marginTop: 5 }}
          onChangeText={(val) => handleEmail(val)}
        />
        {data.isEmailvalid ? null : (
          <Text style={styles.errorMsg}> Email is invalid.</Text>
        )}
        <View style={styles.row}>
          <FormInput
            placeholder="Password"
            inputstyle={{ marginTop: 5, width: "80%" }}
            secureTextEntry={passwordVisible}
            onChangeText={(val) => handlePassword(val)}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={{ width: "10%", alignItems: "center", marginTop: "3%" }}
          >
            <Image
              source={require("../assets/images/passwordEye.png")}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
        </View>

        {data.isPasswordValid ? null : (
          <Text style={styles.errorMsg}>
            {" "}
            Password must contain 8 characters, including capital letter, lower
            case letter and two numbers.
          </Text>
        )}
        <View style={styles.row}>
          <FormInput
            placeholder="Confirm your password"
            inputstyle={{ marginTop: 5, width: "80%" }}
            secureTextEntry={confirmPasswordVisible}
            onChangeText={(val) => handleConfirmPassword(val)}
          />
          <TouchableOpacity
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            style={{ width: "10%", alignItems: "center", marginTop: "3%" }}
          >
            <Image
              source={require("../assets/images/passwordEye.png")}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
        </View>

        {data.isConfirmPasswordValid ? null : (
          <Text style={styles.errorMsg}> Passwords must be the same.</Text>
        )}
        <FormInput
          placeholder="Phone number"
          inputstyle={{ marginTop: 5 }}
          onChangeText={(val) => handlePhoneNumber(val)}
        />
        {data.isPhoneNumberValid ? null : (
          <Text style={styles.errorMsg}>
            {" "}
            "Phone should be valid. Phone number format: +48 999 999 999.
          </Text>
        )}
        <FormInput
          placeholder="City"
          inputstyle={{ marginTop: 5 }}
          onChangeText={(val) => handleCity(val)}
        />
        {data.isCityValid ? null : (
          <Text style={styles.errorMsg}> City must be 3 characters long.</Text>
        )}
        <FormInput
          placeholder="Street"
          inputstyle={{ marginTop: 5 }}
          onChangeText={(val) => handleStreet(val)}
        />
        {data.isStreetValid ? null : (
          <Text style={styles.errorMsg}> Stree must be 3 characters long.</Text>
        )}
        <View style={styles.row}>
          <FormInput
            placeholder="Street Number"
            inputstyle={{ marginTop: 5, width: "44%", marginRight: "1%" }}
            onChangeText={(val) => handleStreetNumber(val)}
          />
          <FormInput
            placeholder="Apartment Number"
            inputstyle={{ marginTop: 5, width: "44%", marginLeft: "1%" }}
            onChangeText={(val) => handleApartmentNumber(val)}
          />
        </View>
        <View style={styles.row}>
          {data.isStreetNumberValid ? null : (
            <Text style={styles.errorMsg50}>
              {" "}
              Street number can't be blank.
            </Text>
          )}
          {data.isStreetNumberValid ? null : (
            <Text style={styles.errorMsg50}></Text>
          )}
          {data.isApartmentNumberValid ? null : (
            <Text style={styles.errorMsg50}> </Text>
          )}
          {data.isApartmentNumberValid ? null : (
            <Text style={styles.errorMsg50}>
              {" "}
              Apartment number can't be blank.
            </Text>
          )}
        </View>
        <View style={styles.row}>
          <FormInput
            placeholder="Zip Code"
            inputstyle={{ marginTop: 5, width: "44%", marginRight: "1%" }}
            onChangeText={(val) => handleZipCode(val)}
          />
          <FormInput
            placeholder="Country"
            inputstyle={{ marginTop: 5, width: "44%", marginLeft: "1%" }}
            onChangeText={(val) => handleCountry(val)}
          />
        </View>
        <View style={styles.row}>
          {data.isZipCodeValid ? null : (
            <Text style={styles.errorMsg50}>
              Zip code should be valid. Valid zip code 21-370
            </Text>
          )}
          {data.isZipCodeValid ? null : <Text style={styles.errorMsg50}></Text>}
          {data.isCountryValid ? null : <Text style={styles.errorMsg50}></Text>}
          {data.isCountryValid ? null : (
            <Text style={styles.errorMsg50}>
              Country should be 3 characters long.
            </Text>
          )}
        </View>
        <View style={[styles.row, { marginTop: 5 }]}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            dropdownPosition="bottom"
            itemTextStyle={styles.itemTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={genderPick}
            maxHeight={150}
            labelField="label"
            valueField="value"
            placeholder="Select Gender"
            value={gender}
            onChange={(item) => {
              setGender(item.value);
            }}
          />
          <FormInput
            placeholder="Birthday"
            inputstyle={{ width: "44%", marginLeft: "1%" }}
            onChangeText={(val) => handleBirthday(val)}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.errorMsg50}></Text>
          {data.isBirtdayValid ? null : (
            <Text style={styles.errorMsg50}>Date format: dd-MM-yyyy</Text>
          )}
        </View>

        <CustomButton
          buttonColor={colors.mainGreen}
          title="Next"
          buttonStyle={{
            width: "90%",
            alignSelf: "center",
            borderRadius: 6,
          }}
          textStyle={{
            fontSize: fonts.size.font24,
            fontWeight: fonts.weight.bold,
          }}
          onPress={() => navigate()}
        ></CustomButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    paddingTop: "10%",
    paddingBottom: "10%",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  subtitle: {
    fontsize: fonts.size.font18,
    color: "#A8A6A7",
  },
  input: {
    marginTop: 40,
  },
  errorMsg: {
    fontSize: fonts.size.font10,
    color: "red",
    width: "90%",
  },
  errorMsg50: {
    fontSize: fonts.size.font10,
    color: "red",
    width: "45%",
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
    width: "44%",
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
});

export default DoctorRegisterScreen;

/*
<Dropdown
            label= 'Select gender'
            setSelected={setGender} 
            data={genderPick} 
            maxHeight = '100'
            boxStyles={{borderRadius:0, marginTop: 10}}
            onSelect={() => alert(gender)} 
          />



<View style={styles.container}>
        <Text style={styles.text}>Birth Date :</Text>
        <DatePicker
          style={styles.datePickerStyle}
          date={data.birthday}
          mode="date"
          placeholder="select date"
          format="DD/MM/YYYY"
          minDate="01-01-1900"
          maxDate="01-01-2000"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              right: -5,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              borderColor : "gray",
              alignItems: "flex-start",
              borderWidth: 0,
              borderBottomWidth: 1,
            },
            placeholderText: {
              fontSize: 17,
              color: "gray"
            },
            dateText: {
              fontSize: 17,
            }
          }}
          onDateChange={(date) => {
            handleBirthday(date);
          }}
        />
      </View>*/
