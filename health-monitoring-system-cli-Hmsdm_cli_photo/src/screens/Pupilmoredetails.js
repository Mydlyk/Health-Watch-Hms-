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
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { color } from "react-native-reanimated";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import React, { useState,useCallback,useContext,useEffect } from "react";
import "react-native-svg";
import RangeSlider from 'rn-range-slider';
import Thumb from "../containers/Thumb_pupil";
import Rail from "../containers/Rail";
import RailSelected from "../containers/RailSelected";
import Label from "../containers/Label";
import Notch from "../containers/Notch";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";


import { AuthContext } from "../store/services/AuthContext";
import RNFetchBlob from 'rn-fetch-blob';
const Tab = createBottomTabNavigator();

export default function Pupilmoredetails({route,navigation}) {
  const { Users,userToken,url } = useContext(AuthContext);
  const [reading,setreading]=useState(['']);
  const [Ranges,setRanges]=useState(['']);
  const json = Users;

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

const get_photo = async () => {
  try{
    const params = new URLSearchParams({
      related_user_email:json.email.toString(),
      Authorization: "Bearer " + userToken,
    })
    
    RNFetchBlob.fetch("GET", `http://${url}:8080/api/user/getRelatedUserImage?`+ params,  {
     
      related_user_email:json.email.toString(),
      Authorization: "Bearer " + userToken,}
      // more headers  ..
    )
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

const [baseImage, setBaseImage] = useState("");
var image = 'data:image/png;base64,'+baseImage

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

  
useEffect(() => {
  get_photo()
  
}, []);
   
  
  return (
    <ScrollView style={styles.container3}>
      
       
       

        
    <View style={styles.container1}>
    <TouchableOpacity onPress={get_photo}>  
    <Image
source={require('../assets/images/empty_profile_avatar.jpg')}
style={styles.profile_image_1}

/>


<Image
            source={{uri:image}}
            style={styles.profile_image}
          
        /> 
</TouchableOpacity> 
<View style={styles.container3}>
  <View style={styles.container2}>
<Text style={styles.Text_title}>Name:</Text>
<Text style={styles.doctor_text}>{json.name}</Text>
</View>
<View style={styles.container2}>
<Text style={styles.Text_title}>Gender:</Text>
<Text style={styles.doctor_text}>{json.gender}</Text>
</View>
<View style={styles.container2}>
<Text style={styles.Text_title}>Age:</Text>
<Text style={styles.doctor_text}>{json.age}</Text>
</View>
</View>

</View>
<View style={styles.container1_1}>
<View style={styles.container2}>
<Text style={styles.Text_title}>Address:</Text>
<Text style={styles.doctor_text}>{json.address}</Text>
</View>
<View style={styles.container2}>
<Text style={styles.Text_title}>Phone number:</Text>
<Text style={styles.doctor_text}>{json.phoneNumber}</Text>
</View>
<View style={styles.container2}>
<Text style={styles.Text_title}>Email:</Text>
<Text style={styles.doctor_text}>{json.email}</Text>
</View>
<Text style={styles.doctor_text2}>Doctor Note:</Text>
<Text style={styles.doctor_text3}>{json.doctorNote}</Text>
</View>
<Text style={styles.Text_title3}>PupilRanges</Text>

<View style={styles.slider} >
<Text style={styles.Text_title}>Pulse: {json.readingRange.lowerPulse} - {json.readingRange.upperPulse}</Text>
<RangeSlider
  
   min={min}
   max={max}
   low={json.readingRange.lowerPulse}
   high={json.readingRange.upperPulse}
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
<Text style={styles.Text_title}>Diatolic presure: {json.readingRange.diatolicLowerPressure} - {json.readingRange.diatolicUpperPressure}</Text>
<RangeSlider
  
  min={min}
  max={max}
  step={1}
  low={json.readingRange.diatolicLowerPressure}
   high={json.readingRange.diatolicUpperPressure}
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
<Text style={styles.Text_title}>Sytolic presure: {json.readingRange.sytolicLowerPressure} - {json.readingRange.sytolicUpperPressure}</Text>
<RangeSlider
  
  min={min}
  max={max}
  step={1}
  low={json.readingRange.sytolicLowerPressure}
   high={json.readingRange.sytolicUpperPressure}
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
<Text style={styles.Text_title}>Saturation: {json.readingRange.lowerSaturation} - {json.readingRange.upperSaturation}</Text>
<RangeSlider
  
  min={min}
  max={max}
  step={1}
  low={json.readingRange.lowerSaturation}
   high={json.readingRange.upperSaturation}
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
<Text style={styles.Text_title}>Temperature: {json.readingRange.lowerTemperature} - {json.readingRange.upperTemperature}</Text>
<RangeSlider
  
  min={min}
  max={max}
  step={1}
  low={json.readingRange.lowerTemperature}
   high={json.readingRange.upperTemperature}
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
      
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container1: {
    backgroundColor: "#fff",
    flexDirection: "row",
    top: 50,
    width: "100%",
    marginTop:30
  },
  container1_1: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    top: 50,
    width: "100%",
  },
  container2_1: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  container2: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
    marginBottom:20
  },
  container3: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    width: "100%",
    textAlign: "center",
    
  },
  slider: {
    flexDirection: "column",
    backgroundColor: "#fff",
    width: "80%",
    textAlign: "center",
    marginLeft:"10%",
    marginBottom:10,
    marginTop:20
    
  },
  Text_title: {
    fontWeight: "500",
    fontSize: 16,
    fontFamily: "sans-serif-medium",
    marginLeft: 10,
    marginBottom:5,
    marginTop:5
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
    marginBottom: 5,
    alignItems: "center",
    marginLeft: 10,
  },
  notification_text2: {
    fontWeight: "light",
    marginLeft: 10,
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
  profile_image_1: {
    textAlign: "Left",
    height: 150,
    width: 150,
    borderRadius: 30,
    marginBottom: 10,
    borderWidth: 5,
    borderColor: "#00A651",
    marginLeft: 7,
    position:"absolute"
  },
});
