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
  Alert
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
import React, { useState,useCallback,useContext } from "react";
import "react-native-svg";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import FormInput from "../components/atoms/textInputs";
import RangeSlider from 'rn-range-slider';
import Thumb from "../containers/Thumb";
import Rail from "../containers/Rail";
import RailSelected from "../containers/RailSelected";
import Label from "../containers/Label";
import Notch from "../containers/Notch";
import { AuthContext } from "../store/services/AuthContext";
import RNFetchBlob from 'rn-fetch-blob';
const Tab = createBottomTabNavigator();

export default function EditPatient({route,navigation}) {
  const [note, setnote] = useState("");
  const { patients,userToken,url } = useContext(AuthContext);
  const json = patients;
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
  const [floatingLabel, setFloatingLabel] = useState(false);
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
    (name: 'high' | 'low') => <Thumb name={name} />,
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

  console.log(low2,high);
  console.log(route);
    //const {json,gender} = route.params;
    const params = new URLSearchParams({
      patientEmail: json.email.toString(),
      Authorization: "Bearer " + userToken,
    }).toString();
    const unPairpatient = async () => {
      var polaczenie = true;
      try {
        await fetch(`http://${url}:8080/api/doctor/unpairPatient?` + params, {
          method: "PUT",
          headers: {
            patientEmail: json.email.toString(),
            Authorization: "Bearer " + userToken,
          },
          
        })
          .then((response1) => response1.text())
          .then((quote) => {
            console.log(quote);
            try{
              seterror(JSON.parse(quote));
             var error2=JSON.parse(quote)
             console.log(typeof error2.message)
             if(typeof error2.message==undefined){Alert.alert("ok");}
             else{
              Alert.alert("Something went wrong", error2.message);}
          }catch(error){
            Alert.alert("ok", error2.message);
          }
            }
          );
      } catch (error) {
        Alert.alert("           Users are unpaired now",);
        navigation.navigate('PatientList');
        
      }
    };
    const params2 = new URLSearchParams({
      note:note.toString(),
      patientEmail: json.email.toString(),
      Authorization: "Bearer " + userToken,
    }).toString();

    const doctor_note = async () => {
      try {
        await fetch(`http://${url}:8080/api/doctor/setPatientNote?` + params2, {
          method: "POST",
          headers: {
            note:note.toString(),
            patientEmail: json.email.toString(),
            Authorization: "Bearer " + userToken,
          },
        })
          .then((response1) => response1.text())
          .then((quote) => {
            console.log(quote);
            if (quote == NULL) {
              Alert.alert("ok");
            } else {
              seterror(JSON.parse(quote));
              Alert.alert("Something went wrong", error.message);
            }
          });
      } catch (error) {
        Alert.alert("Patient note updated");
      }
  
  
    };


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
<View style={styles.container2}>
<Text style={styles.doctor_text2}>Doctor Note:</Text>
<TouchableOpacity onPress={doctor_note} style={styles.edittext} >
<AntDesign
                          name="edit"
                          size={30}
                          color="#FF5656"
                          style={styles.edittext}
                        />
                        </TouchableOpacity >
</View>
<FormInput
          value={json.doctorNote}

           inputstyle={{ marginLeft: 10  }}
          onChangeText={(val) => setnote(val)}
        />
</View>
<Text style={styles.Text_title3}>PupilRanges</Text>

<View style={styles.slider} >
<Text style={styles.Text_title}>Pulse:</Text>
<RangeSlider
  
   min={min}
   max={max}
   step={1}
   disableRange={rangeDisabled}
   floatingLabel={floatingLabel}
   renderThumb={renderThumb}
   renderRail={renderRail}
   renderRailSelected={renderRailSelected}
   renderLabel={renderLabel}
   renderNotch={renderNotch}
   onValueChanged={handleValueChange}
 />
<Text style={styles.Text_title}>Sytolic presure:</Text>
<RangeSlider
  
  min={min}
  max={max}
  step={1}
  disableRange={rangeDisabled}
  floatingLabel={floatingLabel}
  renderThumb={renderThumb2}
  renderRail={renderRail2}
  renderRailSelected={renderRailSelected2}
  renderLabel={renderLabel2}
  renderNotch={renderNotch2}
  onValueChanged={handleValueChange2}
/>
<Text style={styles.Text_title}>Diastolic presure:</Text>
<RangeSlider
  
  min={min}
  max={max}
  step={1}
  disableRange={rangeDisabled}
  floatingLabel={floatingLabel}
  renderThumb={renderThumb3}
  renderRail={renderRail3}
  renderRailSelected={renderRailSelected3}
  renderLabel={renderLabel3}
  renderNotch={renderNotch3}
  onValueChanged={handleValueChange3}
/>
<Text style={styles.Text_title}>Saturation:</Text>
<RangeSlider
  
  min={min}
  max={max}
  step={1}
  disableRange={rangeDisabled}
  floatingLabel={floatingLabel}
  renderThumb={renderThumb4}
  renderRail={renderRail4}
  renderRailSelected={renderRailSelected4}
  renderLabel={renderLabel4}
  renderNotch={renderNotch4}
  onValueChanged={handleValueChange4}
/>
<Text style={styles.Text_title}>Temperature:</Text>
<RangeSlider
  
  min={min}
  max={max}
  step={1}
  disableRange={rangeDisabled}
  floatingLabel={floatingLabel}
  renderThumb={renderThumb5}
  renderRail={renderRail5}
  renderRailSelected={renderRailSelected5}
  renderLabel={renderLabel5}
  renderNotch={renderNotch5}
  onValueChanged={handleValueChange5}
/>
</View>

      <View style={styles.container2_1}>
        <TouchableOpacity onPress={unPairpatient} style={{ marginTop: 20 }}>
          <AntDesign
            name="close"
            size={80}
            color={"#fff"}
            style={{
              alignItems: "center",
              textAlign: "center",
              borderWidth: 5,
              borderColor: "#A60000",
              marginLeft: 7,
              width: 80,
              height: 80,
              backgroundColor: "#A60000",
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
    backgroundColor: "#fff",
    flexDirection: "row",
    top: 30,
    width: "100%",
    marginTop:30
  },
  container1_1: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    top: 30,
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
  Text_title: {
    fontWeight: "500",
    fontSize: 16,
    fontFamily: "sans-serif-medium",
    marginLeft: 10,
    marginTop:10
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
  slider: {
    flexDirection: "column",
    backgroundColor: "#fff",
    width: "80%",
    textAlign: "center",
    marginLeft:"10%",
    marginBottom:10,
    marginTop:20
    
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
    marginTop:10
  },
  doctor_text2: {
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "sans-serif-medium",
    marginLeft: 10,
    color: "#00A651",
  },
  edittext: {
    flex: 1,
    color: "#00A651",
    fontWeight: "300",
    fontFamily: "sans-serif-medium",
    textAlign: "right",
    width: "100%",
    marginRight: 30,
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
