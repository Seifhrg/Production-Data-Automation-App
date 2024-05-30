import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import axios from "axios";
import { API_URL } from "@env";
export const authContext = createContext({
  _user: undefined,
});

export const useAuthStore = () => useContext(authContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [isUserDataSet, setIsUserDataSet] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const login = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`http://${API_URL}/auth/login`, {
        email,
        password,
      });
      if (res.status == 201) {
        Alert.alert("Logged In Successfully !");
        setToken(res.data.token);
        setUser(res.data.user);
        setIsUserDataSet(true);
        AsyncStorage.setItem("authToken", res.data.token);
      }
    } catch (error) {
      if (error.response && error.response.status == 404) {
      }
      console.log("Error config:", error.config);
      if (error.response) {
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);
        console.log("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.log("Error request:", error.request);
      } else {
        console.log("Error message:", error.message);
      }
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    setToken(undefined);
    setUser(undefined);
    setIsUserDataSet(false);
  };

  const initialize = async () => {
    setIsLoading(true);
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      if (authToken) {
        setToken(authToken);
        const res = await axios.post(
          `http://${API_URL}/users/userData`,
          {},
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        setUser(res.data);
        setIsUserDataSet(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <authContext.Provider
      value={{
        user,
        isUserDataSet,
        login,
        logout,
        initialize,
        isAuthenticated: Boolean(token),
        token: token,
        isLoading,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
