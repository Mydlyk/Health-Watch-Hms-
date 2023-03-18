import { HeartRate, Temperature, Pressure, Saturation, ReadingList, FullReading, CustomAlert, Percentage, Localization, Months } from "./Models"

export const mapReadingToList = ( heartRate: HeartRate[], temperature: Temperature[],  bloodPressure: Pressure[], saturation: Saturation[], localization: Localization ) =>{
  let readingList: ReadingList[] = [];
  heartRate.splice(0,1);
  console.log(localization)
  heartRate.forEach(element => {
    if(element){
      const t = temperature.find((obj) => {return obj.endDate === element.endDate})?.value;
    const temp = t? t : null;
    const bp = bloodPressure.find((obj) => {return obj.endDate === element.endDate});
    const bpUpper = bp?.systolic ? bp.systolic : null;
    const bpLower = bp?.diastolic ? bp.diastolic : null;
    const s = saturation.find((obj) => {return obj.endDate === element.endDate})?.value;
    const sat = s ? s : null;
    const isoStringDate = new Date(element.endDate);
    const date : string = isoStringDate.toISOString().slice(0, 19).replace('T', ' ');
    readingList.push({
      date_time: date, 
      pulse:element.value, 
      lower_blood_pressure: bpLower, 
      upper_blood_pressure: bpUpper, 
      temperature: temp,
      saturation: sat,
      latitude: localization.latitude,
      longitude: localization.longitude
    })
    }
  });
  console.log("Readings mapped");
  console.log(readingList.length);
  return readingList;
}

export const mapAlerts = (fullReadings: FullReading[]) => {
  let alerts: CustomAlert[] = [];
  fullReadings.forEach(element => {
    if(element.alerts.length != 0){
      element.alerts.forEach(al =>{
        var value : string | undefined;
        var readingType : string = "";
        switch(al.alert){
          case 'Too high pulse!':{
            value = element.pulse?.toString();
            readingType = "pulse";
            break;
          }
          case 'Too low pulse!':{
            value = element.pulse?.toString();
            readingType = "pulse";
            break;
          }
          case 'Too high temperature!':{
            value = element.temperature?.toString();
            readingType = "temperature";
            break;
          }
          case 'Too low temperature!':{
            value = element.temperature?.toString();
            readingType = "temperature";
            break;
          }
          case 'Too high saturation!':{
            value = element.saturation?.toString();
            readingType = "saturation";
            break;
          }
          case 'Too low saturation!':{
            value = element.saturation?.toString();
            readingType = "saturation";
            break;
          }
          case 'Too high systolic blood pressure!':{
            value = element.lower_blood_pressure?.toString() + "/" + element.upper_blood_pressure?.toString();
            readingType = "pressure";
            break;
          }
          case 'Too low systolic blood pressure!':{
            value = element.lower_blood_pressure?.toString() + "/" + element.upper_blood_pressure?.toString();
            readingType = "pressure";
            break;
          }
          case 'Too high diastolic blood pressure!':{
            value = element.lower_blood_pressure?.toString() + "/" + element.upper_blood_pressure?.toString();
            readingType = "pressure";
            break;
          }
          case 'Too low diastolic blood pressure!':{
            value = element.lower_blood_pressure?.toString() + "/" + element.upper_blood_pressure?.toString();
            readingType = "pressure";
            break;
          }
        }
        alerts.push({
          date_time: element.dateTime,
          description: al.alert,
          reading_type: readingType,
          value: value,
          id: al.id,
          reading: {
            date_time: element.dateTime,
            pulse:  element.pulse, 
            lower_blood_pressure: element.lower_blood_pressure, 
            upper_blood_pressure: element.upper_blood_pressure, 
            temperature: element.temperature,
            saturation: element.saturation,
            latitude: null,
            longitude: null
          }
        })
      })
    }
  })
  return alerts;
}


export const calculatePercentage = (fullReadings: FullReading[]) => {
  let sum = 0;
  fullReadings.forEach(element => {
    if(element.alerts.length != 0){
      sum += element.alerts.length;
    }
  })
  let percentage = sum/fullReadings.length * 100;
  let model: Percentage;
  model = {alerts: percentage, readings: 100-percentage}
  return model;
}

export const calculateAveragePulse = (readings: ReadingList[]) => {
  let avgPulse : Months = {
    '01': 0,
    '02': 0,
    '03': 0,
    '04': 0,
    '05': 0,
    '06': 0,
    '07': 0,
    '08': 0,
    '09': 0,
    '10': 0,
    '11': 0,
    '12': 0
  };
  if(readings.length > 0 ){
    let month = readings[0].date_time.split("-")[1];

    let index = 0;
    let sum = 0;
    readings.forEach(element => {
      if(element.date_time.split('-')[1] === month){
        sum += element.pulse ? element.pulse : 0;
        index ++;
      }else{
        avgPulse[month] = sum/index;
        index = 1;
        month = element.date_time.split('-')[1];
        sum = element.pulse ? element.pulse : 0
      }
      avgPulse[month] = sum / index;
    });
  }
  console.log(avgPulse);
  return avgPulse;
}




