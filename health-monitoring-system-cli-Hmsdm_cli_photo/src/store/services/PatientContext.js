import React, { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { Alert } from "react-native";


 const PatientContext = createContext();
 export default PatientContext;
export const PupilProvider = ({ children }) => {
  const [Users,setUsers]=useState([]);

  const Patient = (json) => {
    setUsers(json);
  };

  
  return (
    <PatientContext.Provider
      value={{ login,Users }}
    >
      {children}
    </PatientContext.Provider>
  );
};

