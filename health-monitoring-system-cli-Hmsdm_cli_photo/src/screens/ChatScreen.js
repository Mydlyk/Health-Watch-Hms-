import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Box,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
   Button,
   Platform
  
  
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { color } from "react-native-reanimated";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import React, { createContext, useContext, useEffect, useState,useCallback} from "react";
import "react-native-svg";
import CustomButton from "../components/atoms/buttons";
import fonts from "../theme/fonts.js";
import colors from "../theme/colors.js";
import { AuthContext } from "../store/services/AuthContext";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import FormInput from "../components/atoms/textInputs";
import RangeSlider from 'rn-range-slider';
import Thumb from "../containers/Thumb_pupil";
import Rail from "../containers/Rail";
import RailSelected from "../containers/RailSelected";
import Label from "../containers/Label";
import Notch from "../containers/Notch";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import EditProfile from '../screens/EditProfile';
const Tab = createBottomTabNavigator();

export default function ChatScreen(navigation) {
  const { userToken, url } = useContext(AuthContext);
  const [Ranges,setRanges]=useState(['']);
  const [Users,setUsers]=useState(['']);

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append('image', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

const App = () => {
  const [photo, setPhoto] = React.useState(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      // console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };

  const handleUploadPhoto = () => {
    fetch(`http://${url}:8080/api/setImage`, {
      method: 'POST',
      body: createFormData(photo, { userId: '123' }),
      headers:{Authorization: "Bearer " + userToken},
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <View style={{  alignItems: 'center', justifyContent: 'center' }}>
      {photo && (
        <>
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
          <Button title="Upload Photo" onPress={handleUploadPhoto} />
        </>
      )}
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
    </View>
  );
};
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
