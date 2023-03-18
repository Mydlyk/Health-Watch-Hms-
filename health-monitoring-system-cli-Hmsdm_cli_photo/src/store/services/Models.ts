export class HeartRate{
  value: number;
  endDate: string;
  startDate: string;
  day: string;
}

export class Saturation{
  value: number;
  endDate: string;
  startDate: string;
  day: string;
}

export class Temperature{
  value: number;
  endDate: string;
  startDate: string;
  day: string;
}

export class Pressure{
  systolic: number;
  diastolic: number;
  endDate: string;
  startDate: string;
  day: string;
}

export class ReadingList{
  date_time: string;
  longitude: number | null;
  latitude: number | null;
  temperature: number | null;
  saturation: number | null;
  pulse: number | null;
  upper_blood_pressure: number | null;
  lower_blood_pressure: number | null;
}

export class CustomAlert{
  date_time: string;
  id: number;
  description: string;
  reading_type: string;
  value: string | undefined;
  reading: ReadingList;
}

export class FullReading{
  dateTime: string;
  longitude: string | null;
  latitude: string | null;
  temperature: number | null;
  saturation: number | null;
  pulse: number | null;
  upper_blood_pressure: number | null;
  lower_blood_pressure: number | null;
  id?: number;
  alerts: Alert[]
}

export class AlertType {
  description?: any;
  id: number;
  type: string;
}

export class Alert {
  alert: string;
  alertType: AlertType;
  id: number;
}

export class Percentage{
  alerts: number;
  readings: number;
}

export interface Localization {
  accuracy: number;
  altitude: number;
  bearing: number;
  latitude: number;
  longitude: number;
  provider: string;
  speed: number;
  time: number;
}

export class Months  {
  '01' : number | null;
  '02' : number | null;
  '03' : number | null;
  '04' : number | null;
  '05' : number | null;
  '06' : number | null;
  '07' : number | null;
  '08' : number | null;
  '09' : number | null;
  '10' : number | null;
  '11' : number | null;
  '12' : number | null;
}


