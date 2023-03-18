import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import React, { useState,useContext,useEffect } from "react";
import "react-native-svg";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../store/services/AuthContext";
import RNFetchBlob from 'rn-fetch-blob';
const Tab = createBottomTabNavigator();

export default function DoctorScreen() {
  const navigation = useNavigation(); 
  const [Doctor_d,setDoctor_d]=useState(['']);
  const [Doctor_er,setDoctor_er]=useState(['']);
  const { userToken, url } = useContext(AuthContext);
  const Doctor = async () => {
    try{
    await fetch(`http://${url}:8080/api/user/getMyDoctorInfo`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + userToken,
      },
    })
      .then((response) => response.text())
      .then((quote) => {
        
        setDoctor_d(JSON.parse(quote));
        
         
            
         
          
        }
      )
      
    }
    catch (error) {
     
      console.log(error)
      setDoctor_er(error);
    }
  };
  
  const get_photo = async () => {
    try{


      await fetch(`http://${url}:8080/api/user/getMyDoctorInfo`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + userToken,
      },
    })
      .then((response) => response.text())
      .then((quote) => {
        
        setDoctor_d(JSON.parse(quote));
        var doctor=JSON.parse(quote)
        doctor=doctor.email
         
            
         
          
        }
      )
      
      const params = new URLSearchParams({
        interlocutorEmail:Doctor_d.email.toString(),
        Authorization: "Bearer " + userToken,
      })
      console.log("elo")
      RNFetchBlob.fetch("GET", `http://${url}:8080/api/user/getInterlocutorImage?`+ params,  {
       
        interlocutorEmail:Doctor_d.email.toString(),
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
    
    Doctor();
    get_photo()
    
}, []);

  console.log(Doctor_d);

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
<Text style={styles.doctor_text}>{Doctor_d.name}</Text>
</View>
<View style={styles.container2}>
<Text style={styles.Text_title}>Gender:</Text>
<Text style={styles.doctor_text}>{Doctor_d.gender}</Text>
</View>
<View style={styles.container2}>
<Text style={styles.Text_title}>Age:</Text>
<Text style={styles.doctor_text}>{Doctor_d.age}</Text>
</View>
<View style={styles.container2}>
<Text style={styles.Text_title}>Number:</Text>
<Text style={styles.doctor_text}>{Doctor_d.phoneNumber}</Text>
</View>
<View style={styles.container2}>
<Text style={styles.Text_title}>E-mail:</Text>
<Text style={styles.doctor_text}>{Doctor_d.email}</Text>
</View>
</View>

</View>
<View style={styles.container1_1}>
<Text style={styles.doctor_text2}>Specialization:</Text>
<Text style={styles.doctor_text3}>{Doctor_d.specialization}</Text>
<Text style={styles.doctor_text2}>Education:</Text>
<Text style={styles.doctor_text3}>{Doctor_d.education}</Text>
<Text style={styles.doctor_text2}>Personal info</Text>
<Text style={styles.doctor_text3}>{Doctor_d.personalInfo}{Doctor_d.message}</Text>
</View>

      <View style={styles.container2_1}>
        <TouchableOpacity onPress={()=>{navigation.navigate('ChatSreen')}} style={{ marginTop: 20 }}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={80}
            color={"#fff"}
            style={{
              alignItems: "center",
              textAlign: "center",
              borderWidth: 5,
              borderColor: "#00A651",
              marginLeft: 7,
              width: 90,
              height: 85,
              backgroundColor: "#00A651",
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
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
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
    marginBottom: 10,
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
    marginTop: 20,
    marginBottom: 5,
    alignItems: "center",
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
});
