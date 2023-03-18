import { StyleSheet,Text, View,Box,Dimensions,ScrollView,TouchableOpacity,Image,FlatList,ActivityIndicator,Alert } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import axios from "axios";

import "react-native-svg";

import fonts from "../theme/fonts.js";
import colors from "../theme/colors.js";
import CustomButton from "../components/atoms/buttons";
import "react-native-gesture-handler";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AntDesign from "react-native-vector-icons/AntDesign";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import React, { createContext, useContext, useEffect, useState,useCallback} from "react";

import { Dropdown } from "react-native-element-dropdown";
import { AuthContext } from "../store/services/AuthContext";

import FormInput from "../components/atoms/textInputs";

const Tab = createBottomTabNavigator();
let validator = require("email-validator");
export default function EditProfile(navigation,props) {
  const { userToken, url } = useContext(AuthContext);
  const [Users,setUsers]=useState(['']);

 
  const Account_info = async () => {
    try{
    await fetch(`http://${url}:8080/api/user/accountInfo`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + userToken,
      },
    })
      .then((response) => response.text())
      .then((quote) => {
       
        console.log(JSON.parse(quote));
        setUsers(JSON.parse(quote));
        
         
            
         
          
        }
      )
      
    }
    catch (error) {
     
      console.log(error)
      
    }
  };
 
  
 

  useEffect(() => {
   
    Account_info();
}, []);

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
const userAccountEditDTO = ({
  name: data.name,
  second_name: data.secondName,
  surname: data.surname,
  birth_day: data.birthday,
  phone_number: data.phoneNumber,
  email: data.email,
  street: data.street,
  zip_code: data.zipCode,
  city: data.city,
  street_number: data.streetNumber,
  apartment_number: data.apartmentNumber,
  country: data.country,
}).toString()

const Account = async () => {
  var polaczenie = true;
  if (testNulls() == true) {
    console.log('Posting readings to db')
    
    try {
     const post =  await axios
        .post(`http://${url}:8080/api/accountInfo`, 
        userAccountEditDTO
        ,{
          headers: {
            Authorization: "Bearer " + userToken,
          }
        })
        .then((response) => {
          //console.log(response.data);
          console.log("huj");
        });
    } catch (error) {
      console.log(error);
      Alert.alert("Something went wrong", "We are unable to post your reading data to server!");
    }
    
}
else {
  Alert.alert("Something went wrong", "Fill in the required data");}
};
  
  return (
    <ScrollView>
       <View style={styles.container1}>
       <Text style={styles.Text_title3}>Edit Profile</Text>
        <View style={{height:70}}>
       <Text style={styles.Text_title2}>Name</Text>
          <FormInput
            placeholder="Name"
            inputstyle={{ marginLeft:"10%", width: "80%"}}
            onChangeText={(val) => handleName(val)}
          />
           {data.isNameValid ? null : (
            <Text style={styles.errorMsg50}>
              Name must be 4 characters long.
            </Text>
          )}
          {data.isNameValid ? null : <Text style={styles.errorMsg50}></Text>}
          </View>
          <View style={{height:70}}>
          <Text style={styles.Text_title2}>Second name</Text>
          <FormInput
            placeholder="Second Name"
            inputstyle={{ marginLeft:"10%", width: "80%" }}
            onChangeText={(val) => handleSecondName(val)}
          />

         
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
        <View style={{height:70}}>
        <Text style={styles.Text_title2}>Surname</Text>
        <FormInput
          style={styles.input}
          placeholder="Surname"
          inputstyle={{ marginLeft:"10%", width: "80%" }}
          onChangeText={(val) => handleSurname(val)}
        />
        {data.isSurnameValid ? null : (
          <Text style={styles.errorMsg}>
            {" "}
            Surname must be 4 characters long.
          </Text>
        )}
        </View>
        <View style={{height:70}}>
        <Text style={styles.Text_title2}>Birthday</Text>
        <FormInput
            placeholder="Birthday"
            inputstyle={{ marginLeft:"10%", width: "80%" }}
            onChangeText={(val) => handleBirthday(val)}
          />
        

        
          
          {data.isBirtdayValid ? null : (
            <Text style={styles.errorMsg50}>Date format: dd-MM-yyyy</Text>
          )}
          </View>
          <View style={{height:70}}>
          <Text style={styles.Text_title2}>E-mail</Text>
        <FormInput
          placeholder="Email"
          inputstyle={{marginLeft:"10%", width: "80%" }}
          onChangeText={(val) => handleEmail(val)}
        />
        {data.isEmailvalid ? null : (
          <Text style={styles.errorMsg}> Email is invalid.</Text>
        )}
        </View>
        <View style={{height:70}}>
        <Text style={styles.Text_title2}>Phone Number</Text>
        <FormInput
          placeholder="Phone number"
          inputstyle={{marginLeft:"10%", width: "80%" }}
          onChangeText={(val) => handlePhoneNumber(val)}
        />
        {data.isPhoneNumberValid ? null : (
          <Text style={styles.errorMsg}>
            {" "}
            "Phone should be valid. Phone number format: +48 999 999 999.
          </Text>
        )}
        </View>
        <View style={{height:70}}>
        <Text style={styles.Text_title2}>City</Text>
        <FormInput
          placeholder="City"
          inputstyle={{marginLeft:"10%", width: "80%" }}
          onChangeText={(val) => handleCity(val)}
        />
        {data.isCityValid ? null : (
          <Text style={styles.errorMsg}> City must be 3 characters long.</Text>
        )}
        </View>
        <View style={{height:70}}>
        <Text style={styles.Text_title2}>Street</Text>
        <FormInput
          placeholder="Street"
          inputstyle={{marginLeft:"10%", width: "80%" }}
          onChangeText={(val) => handleStreet(val)}
        />
        {data.isStreetValid ? null : (
          <Text style={styles.errorMsg}> Stree must be 3 characters long.</Text>
        )}
        </View>
        <View style={{height:70}}>
        <Text style={styles.Text_title2}>Street number</Text>
          <FormInput
            placeholder="Street Number"
            inputstyle={{ marginLeft:"10%", width: "80%" }}
            onChangeText={(val) => handleStreetNumber(val)}
          />
         
        
        
          {data.isStreetNumberValid ? null : (
            <Text style={styles.errorMsg50}>
              {" "}
              Street number can't be blank.
            </Text>
          )}
          {data.isStreetNumberValid ? null : (
            <Text style={styles.errorMsg50}></Text>
          )}
          </View>
          <View style={{height:70}}>
          <Text style={styles.Text_title2}>Apartament Number</Text>
           <FormInput
            placeholder="Apartment Number"
            inputstyle={{ marginLeft:"10%", width: "80%"}}
            onChangeText={(val) => handleApartmentNumber(val)}
          />
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
        <View style={{height:70}}>
        <Text style={styles.Text_title2}>Zip-code</Text>
          <FormInput
            placeholder="Zip Code"
            inputstyle={{ marginLeft:"10%", width: "80%"}}
            onChangeText={(val) => handleZipCode(val)}
          />
            {data.isZipCodeValid ? null : (
            <Text style={styles.errorMsg50}>
              Zip code should be valid. Valid zip code 21-370
            </Text>
          )}
          {data.isZipCodeValid ? null : <Text style={styles.errorMsg50}></Text>}
          </View>
          <View style={{height:70}}>
          <Text style={styles.Text_title2}>Country</Text>
          <FormInput
            placeholder="Country"
            inputstyle={{ marginLeft:"10%", width: "80%" }}
            onChangeText={(val) => handleCountry(val)}
          />
        
        
        
          
          {data.isCountryValid ? null : (
            <Text style={styles.errorMsg50}>
              Country should be 3 characters long.
            </Text>
          )}
        </View>
        
       

          </View>
          <View style={{marginBottom:20}}>
          <CustomButton
          buttonColor={colors.mainGreen}
          title="Save"
          buttonStyle={{
            width: "70%",
            alignSelf: "center",
            borderRadius: 6,
          }}
          textStyle={{
            fontSize: fonts.size.font24,
            fontWeight: fonts.weight.bold,
          }}
          onPress={Account}
        ></CustomButton>
        </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container1: {
    display:"flex",
    position:"relative",
    backgroundColor: "#fff",
    flexDirection: "column",
    width: "90%",
    marginLeft:"5%",
    height:910,
    borderRadius:25,
    top:30,
    
    
  },
  profile_image: {
    top:60,
    ImageResizer: "center",
    height: 175,
    width: "50%",
    borderRadius: 100,
    marginBottom: 70,
    marginLeft: "25%",
    
  },
  slider: {
    flexDirection: "column",
    width: "80%",
    textAlign: "center",
    marginLeft:"10%",
    marginBottom:10,
    marginTop:20
    
  },
  container2_1: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
    marginBottom: 10,
  },
  Text_title:{
    marginBottom:10,
    marginTop:10
  },
  Text_title2:{
    textAlign: "center",
    fontSize:14,
  },
  Text_title3:{
    textAlign: "center",
    fontSize:20,
    marginBottom:20,
    color:"gray",
    marginTop:10,
  },
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
    fontSize: 10,
    color: "red",
    width: "80%",
    marginLeft:"10%"
  
  },
  errorMsg50: {
    fontSize:10,
    color: "red",
    width: "80%",
    marginLeft:"10%"
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
