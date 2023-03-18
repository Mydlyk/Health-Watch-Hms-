import {
  StyleSheet,
  Text,
  View,
  Box,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import "react-native-svg";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import GoogleFit, {Scopes, BucketUnit, BucketUnitType, BucketOptions} from 'react-native-google-fit';
import axios from "axios";
import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../store/services/AuthContext";
import { calculatePercentage } from "../store/services/ReadingService";
import colors from "../theme/colors";
import { createIconSetFromFontello } from "react-native-vector-icons";
import GetLocation from "react-native-get-location";
import { calculateAveragePulse } from "../store/services/ReadingService";
const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  const { isLoading, setIsLoading, userToken, url } = useContext(AuthContext);

  const [readings, setReadings] = useState();
  const [readingsFetched, setReadingsFetched] = useState(false);

  const [averagePulse, setAveragePulse] = useState({
    "01": 0,
    "02": 0,
    "03": 0,
    "04": 0,
    "05": 0,
    "06": 0,
    "07": 0,
    "08": 0,
    "09": 0,
    "10": 0,
    "11": 0,
    "12": 0,
  });

  const [lastTemperature, setLastTemperature] = useState();
  const [lastHeartRate, setLastHeartRate] = useState();
  const [lastPressure, setLastPressure] = useState({});
  const [lastSaturation, setLastSaturation] = useState();


  const [location, setLocation] = useState({
    latitude: "-",
    longitude: "-"
  });

  const [alertsPercentage, setAlertsPercentages] = useState({
    alerts: 1,
    readings: 1
  });

  const didMountPercentage = useRef(false);
  const [isPercentageCalculated, setIsPercentageCalcualted] = useState(false);

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

  const months = {
    1 : 'January',
    2 : 'Feburuary',
    3 : 'March',
    4 : 'April',
    5 : 'May',
    6 : 'June',
    7 : 'July',
    8 : 'August',
    9 : 'September',
    10 : 'October',
    11 : 'November',
    12 : 'December'
  }

  const calculateMonths = () => {
    let monthsLabels = [];
    let now = new Date().getMonth();
    console.log(now);
    let month = now - 6;
    if(month < 0){
      month = month + 12;
    }
    for(month; month <= now; month ++){
      monthsLabels.push(months[month+1]);
    }
    console.log(monthsLabels);
  }

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
          
        });

    } catch (error) {
      console.log(error);
      Alert.alert("Something went wrong", "We are unable to get data from server!");
    }
  };

  const getLastMonthsReadings = async () => {
    let now = new Date();
    let date = new Date(
      now.getFullYear(),
      now.getMonth()-6,
      now.getDate(),
      now.getHours(),
      now.getMinutes()
    ).toISOString();

    try {
      await axios
        .get(`http://${url}:8080/api/userreading`
        ,{
          headers: {
            Authorization: "Bearer " + userToken,
          },
          params: {date_time: date}
        })
        .then((response) => {
          //console.log(response.data);
          setAveragePulse(calculateAveragePulse(response.data));
        });
    } catch (error) {
      console.log(error);
      Alert.alert("Something went wrong", "We are unable to get your alerts from a server!");
    }
  }

  const getAlertsFromDb = async () => {
    let now = new Date();
    let date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()-7,
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
          setAlertsPercentages(calculatePercentage(response.data));
        });
    } catch (error) {
      console.log(error);
      Alert.alert("Something went wrong", "We are unable to get your alerts from a server!");
    }
    
  };

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

  const Authorize = () => {
    GoogleFit.checkIsAuthorized().then(() => {
      var authorized = GoogleFit.isAuthorized;
      console.log(authorized);
      if (authorized) {
        fetchLastReadings();
      } else {
        // Authentication if already not authorized for a particular device
        GoogleFit.authorize(options)
          .then(authResult => {
            if (authResult.success) {
              console.log('AUTH_SUCCESS');
              fetchLastReadings();
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
  };

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
  };

  useEffect(() => {
    setReadingsFetched(!readingsFetched);
  }, [readings]);

  useEffect(() => {
    if(!didMountPercentage.current){
      didMountPercentage.current = true;
      return
    }
    setIsPercentageCalcualted(true);
    console.log(alertsPercentage)
    console.log(alertsPercentage.alerts);
    console.log(alertsPercentage.readings);
  },[alertsPercentage])

  useEffect(() => {

    Authorize();
    getAlertsFromDb();
    getLocation();
    getLastMonthsReadings();
    calculateMonths();
  }, []);

  const chartConfig = {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`,
    backgroundGradientToOpacity: 0.5,

    strokeWidth: 2, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional
  };

  const pieChartData = [
    {
      name: "Acceptable",
      population: alertsPercentage.readings,
      color: colors.mainGreen,
      legendFontColor: colors.mainGreen,
      legendFontSize: 14,
    },
    {
      name: "Not Acceptable",
      population: alertsPercentage.alerts,
      color: "red",
      legendFontColor: "red",
      legendFontSize: 14,
    },
  ];


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

          <View style={styles.container2}>
            <View style={styles.reading4}>
              <View style={styles.readings_view}>
                <Text style={styles.Text_title}>Saturation</Text>
                <View style={styles.icon_style}>
                  <SimpleLineIcons
                    name="drop"
                    size={35}
                    color="#BD00FF"
                    style={{ margin: 10 }}
                  />
                </View>
                <Text style={styles.Text_title2}>{lastSaturation === undefined ? <Text>-</Text>: <Text>{lastSaturation}</Text>}</Text>
                <Text style={styles.Text_title}>%</Text>
              </View>
            </View>
            <View style={styles.reading5}>
              <View style={styles.readings_view}>
                <Text style={styles.Text_title}>Localization</Text>
                <View style={styles.icon_style}>
                  <MaterialCommunityIcons
                    name="bookmark-outline"
                    size={35}
                    color="#69B7D8"
                    style={{ margin: 10 }}
                  />
                </View>
                <Text style={styles.Text_title2}>{location.latitude}</Text>
                <Text style={styles.Text_title2}>{location.longitude}</Text>
              </View>
            </View>
            
          </View>
        </View>
        <View style={styles.container1}>
          <Text style={styles.Text_title3}>Monthly pulse readings</Text>
          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [
                    Math.random(),
                    Math.random(),
                    Math.random(),
                    Math.random(),
                    Math.random(),
                    Math.random(),
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
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#fff",
              },
            }}
            bezier
            style={{
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "E65CF2",
            }}
          />
        </View>
        <View style={styles.container1}>
          <Text style={styles.Text_title3}>Readings in acceptable ranges </Text>

              <PieChart
              data={pieChartData}
              width={Dimensions.get("window").width - 15}
              height={200}
              chartConfig={chartConfig}
              accessor={"population"}
              backgroundColor={"transparent"}
              style={{
                marginBottom: 20,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "E65CF2",
              }}
            />
    
        </View>
        <View style={styles.container1}>
          <Text style={styles.Text_title3}>Monthly temperature readings </Text>
          <BarChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [
                    Math.random(),
                    Math.random(),
                    Math.random(),
                    Math.random(),
                    Math.random(),
                    Math.random(),
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
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#fff",
              },
            }}
            bezier
            style={{
              marginBottom: 70,

              borderRadius: 20,
              borderWidth: 1,
              borderColor: "E65CF2",
            }}
          />
        </View>
      </View>
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
    width: 150,
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
  },
  navtitle: {
    top: 44,
    flexDirection: "row",
    alignItems: "center",
  },
  readings_view: {
    flexDirection: "column",
    alignItems: "center",
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
});
