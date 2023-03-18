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
import React from 'react';
import  { useState,useEffect,useContext,RefreshControl } from "react";
import "react-native-svg";
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


export default function PatientProfile({route,navigation}) {
  const [reading,setreading]=useState(['']);
  const [lower,setlower]=useState([]);
  
  const [data, setData] = React.useState({
    lowerPulse:0,
    upperPulse:0,
    sytolicLowerPressure:0,
    sytolicUpperPressure:0,
    diatolicLowerPressure:0,
    diatolicUpperPressure:0,
    lowerSaturation:0,
    upperSaturation:0,
    lowerTemperature:0,
    upperTemperature:0
  });

  const [refreshing, setRefreshing] = useState(true);
    const {json,gender} = route.params;
    
    const { patient,userToken,url } = useContext(AuthContext);
   
   
    const params2 = new URLSearchParams({
      patient_email: json.email.toString(),
      Authorization: "Bearer " + userToken,
    }).toString();
    const patientinfo = async () => {
     
      try{
      await fetch(`http://${url}:8080/api/doctor/getPatientDetailedInfo?` + params2, {
        method: "GET",
        headers: {
          patient_email: json.email.toString(),
           Authorization: "Bearer " + userToken,
           
        },
      })
        .then((response) => response.text())
        .then((quote) => {
          
          setreading(JSON.parse(quote));
          const pomoc=JSON.parse(quote)
          
          setlower(pomoc.readingRange.lowerPulse)
         
         
          setData({
            ...data,
            lowerPulse:pomoc.readingRange.lowerPulse,
            upperPulse:pomoc.readingRange.upperPulse,
            sytolicLowerPressure:pomoc.readingRange.sytolicLowerPressure,
            sytolicUpperPressure:pomoc.readingRange.sytolicUpperPressure,
            diatolicLowerPressure:pomoc.readingRange.diatolicLowerPressure,
            diatolicUpperPressure:pomoc.readingRange.diatolicUpperPressure,
            lowerSaturation:pomoc.readingRange.lowerSaturation,
            upperSaturation:pomoc.readingRange.upperSaturation,
            lowerTemperature:pomoc.readingRange.lowerTemperature,
            upperTemperature:pomoc.readingRange.upperTemperature
          });
         
           
              
           
            
          }
        )
        
      }
      catch (error) {
        //console.log(error)
        
        
      }


     
    };

    useEffect(() => {
      patient(json);
      
      patientinfo()
      get_photo();
      
      
      
    }, []);


   
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
    
    <View style={styles.container3}>
      
       
       

        
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
<Text style={styles.Text_title3}>Patient Ranges</Text>

<View style={styles.containertab}>
      <Text style={styles.Text_title}>Pulse:</Text>
      <Text style={styles.doctor_text}>{data.lowerPulse}-{data.upperPulse}</Text>
      </View>
      <View style={styles.containertab2}>
      <Text style={styles.Text_title}>Sytolic pressure:</Text>
      <Text style={styles.doctor_text}>{data.sytolicLowerPressure}-{data.sytolicUpperPressure}</Text>
      </View>
      <View style={styles.containertab}>
      <Text style={styles.Text_title}>Diastolic pressure:</Text>
      <Text style={styles.doctor_text}>{data.diatolicLowerPressure}-{data.diatolicUpperPressure}</Text>
      </View>
      <View style={styles.containertab2}>
      <Text style={styles.Text_title}>Saturation:</Text>
      <Text style={styles.doctor_text}>{data.lowerSaturation}-{data.upperSaturation}</Text>
      </View>
      <View style={styles.containertab}>
      <Text style={styles.Text_title}>Temperature:</Text>
      <Text style={styles.doctor_text}>{data.lowerTemperature}-{data.upperTemperature}</Text>
      </View>
</View>




      
      
    </View>
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
  containertab: {
    flexDirection: "row",
    backgroundColor: "#b7d5ac",
    width: "80%",
    marginBottom:20,
    marginLeft:"10%"
  },
  containertab2: {
    flexDirection: "row",
    backgroundColor: "#dbead5",
    width: "80%",
    marginBottom:20,
    marginLeft:"10%"
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
    textAlign: "center",
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
