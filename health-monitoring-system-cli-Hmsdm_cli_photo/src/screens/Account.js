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
  ImageBackground
  
  
} from "react-native";
import RNFetchBlob from 'rn-fetch-blob';
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
const options={
  title:'Select Image',
  type:'library',
  options:{
    maxHeight:200,
    maxWidth:200,
    selectionLimit:1,
    mediaType:'photo',
    includeBase64:true,
  },
}
export default function Account() {
  const navigation = useNavigation(); 
  const { userToken, url } = useContext(AuthContext);
  const [Ranges,setRanges]=useState(['']);
  const [Users,setUsers]=useState(['']);
  const [photo,setphoto]=useState([]);
  const [baseImage, setBaseImage] = useState("");
  var podmiana;
  const formdata = new FormData();




  
  const openGallery=async()=>{
    const images = await launchImageLibrary(options);
    const image = new FormData();
    console.log(images);
    
    image.append('image',{
      uri:images.assets[0].uri,
      name: images.assets[0].fileName,
      type: images.assets[0].type
      
    }
    );
    
    
    console.log(images.assets[0])
    try {
      fetch(`http://${url}:8080/api/user/setImage`, {  
        headers: {
          Authorization: "Bearer " + userToken,
          'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        body: image
      });
      
      setTimeout(get_photo,
        500
    )
     } catch (error) {
       console.log(error);
       Alert.alert("Something went wrong", "We are unable to post your reading data to server!");
     }
  }
  
  console.log(formdata)
  
  const params = new URLSearchParams({
    'Content-Type': 'multipart/form-data; boundary=multipart/form-data',
    image:formdata,
    Authorization: "Bearer " + userToken,
  })
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
        console.log(quote);
        console.log(JSON.parse(quote));
        setUsers(JSON.parse(quote));
        
         
            
         
          
        }
      )
      
    }
    catch (error) {
     
      console.log(error)
      
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const get_photo = async () => {
    try{
      RNFetchBlob.fetch("GET", `http://${url}:8080/api/user/image`, {
        Authorization: "Bearer " + userToken,
        // more headers  ..
      })
        .then((res) => {
          let status = res.info().status;
          console.log(res,"sd")
          if (status == 200) {
            // the conversion is done in native code
            let base64Str = res.base64();
            JSON.stringify(base64Str)
           
            setBaseImage(base64Str)
            // the following conversions are done in js, it's SYNC
            let text = res.text();
           
            let json = res.json();
            
          } else {
           
          }
        })
        // Something went wrong:
        .catch((errorMessage, statusCode) => {
          
        });
    }
    catch (error) {
     
      console.log(error)
      
    }
  };


  const account_ranges = async () => {
    try{
    await fetch(`http://${url}:8080/api/user/getUserRanges`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + userToken,
      },
    })
      .then((response) => response.text())
      .then((quote) => {
        setRanges(JSON.parse(quote));
        
         
            
         
          
        }
      )
      
    }
    catch (error) {
     
      console.log(error)
      
    }
  };
  
  const send_photo = async () => {
    
    try {
      await fetch(`http://${url}:8080/api/user/setImage?`+ params,{
        method: "POST",
        body:{image:formdata},
        headers: {
          'Content-Type': 'multipart/form-data',
          image:formdata,
          Authorization: "Bearer " + userToken,
        },
        
      })
        .then((response) => console.log(response.text))
        .then((quote) => {
          console.log(quote);
          Alert.alert("ok",);
        }
        );
    } catch (error) {
      Alert.alert("           Users are paired now",);

      
    }
  };

  useEffect(() => {
    get_photo();
    account_ranges();
    Account_info();
    
}, []);


  const [rangeDisabled, setRangeDisabled] = useState(false);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100);
  const [low2, setLow2] = useState(0);
  const [high2, setHigh2] = useState(100);
  const [low3, setLow3] = useState(0);
  const [high3, setHigh3] = useState(100);
  const [low4, setLow4] = useState(0);
  const [high4, setHigh4] = useState(100);
  const [low5, setLow5] = useState(0);
  const [high5, setHigh5] = useState(100);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [floatingLabel, setFloatingLabel] = useState(true);
   const renderThumb = useCallback(
    (name: 'high' | 'low') => <Thumb name={name} />,
    [],
  );
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((lowValue, highValue) => {
    setLow(lowValue);
    setHigh(highValue);
  }, []);

  const renderThumb2 = useCallback(
    (name: 'high2' | 'low2') => <Thumb name={name} />,
    [],
  );
  const renderRail2 = useCallback(() => <Rail />, []);
  const renderRailSelected2 = useCallback(() => <RailSelected />, []);
  const renderLabel2 = useCallback(value => <Label text={value} />, []);
  const renderNotch2 = useCallback(() => <Notch />, []);
  const handleValueChange2 = useCallback((lowValue, highValue) => {
    setLow2(lowValue);
    setHigh2(highValue);
  }, []);
  const renderThumb3 = useCallback(
    (name: 'high' | 'low') => <Thumb name={name} />,
    [],
  );
  const renderRail3 = useCallback(() => <Rail />, []);
  const renderRailSelected3 = useCallback(() => <RailSelected />, []);
  const renderLabel3 = useCallback(value => <Label text={value} />, []);
  const renderNotch3 = useCallback(() => <Notch />, []);
  const handleValueChange3 = useCallback((lowValue, highValue) => {
    setLow3(lowValue);
    setHigh3(highValue);
  }, []);
  const renderThumb4 = useCallback(
    (name: 'high' | 'low') => <Thumb name={name} />,
    [],
  );
  const renderRail4 = useCallback(() => <Rail />, []);
  const renderRailSelected4 = useCallback(() => <RailSelected />, []);
  const renderLabel4 = useCallback(value => <Label text={value} />, []);
  const renderNotch4 = useCallback(() => <Notch />, []);
  const handleValueChange4 = useCallback((lowValue, highValue) => {
    setLow4(lowValue);
    setHigh4(highValue);
  }, []);
  const renderThumb5 = useCallback(
    (name: 'high' | 'low') => <Thumb name={name} />,
    [],
  );
  const renderRail5 = useCallback(() => <Rail />, []);
  const renderRailSelected5 = useCallback(() => <RailSelected />, []);
  const renderLabel5 = useCallback(value => <Label text={value} />, []);
  const renderNotch5 = useCallback(() => <Notch />, []);
  const handleValueChange5 = useCallback((lowValue, highValue) => {
    setLow5(lowValue);
    setHigh5(highValue);
  }, []);
  const toggleRangeEnabled = useCallback(
    () => setRangeDisabled(!rangeDisabled),
    [rangeDisabled],
  );
  const setMinTo50 = useCallback(() => setMin(50), []);
  const setMinTo0 = useCallback(() => setMin(0), []);
  const setMaxTo100 = useCallback(() => setMax(100), []);
  const setMaxTo500 = useCallback(() => setMax(500), []);
  const toggleFloatingLabel = useCallback(
    () => setFloatingLabel(!floatingLabel),
    [floatingLabel],
  );

  var image = 'data:image/png;base64,'+baseImage

  return (
    <ScrollView>
     
      <TouchableOpacity  onPress={openGallery}>
     
          
        
        <Image
source={require('../assets/images/empty_profile_avatar.jpg')}
style={styles.profile_image_1}

/>
<Image
            source={{uri:image}}
            style={styles.profile_image}
          
        /> 

        
          </TouchableOpacity>
          <View style={styles.container1}>
          <Text style={styles.Text_title2}>Name</Text>
          <Text style={styles.Text_title3}>{Users.name}</Text>
          <Text style={styles.Text_title2}>Second name</Text>
          <Text style={styles.Text_title3}>{Users.secondName}</Text>
          <Text style={styles.Text_title2}>Surname</Text>
          <Text style={styles.Text_title3}>{Users.surname}</Text>
          <Text style={styles.Text_title2}>Birth day</Text>
          <Text style={styles.Text_title3}>{Users.birthDay}</Text>
          <Text style={styles.Text_title2}>E-mail</Text>
          <Text style={styles.Text_title3}>{Users.email}</Text>
          <Text style={styles.Text_title2}>Phone number</Text>
          <Text style={styles.Text_title3}>{Users.phoneNumber}</Text>
          <Text style={styles.Text_title2}>Address</Text>
          <Text style={styles.Text_title3}>{Users.country} {Users.street} {Users.streetNumber}/{Users.apartmentNumber}, {Users.zipCode} {Users.city} </Text>
          
          </View>
          <View style={styles.slider} >
<Text style={styles.Text_title}>Pulse: {Ranges.lowerPulse} - {Ranges.upperPulse}</Text>
<RangeSlider
  
   min={min}
   max={max}
   low={Ranges.lowerPulse}
   high={Ranges.upperPulse}
   step={1}
   disableRange={rangeDisabled}
   floatingLabel={floatingLabel}
   renderThumb={renderThumb}
   renderRail={renderRail}
   renderRailSelected={renderRailSelected}
   renderLabel={renderLabel}
   renderNotch={renderNotch}
   onValueChanged={handleValueChange}
   disabled={true}
 />
<Text style={styles.Text_title}>Diatolic presure: {Ranges.diatolicLowerPressure} - {Ranges.diatolicUpperPressure}</Text>
<RangeSlider
  
  min={min}
  max={max}
  step={1}
  low={Ranges.diatolicLowerPressure}
   high={Ranges.diatolicUpperPressure}
  disableRange={rangeDisabled}
  floatingLabel={floatingLabel}
  renderThumb={renderThumb2}
  renderRail={renderRail2}
  renderRailSelected={renderRailSelected2}
  renderLabel={renderLabel2}
  renderNotch={renderNotch2}
  onValueChanged={handleValueChange2}
  disabled={true}
/>
<Text style={styles.Text_title}>Sytolic presure: {Ranges.sytolicLowerPressure} - {Ranges.sytolicUpperPressure}</Text>
<RangeSlider
  
  min={min}
  max={max}
  step={1}
  low={Ranges.sytolicLowerPressure}
   high={Ranges.sytolicUpperPressure}
  disableRange={rangeDisabled}
  floatingLabel={floatingLabel}
  renderThumb={renderThumb3}
  renderRail={renderRail3}
  renderRailSelected={renderRailSelected3}
  renderLabel={renderLabel3}
  renderNotch={renderNotch3}
  onValueChanged={handleValueChange3}
  disabled={true}
/>
<Text style={styles.Text_title}>Saturation: {Ranges.lowerSaturation} - {Ranges.upperSaturation}</Text>
<RangeSlider
  
  min={min}
  max={max}
  step={1}
  low={Ranges.lowerSaturation}
   high={Ranges.upperSaturation}
  disableRange={rangeDisabled}
  floatingLabel={floatingLabel}
  renderThumb={renderThumb4}
  renderRail={renderRail4}
  renderRailSelected={renderRailSelected4}
  renderLabel={renderLabel4}
  renderNotch={renderNotch4}
  onValueChanged={handleValueChange4}
  disabled={true}
/>
<Text style={styles.Text_title}>Temperature: {Ranges.lowerTemperature} - {Ranges.upperTemperature}</Text>
<RangeSlider
  
  min={min}
  max={max}
  step={1}
  low={Ranges.lowerTemperature}
   high={Ranges.upperTemperature}
  disableRange={rangeDisabled}
  floatingLabel={floatingLabel}
  renderThumb={renderThumb5}
  renderRail={renderRail5}
  renderRailSelected={renderRailSelected5}
  renderLabel={renderLabel5}
  renderNotch={renderNotch5}
  onValueChanged={handleValueChange5}
  disabled={true}
/> 

</View>
<View style={styles.container2_1}>
        <TouchableOpacity onPress={ ()=>{navigation.navigate(EditProfile)}} style={{ marginTop: 20 }}>
          <Feather
            name="edit"
            size={50}
            color={"#fff"}
            style={{
              alignItems: "center",
              textAlign: "center",
              borderWidth: 5,
              borderColor: "#00A651",
              marginLeft: 10,
              width: 65,
              height: 55,
              backgroundColor: "#00A651",
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container1: {
    position: 'relative',
    backgroundColor: "#fff",
    flexDirection: "column",
    width: "90%",
    marginLeft:"5%",
    height:425,
    borderRadius:25,
    
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
  profile_image_1: {
    top:60,
    ImageResizer: "center",
    height: 175,
    width: "42%",
    borderRadius: 100,
    marginBottom: 70,
    marginLeft: "25%",
    
    position:"absolute"
    
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
    fontSize:18,
    color:"gray"
  },
  Text_title3:{
    textAlign: "center",
    fontSize:18,
    borderBottomWidth:1,
    borderColor:'gray',
    fontWeight: "bold"

  }
});
