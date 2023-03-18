import React, { useState, useContext,useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ImageBackground,
  Alert
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { AuthContext } from "../store/services/AuthContext";
import RNFetchBlob from 'rn-fetch-blob';
const CustomDrawer = (props) => {
  const [showAboutus, Setshowaboutus] = useState(false);
  const [showsher, Setshowsher] = useState(false);
  const [showfeed, Setshowfeed] = useState(false);
  const { logout,userToken, url } = useContext(AuthContext);
  const [Users,setUsers]=useState(['']);
  const [baseImage, setBaseImage] = useState("");
  var image = 'data:image/png;base64,'+baseImage
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

  useEffect(() => {
    get_photo()
    Account_info();
    
}, []);
  
  return (
    <View style={styles.view_main}>
      <Modal
        visible={showAboutus}
        onRequestClose={() => Setshowaboutus(false)}
        transparent
        hardwareAccelerated
        animationType="fade"
        animationIn={"fade"}
      >
        <View style={styles.modal_background}>
          <View style={styles.modal_popup}>
            <View>
              <Text style={styles.modal_title}> About us </Text>
              <ImageBackground
                style={{
                  height: 205,
                  marginTop: 10,
                }}
                source={require("../assets/images/popup-background.jpg")}
              >
                <View>
                  <Text style={styles.modal_second_title}>
                    This is Engineering Thesis created by
                  </Text>
                  <Text style={styles.modal_text}>
                    {" "}
                    Bartosz Mitura {"\n"} Mydlak Damian{"\n"} Beniamin
                    Niczyporuk
                  </Text>
                </View>
              </ImageBackground>
            </View>

            <Pressable
              onPress={() => Setshowaboutus(false)}
              android_ripple={{ color: "#fff" }}
              style={styles.pressable_style}
            >
              <Text style={styles.pressable_button_style}> Close </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showsher}
        onRequestClose={() => Setshowsher(false)}
        transparent
        hardwareAccelerated
        animationType="fade"
        animationIn={"fade"}
      >
        <View style={styles.modal_background}>
          <View style={styles.modal_popup}>
            <View>
              <Text style={styles.modal_title}> Tell your friend </Text>
              <ImageBackground
                style={{
                  height: 205,
                  marginTop: 10,
                }}
                source={require("../assets/images/popup-background.jpg")}
              ></ImageBackground>
            </View>

            <Pressable
              onPress={() => Setshowsher(false)}
              android_ripple={{ color: "#fff" }}
              style={styles.pressable_style}
            >
              <Text style={styles.pressable_button_style}> Close </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showfeed}
        onRequestClose={() => Setshowfeed(false)}
        transparent
        hardwareAccelerated
        animationType="fade"
        animationIn={"fade"}
      >
        <View style={styles.modal_background}>
          <View style={styles.modal_popup}>
            <View>
              <Text style={styles.modal_title}> Feedback & Contact us </Text>
              <ImageBackground
                style={{
                  height: 205,
                  marginTop: 10,
                }}
                source={require("../assets/images/popup-background.jpg")}
              ></ImageBackground>
            </View>

            <Pressable
              onPress={() => Setshowfeed(false)}
              android_ripple={{ color: "#fff" }}
              style={styles.pressable_style}
            >
              <Text style={styles.pressable_button_style}> Close </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <DrawerContentScrollView {...props}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.closeDrawer();
            }}
            style={{ paddingVertical: 10 }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 5,
              }}
            >
              <AntDesign name="arrowleft" size={30} />
            </View>
          </TouchableOpacity>
          <Image
            source={require("../assets/images/empty_profile_avatar.jpg")}
            style={styles.profile_image}
          />
          <Image
            source={{uri:image}}
            style={styles.profile_image1}
          
        /> 
        </View>
        <Text style={styles.text_main_drawer}>{Users.name} {Users.surname}</Text>
        <Text style={styles.second_main_text_drawer}>{Users.phoneNumber}</Text>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <TouchableOpacity
            onPress={() => {
              Setshowaboutus(true);
            }}
            style={{ paddingVertical: 10 }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 20,
              }}
            >
              <MaterialCommunityIcons
                name="information-outline"
                size={30}
                color="#00A651"
              />
              <Text style={{ fontSize: 15, marginLeft: 10 }}>About us</Text>
            </View>
          </TouchableOpacity>
          <DrawerItemList {...props} />
          <TouchableOpacity
            onPress={() => {
              logout();
            }}
            style={{ paddingVertical: 10 }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 20,
              }}
            >
              <AntDesign name="logout" size={30} />
              <Text style={{ fontSize: 15, marginLeft: 10 }}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity
          onPress={() => {
            Setshowsher(true);
          }}
          style={{ paddingVertical: 10 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={30} color="#00A651" />
            <Text style={{ fontSize: 15, marginLeft: 10 }}>
              Tell your friend
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Setshowfeed(true);
          }}
          style={{ paddingVertical: 10 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="message-text-outline"
              size={30}
              color="#00A651"
            />
            <Text style={{ fontSize: 15, marginLeft: 10 }}>
              Feedback & Contact us
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "vertical",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    textAlign: "center",
  },
  view_main: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
    textAlign: "center",
  },
  modal_background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  modal_popup: {
    width: 300,
    height: 300,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 26,
  },
  modal_title: {
    heigh: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00A651",
    textAlign: "center",
    fontSize: 30,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  modal_second_title: {
    heigh: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  modal_text: {
    heigh: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 22,
    marginTop: 10,
  },
  pressable_style: {
    backgroundColor: "#ed1a4f",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  pressable_button_style: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 30,
    color: "#fff",
  },
  profile_image: {
    ImageResizer: "center",
    height: 100,
    width: 100,
    borderRadius: 100,
    marginBottom: 10,
    marginLeft: "20%",
    top:10
   
  },
  profile_image1: {
    ImageResizer: "center",
    height: 100,
    width: 100,
    borderRadius: 100,
    marginBottom: 10,
    marginLeft: "28%",
    position:"absolute"
  },
  text_main_drawer: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 15,
    fontVariant: ["oldstyle-nums"],
  },
  second_main_text_drawer: {
    textAlign: "center",
    color: "#808080",
    fontSize: 15,
    marginBottom: 20,
  },
});
