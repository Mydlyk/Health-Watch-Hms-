import {
  StyleSheet,
  Text,
  View,
  Box,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  ImageBackground,
} from "react-native";
import "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState, useEffect, useContext, useRef } from "react";
import "react-native-svg";
import { AuthContext } from "../store/services/AuthContext";
import GoogleFit, {Scopes, BucketUnit, BucketUnitType, BucketOptions} from 'react-native-google-fit';
import { VictoryChart, VictoryBar, VictoryTheme, VictoryLine } from 'victory-native';
import axios from "axios";
import { mapReadingToList, mapAlerts } from "../store/services/ReadingService";
import { Pressable } from "react-native";
import GetLocation from "react-native-get-location";

export default function HomeScreen() {
  const [Items, setItems] = useState([
    { key: 1, item: "Important Alert 1" },
    { key: 2, item: "Important Alert 2" },
  ]);
  const [Items2, setItems2] = useState([
    { key: 1, item: "Normal Alert 1" },
    { key: 2, item: "Normal Alert 2" },
  ]);
  const { isLoading, setIsLoading, userToken, url } = useContext(AuthContext);

  var today = new Date();
  var lastDayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    today.getHours()-1,
    today.getMinutes()
  );
  const opt = {
    startDate: lastReadingDate, // required ISO8601Timestamp
    endDate: today.toISOString(), // required ISO8601Timestamp
    bucketUnit: BucketUnit.MINUTE, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
    bucketInterval: 1, // optional - default 1.
  };

  const [isFetchedData, setIsFetchedData] = useState(false);
  const [readingsPosted, setReadingsPosted] = useState(false);
  const [yAxisLabels, setYAxisLabels] = useState([]);

  var lastReadingDate = new Date().toISOString();
  const [lastTemperature, setLastTemperature] = useState();
  const [lastHeartRate, setLastHeartRate] = useState();
  const [lastPressure, setLastPressure] = useState({});
  const [lastSaturation, setLastSaturation] = useState();
  const [readings, setReadings] = useState();
  const [newReadings, setNewReadings] = useState();
  const [alerts, setAlerts] = useState();
  const [alertsAreSet, setAlertAreSet] = useState(false);
  const didMount = useRef(false);
  const didAlertsMount = useRef(false);
  const didModalDataMount = useRef(false);

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [didModalDataLoad, setDidModalDataLoad] = useState(false);
  /// Autoryzacja google fit
  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_ACTIVITY_WRITE,
      Scopes.FITNESS_BODY_WRITE,
      Scopes.FITNESS_BODY_READ,
      Scopes.FITNESS_BLOOD_PRESSURE_READ,
      Scopes.FITNESS_BLOOD_GLUCOSE_READ,
      Scopes.FITNESS_SLEEP_READ,
      Scopes.FITNESS_HEART_RATE_READ,
      Scopes.FITNESS_BODY_TEMPERATURE_READ,
      Scopes.FITNESS_LOCATION_READ,
      Scopes.FITNESS_OXYGEN_SATURATION_READ,
      Scopes.FITNESS_NUTRITION_READ,
      Scopes.FITNESS_SLEEP_READ,
    ],
  };

  const getReadingsFromDb = async () =>{
    console.log("Getting readings from DB")
    let now = new Date();
    let date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()-1,
      now.getHours(),
    ).toISOString();
    try {
        await axios.get(`http://${url}:8080/api/userreading/`
        ,{
          headers: {
            Authorization: "Bearer " + userToken,
          },
          params: {date_time: date, batch_size: 14}
        })
        .then((response) => {
          console.log("Readings from db fetched!")
          //console.log(response.data)
          setReadings(response.data);
        });

    } catch (error) {
      console.log(error);
      Alert.alert("Something went wrong", "We are unable to get data from server!");
    }
  }

  const Authorize = () => {
    GoogleFit.checkIsAuthorized().then(() => {
      var authorized = GoogleFit.isAuthorized;
      console.log(authorized);
      if (authorized) {
        fetchLastReadings();
        fetchAllReadings();
      } else {
        // Authentication if already not authorized for a particular device
        GoogleFit.authorize(options)
          .then(authResult => {
            if (authResult.success) {
              console.log('AUTH_SUCCESS');
              fetchLastReadings();
              fetchAllReadings();
            } else {
              //isAuthorized = false;
              console.log('AUTH_DENIED ' + authResult.message);
            }
          })
          .catch(() => {
            //isAuthorized = false;
            dispatch('AUTH_ERROR');
          });
      }
    });
  }

  const fetchLastReadings = async () => {
    console.log("Fetching last readings from google fit");
    let today = new Date();
    var lastDayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      today.getHours()-1,
      today.getMinutes()
    );
    const opt = {
      startDate: lastDayDate.toISOString(), // required ISO8601Timestamp
      endDate: today.toISOString(), // required ISO8601Timestamp
      bucketUnit: BucketUnit.MINUTE, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
      bucketInterval: 1, // optional - default 1.
    };

    const heartRate = await GoogleFit.getHeartRateSamples(opt);
    const pressure = await GoogleFit.getBloodPressureSamples(opt);
    console.log("Pressure:  ")
    console.log(pressure);
    const temperature = await GoogleFit.getBodyTemperatureSamples(opt);
    const saturation = await GoogleFit.getOxygenSaturationSamples(opt);
    if(heartRate.length != 0){
      setLastHeartRate(heartRate[heartRate.length-1].value);
      console.log("Heart rate length: " + heartRate.length)
    }
    if(pressure.length != 0){
      setLastPressure(pressure[pressure.length-1]);
      console.log("Pressure length: "+pressure.length);
    }
    if(temperature.length != 0){
      setLastTemperature(temperature[temperature.length-1].value.toFixed(1));
      console.log("Temperature length: " + temperature.length);
    }
    if(saturation.length != 0){
      setLastSaturation(saturation[saturation.length-1].value);
      console.log("Saturation length: "+saturation.length);
    }
  }

  const fetchAllReadings = async () => {
    let date;
    date = await getLastReadingDate();
    console.log("Last reaading date: "+ date)
    if(date !== undefined){
      
      let today = new Date();
      const opt = {
        startDate: date, // required ISO8601Timestamp
        endDate: today.toISOString(), // required ISO8601Timestamp
        bucketUnit: BucketUnit.MINUTE, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
        bucketInterval: 1, // optional - default 1.
      };

      const heartRate = await GoogleFit.getHeartRateSamples(opt);
      const pressure = await GoogleFit.getBloodPressureSamples(opt);
      const temperature = await GoogleFit.getBodyTemperatureSamples(opt);
      const saturation = await GoogleFit.getOxygenSaturationSamples(opt);
      const location = await GetLocation
          .getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000
          });
      console.log("Pressure: ");
      console.log(pressure);
      console.log("All readings from google fit fetched")
      setNewReadings(mapReadingToList(heartRate,temperature,pressure,saturation,location));
    }
  }

  const getLastReadingDate = async () => {
    var date;
    try {
      await axios
        .get(`http://${url}:8080/api/userreading/getDateOfUserLastReading`
        ,{
          headers: {
            Authorization: "Bearer " + userToken,
          }
        })
        .then((response) => {
          date = new Date(response.data);
          var lastDayDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()-1,
            today.getHours(),
            today.getMinutes()
          );
          if(date < lastDayDate){
            date =  lastDayDate.toISOString();
            //console.log("Last reading date: "+ lastDayDate.toISOString());
          }
          else{
            date =  date.toISOString();
            //console.log("Last reading date: "+ date.toISOString());
          }
        });

    } catch (error) {
      console.log(error);
      Alert.alert("Something went wrong", "We are unable to get your last readings!");
    }

    return date;
  };


  const postReadings = async (readingList) => {
    console.log('Posting readings to db')
    
    try {
     const post =  await axios
        .post(`http://${url}:8080/api/userreading`, 
          readingList
        ,{
          headers: {
            Authorization: "Bearer " + userToken,
          }
        })
        .then((response) => {
          //console.log(response.data);
          setReadingsPosted(!readingsPosted);
          getReadingsFromDb();
          getAlerts();
        });
    } catch (error) {
      console.log(error);
      Alert.alert("Something went wrong", "We are unable to post your reading data to server!");
    }
    
  };

  const getAlerts = async () => {
    let now = new Date();
    let date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()-1,
      now.getHours(),
      now.getMinutes()
    ).toISOString();
    try {
      await axios
        .get(`http://${url}:8080/api/userreading/withAlerts`
        ,{
          headers: {
            Authorization: "Bearer " + userToken,
          },
          params: {date_time: date}
        })
        .then((response) => {
          setAlerts(mapAlerts(response.data));
        });
    } catch (error) {
      console.log(error);
      Alert.alert("Something went wrong", "We are unable to get your alerts from a server!");
    }
    
  };

  useEffect(() => {
    if(!didAlertsMount.current){
      didAlertsMount.current = true;
      return;
    }

    setAlertAreSet(true);
  },[alerts]);

  useEffect(() => {
    if(!didMount.current){
      didMount.current = true;
      return
    }
    postReadings(newReadings);
  },[newReadings]);

  useEffect(() => {
    if(!didModalDataMount.current){
      didModalDataMount.current = true;
      return
    }
    setDidModalDataLoad(true);
  },[modalData]);

  useEffect(() => {
    if(readings !== undefined){
      console.log("Readings length:")
      console.log(readings.length);
      if(readings.length !== 0){
        setIsFetchedData(true);
      }
    }
    //console.log(readings);
  },[readings]);

  const getYAxisLabel = () => {
    let now = new Date();
    var lastDayDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()-1,
      now.getHours(),
    );
    let tempArr = new Array(7);
    tempArr[0] = lastDayDate.getHours();
    for(let i=1;i<8;i++){
      tempArr[i] = tempArr[i-1]+3
      if(tempArr[i] > 24){
        tempArr[i] -= 24;
      }
    }
    
    setYAxisLabels(tempArr);
  }
  const getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
    .then(location => {
      setLocation(location);
    })
    .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
    })
  }
  /*
  async function call(){
    let today = new Date();
    let lastWeekDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      today.getHours(),
      today.getMinutes()-1
    );
    const opt = {
      startDate: lastWeekDate.toISOString(), // required ISO8601Timestamp
      endDate: today.toISOString(), // required ISO8601Timestamp
      bucketUnit: BucketUnit.MINUTE, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
      bucketInterval: 1, // optional - default 1.
    };

    let res = await GoogleFit.getHeartRateSamples(opt);
    console.log("res length");
    console.log(res.length);
    if(res.length !== 0){
      console.log(res);
      setLastHeartRate(res[res.length-1].value);
    }
  }
  // BackGround service
  const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

  const veryIntensiveTask = async (taskDataArguments) => {
    console.log("task started")
    // Example of an infinite loop task
    const { delay } = taskDataArguments;
    await new Promise( async (resolve) => {
        while(BackgroundService.isRunning()){
          call();
          await sleep(delay);
        }
    });
  };

  const backgroudServiceOptions = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
        delay: 10000,
    },
};

  let intervalId;
  */
  useEffect(() => {
    getLocation();
    getReadingsFromDb();
    Authorize();
    getYAxisLabel();
    getAlerts();
    //intervalId = setInterval( call,60000);
    //const startService = async () =>{
     // console.log("back")
     // await BackgroundService.start(veryIntensiveTask,backgroudServiceOptions);
    //}
    //const res = startService();
    //postReadings();
  }, []);

  return (
    <ScrollView>
      
      <View style={styles.container3}>
        
        <View style={styles.container1}>
          <View style={styles.container2}>
            <View style={styles.reading1}>
              <View style={styles.readings_view}>
                <Text style={styles.Text_title}>Pulse</Text>
                <View style={styles.icon_style}>
                  <MaterialCommunityIcons
                    name="heart-pulse"
                    size={35}
                    color="#F45C43"
                    style={{ margin: 10 }}
                  />
                </View>
                <Text style={styles.Text_title2}>{lastHeartRate === undefined ? <Text>-</Text>: <Text>{lastHeartRate}</Text>}</Text>
                <Text style={styles.Text_title}>bpm</Text>
              </View>
            </View>
            <View style={styles.reading2}>
              <View style={styles.readings_view}>
                <Text style={styles.Text_title}>Temperature</Text>
                <View style={styles.icon_style}>
                  <Ionicons
                    name="ios-thermometer-outline"
                    size={35}
                    color="#512DA8"
                    style={{ margin: 10 }}
                  />
                </View>
                <Text style={styles.Text_title2}>{lastTemperature === undefined ? <Text>-</Text>: <Text>{lastTemperature}</Text>}</Text>
                <MaterialCommunityIcons
                  name="temperature-celsius"
                  size={18}
                  color="#FFF"
                />
              </View>
            </View>
            <View style={styles.reading3}>
              <View style={styles.readings_view}>
                <Text style={styles.Text_title}>Pressure</Text>
                <View style={styles.icon_style}>
                  <MaterialCommunityIcons
                    name="heart-plus-outline"
                    size={35}
                    color="#34DEDE"
                    style={{ margin: 10 }}
                  />
                </View>
                <Text style={styles.Text_title2}>{lastPressure === undefined ? <Text>-/-</Text>: <Text>{lastPressure.systolic}/{lastPressure.diastolic}</Text>}</Text>
                <Text style={styles.Text_title}>mm Hg</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.container1}>
          <Text style={styles.Text_title3}>Pulse trough day</Text>
          {readings !== undefined && isFetchedData === true?
          <VictoryChart theme={VictoryTheme.material} domain={{ y: [20, 150]}} domainPadding={{y: 20}} >
            <VictoryLine 
              data={readings} 
              x="date_time"
              y = "pulse"
              interpolation="natural"
            />
          </VictoryChart>:
          <VictoryChart theme={VictoryTheme.material}>

          </VictoryChart>
          }
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "#fff",
            marginLeft: 20,
            width: "90%",
          }}
        >
          <Text style={styles.Text_title3}>Notifications</Text>
          {alertsAreSet? 
            alerts.map((object) => {
                return (
                  
                  
                  <TouchableOpacity
                    onPress={() => {setShowAlertModal(true); setModalData(object)}}
                  >
                    <View style={{ width: "90%" }} key={object.id}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 10,
                          width: "90%",
                        }}
                      >
                        <Ionicons
                          name="alert-circle"
                          size={50}
                          color="#FF5656"
                          style={{ marginLeft: 5 }}
                        />
                        <View style={{ flexDirection: "column", width: "90%" }}>
                          <Text style={styles.notification_text1}>{object.description}</Text>
                          <View style={{ flexDirection: "row", width: "90%" }}>
                            <Text style={styles.notification_text2}>
                              {object.description}
                            </Text>
                            <Text style={{ textAlign: "right", width: "70%" }}>
                              {object.date_time.slice(11,16)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                
                ); 
              }):
            <Text> </Text>
          }
        </View>
      </View>

      <Modal
        visible = {showAlertModal}
        onRequestClose={() => setShowAlertModal(false)}
        transparent
        hardwareAccelerated
        animationType="fade"
        animationIn={"fade"}
      >
        <View style={styles.modal_background}>
          <View style={styles.modal_popup}>
            <View>
              <Text style={styles.modal_title}>{didModalDataLoad?modalData.description: null}</Text>
              <ImageBackground
                style={{
                  height: 205,
                  marginTop: 10,
                }}
                source={require("../assets/images/popup-background.jpg")}
              >
                <View>
                  <Text style={styles.modal_second_title}>
                  {didModalDataLoad? modalData.date_time.slice(0,16).replace('T', "   ") : null}
                  </Text>
                  <Text style={styles.modal_text}>
                    Pulse {didModalDataLoad?modalData.reading.pulse: null} {"\n"}
                    Blood Pressure {didModalDataLoad?modalData.reading.pulse === null? <Text>-</Text>:modalData.reading.pulse : null} {"\n"}
                    Saturation {didModalDataLoad?modalData.reading.saturation === null? <Text>-</Text>:modalData.reading.saturation : null} {"\n"}
                    Temperature {didModalDataLoad?modalData.reading.temperature === null? <Text>-</Text>:modalData.reading.temperature : null} {"\n"}
                  </Text>
                </View>
                </ImageBackground>
            </View>

            <Pressable
              onPress={() => setShowAlertModal(false)}
              android_ripple={{ color: "#fff" }}
              style={styles.pressable_style}
            >
              <Text style={styles.pressable_button_style}> Close </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    top: 50,
  },
  container2: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginTop: 17,
  },
  container3: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
  },

  reading1: {
    width: 115,
    height: 140,
    backgroundColor: "#F45C43",

    borderRadius: 26,
    alignItems: "center",
  },
  reading2: {
    width: 115,
    height: 140,
    backgroundColor: "#512DA8",
    alignItems: "center",
    borderRadius: 26,
    marginLeft: 10,
  },
  reading3: {
    width: 115,
    height: 140,
    backgroundColor: "#34DEDE",
    alignItems: "center",
    borderRadius: 26,
    marginLeft: 10,
  },
  reading4: {
    width: 115,
    height: 140,
    backgroundColor: "#BD00FF",
    alignItems: "center",
    borderRadius: 26,
  },
  reading5: {
    width: 115,
    height: 140,
    backgroundColor: "#69B7D8",
    alignItems: "center",
    borderRadius: 26,
    marginLeft: 10,
  },
  reading6: {
    width: 115,
    height: 140,
    backgroundColor: "#0057FF",
    alignItems: "center",
    borderRadius: 26,
    marginLeft: 10,
  },
  Text_title: {
    fontWeight: "500",
    fontSize: 16,
    fontFamily: "sans-serif-medium",
    color: "#FFFFFF",
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
  notification_text3: {},
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
});

/*

{readings !== undefined && isFetchedData === true?
          <VictoryChart theme={VictoryTheme.material} domain={{ y: [20, 150]}} domainPadding={{y: 20}} >
            <VictoryLine 
              data={readings} 
              x="date_time"
              y = "pulse"
              interpolation="natural"
            />
          </VictoryChart>:
          <VictoryChart theme={VictoryTheme.material}>

          </VictoryChart>
          }





<LineChart
            data={isFetchedData === true?{
              labels: yAxisLabels,
              datasets: [
                {
                  data: pulse
                },
              ],
            }:
            {
              labels: yAxisLabels,
              datasets: [
                {
                  data: [
                    0,0,0,4,0,0,0
                  ],
                },
              ],
            }}
            width={Dimensions.get("window").width - 15} // from react-native
            height={220}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "0",
                strokeWidth: "0",
                stroke: "#E65CF2",
              },
              propsForBackgroundLines:{
                strokeWidth: "0",
              }
            }}
            bezier
            style={{
              marginBottom: 50,
              borderRadius: 20,
              borderWidth: 3,
              borderColor: "#E65CF2",
            }}
          />
          {isFetchedData === true?
          <VictoryChart theme={VictoryTheme.material} minDomain={{y:0}}>
            <VictoryLine 
              data={heartRateChart} 
              x="date"
              y = "value"
              interpolation="natural"
            />
          </VictoryChart>:
          <VictoryChart theme={VictoryTheme.material}>

          </VictoryChart>
          }
*/
