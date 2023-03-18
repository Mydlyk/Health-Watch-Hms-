import { StyleSheet, Text, View,Box,Dimensions,ScrollView,TouchableOpacity,Image,FlatList,ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import React,{useState,useContext,useEffect} from 'react';
import "react-native-svg";
import FormInput from "../components/atoms/textInputs";
import AddPatients from "./AddPatients";
import { AuthContext } from "../store/services/AuthContext";
import BottomtabmenuPatients from '../navigation/BottomtabmenuPatients';
const Tab = createBottomTabNavigator();

const PatientList = ({ navigation }) => {
  const { userToken, url } = useContext(AuthContext);
  const [Users,setUsers]=useState([]);
  const [Items, setItems] = useState([
    { key: 1, item: "Jan Kowalski" },
    { key: 2, item: "Zbigniew Nowak" },
  ]);

  const pairing_code = async () => {
    try{
    await fetch(`http://${url}:8080/api/doctor/getPatients`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + userToken,
      },
    })
      .then((response) => response.text())
      .then((quote) => {
        setUsers(JSON.parse(quote));
        
         
            
         
          
        }
      )
      
    }
    catch (error) {
     
      console.log(error)
      
    }
  };

  useEffect(() => {
   
    pairing_code();
}, []);


  return (
    <ScrollView style={styles.container3}>
      
       

      <View style={styles.container1_1}>
        <Text style={styles.Text_title3}>Patients</Text>
        <FormInput
          placeholder="       Look for a patient..."
          inputstyle={{
            textalign: "center",
            marginTop: 5,
            width: "90%",
            marginLeft: "5%",
            borderWidth: 1,
            borderColor: "gray",
            height: 40,
            borderRadius: 10,
            fontSize: 15,
            marginBottom: 20,
          }}
          onChangeText={{}}
        />
         <FlatList
        data={Users}
        renderItem={({item})=>
      
        <TouchableOpacity onPress={() => {
          navigation.navigate("BottomtabmenuPatients",{screen:'PatientProfile',params:{json: item,
          gender: 15,}},)}} style={{borderRadius:15,marginBottom:20,marginLeft:'5%',borderWidth: 2, borderColor:'#00A651',width:'90%'}} key={item.key}>
              
        <View style={{marginTop:10,flexDirection:'row',alignItems:'center', marginBottom:10, width:'90%'}}>
            <MaterialCommunityIcons name="account-box-outline" size={50} color="gray" style={{marginLeft:5}} />
        
            <View style={{flexDirection:'column',width:'90%' }}>
            <Text style={styles.notification_text1}>{item.name} {item.surname}</Text>
            <View style={{flexDirection:'row', width:'100%'}}>
            <FontAwesome name="warning" size={20} style={styles.notification_text2} color={"#ff0000"}/>
            <Text style={styles.notification_text2_1}>{item.alerts}</Text>
            <Text style={{fontWeight:'700',textAlign:'right',width:'20%',height:23, color:'#00A651',marginTop:10,marginright:5, borderWidth:5,borderRadius:25, borderColor:'#e9e9e9',backgroundColor:'#e9e9e9'}}>Open   </Text>
            </View>
            </View>
            
           
            </View>
            </TouchableOpacity>
      
      }


/>

        <View style={styles.container2_1}>
          <TouchableOpacity
            onPress={() => navigation.navigate(AddPatients)}
            style={{ marginTop: 20 }}
          >
            <Feather
              name="plus"
              size={60}
              color={"#fff"}
              style={{
                alignItems: "center",
                textAlign: "center",
                borderWidth: 5,
                borderColor: "#00A651",
                marginLeft: 7,
                width: 60,
                height: 60,
                backgroundColor: "#00A651",
                borderRadius: 20,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
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
    marginBottom: "20%",
  },
  container2_1: {
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
    textAlign: "center",
    top: "5%",
    borderBottomWidth: 1,
    borderBottomColor: "#00A651",
    width: "85%",
    marginLeft: "7%",
    marginBottom: 30,
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
    width: "85%",
    alignItems: "center",
    textAlign: "center",
    marginTop: 10,
  },
  notification_text2: {
    fontWeight: "light",
    marginLeft: 10,
    marginTop: 10,
  },
  notification_text2_1: {
    fontWeight: "light",
    marginLeft: 10,
    marginTop: 10,
    marginRight: "40%",
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
});
export default PatientList;
