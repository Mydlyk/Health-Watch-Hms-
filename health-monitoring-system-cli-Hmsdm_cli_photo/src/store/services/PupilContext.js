import React, { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { Alert } from "react-native";


 const PupilContext = createContext();
 export default PupilContext;
export const PupilProvider = ({ children }) => {
  const [Users,setUsers]=useState([]);

  const Pupil =  (json) => {
    setUsers(json);
  };

  
  return (
    <PupilContext.Provider
      value={{ login,Users }}
    >
      {children}
    </PupilContext.Provider>
  );
};

