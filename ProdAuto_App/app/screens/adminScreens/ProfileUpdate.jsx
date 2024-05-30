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

export default function ProfileUpdate({ route, navigation }) {
  const { token } = useAuthStore();
  const { user } = route.params;
  const [userData, setUserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: "",
    phoneNumber: user.phoneNumber,
    address: user.address,
    role: user.role,
    description: user.description,
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (validateInput()) {
      setLoading(true);
      axios
        .patch(`http://${API_URL}/users/${user.id}`, userData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res);
          Alert.alert(
            "Congratulations",
            "Your changes have been successfully saved!"
          );
          if (route.params.refresh) {
            route.params.refresh();
          }
          navigation.goBack();
        })
        .catch((error) => {
          console.error(error);
          Alert.alert("Update Failed", "Failed to update profile!");
        })
        .finally(() => setLoading(false));
    } else {
      Alert.alert(
        "Validation Error",
        "Please check your entries and try again."
      );
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
        <Text style={styles.navTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSubmit} style={styles.navButton}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.navButtonText}>Save</Text>
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
