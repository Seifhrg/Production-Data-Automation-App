import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import styles from "../Styles/ProfileUpdateStyles";
import { API_URL } from "@env";
import FormAdmin from "../../components/FormAdmin";
import { useAuthStore } from "../../providers/AuthProvider";

export default function AddUser({ navigation, route }) {
  const { token } = useAuthStore();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    role: "Agent",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    phoneNumber: "",
  });
  function validateInput() {
    let newErrors = {};
    if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (userData.phoneNumber.length !== 8) {
      newErrors.phoneNumber = "Incorrect phone number";
    }
    if (userData.password.length < 6)
      newErrors.password = "Password must be over 6 caractere";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }
  function handleSubmit() {
    if (validateInput()) {
      setLoading(true);
      axios
        .post(`http://${API_URL}/users`, userData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res);
          Alert.alert("Profile Added", "Profile have been successfully added!");
          if (route.params.refresh) {
            route.params.refresh();
          }
          navigation.goBack();
        })
        .catch(() => {
          Alert.alert("Add Failed", "email or phone already exist !");
        })
        .finally(() => setLoading(false));
    } else {
      Alert.alert("Validation Error", "Please fill all fields and try again.");
    }
  }
  const handleInputChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.navButton}
        >
          <Icon name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Add Profile</Text>
        <TouchableOpacity onPress={handleSubmit} style={styles.navButton}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.navButtonText}>Add</Text>
          )}
        </TouchableOpacity>
      </View>
      <FormAdmin
        userData={userData}
        handleInputChange={handleInputChange}
        errors={errors}
      />
    </ScrollView>
  );
}
