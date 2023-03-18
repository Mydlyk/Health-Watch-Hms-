import React, { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isDoctor, setIsDoctor] = useState("false");
  const url = '192.168.1.13';
  const [Users,setUsers]=useState(['']);
  const [patients,setpatients]=useState(['']);

  const login = async (email, password) => {
    try {
      await axios
        .post(`http://${url}:8080/login`, {
          username: email,
          password: password,
        })
        .then((response) => {
          let isdoctor = response.headers.isdoctor;
          let token = response.headers.authorization.slice(7);
          setIsLoading(true);
          setIsDoctor(isdoctor);
          setUserToken(token);
          setUserEmail(email);
          save("token", token);
          save("email", email);
          save("isdoctor", isdoctor);
          setIsLoading(false);
        });
    } catch (error) {
      Alert.alert("Incorrect data", "Please enter correct login details!");
    }
  };
  const pupil = (json) => {
    setUsers(json);
  };
  const patient = (json) => {
    setpatients(json);
  };
  const logout = () => {
    setIsLoading(true);
    save("token", "");
    save("email", "");
    setUserToken("");
    setUserEmail("");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await SecureStore.getItemAsync("token");
      let isDoctor = await SecureStore.getItemAsync("isdoctor");
      setUserToken(userToken);
      setIsDoctor(isDoctor);
      setIsLoading(false);
      console.log(userToken);
    } catch (e) {
      console.log("error: " + e);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{ login, logout,pupil,patient,patients,Users, isLoading, userToken, userEmail, isDoctor, url }}
    >
      {children}
    </AuthContext.Provider>
  );
};

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
  console.log("after save: " + (await SecureStore.getItemAsync(key)));
}

async function getValueFor(key) {
  return await SecureStore.getItemAsync(key);
}

async function deleteItem(key) {
  await SecureStore.deleteItemAsync(key);
}
