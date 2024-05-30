import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import styles from "./Styles/AdminScreenStyles";

import axios from "axios";
import { API_URL } from "@env";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuthStore } from "../providers/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import CircleAvatar from "../components/CircleAvatar";
import CustomAlert from "../components/customAlert";
import NavBar from "../components/NavBar";

export default function AdminScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [allUserData, setAllUserData] = useState([]);
  const { logout, user } = useAuthStore();
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { token } = useAuthStore();

  const confirmDelete = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const deleteUser = async (userId) => {
    try {
      res = await axios.delete(`http://${API_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getAllData();
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const getAllData = async () => {
    try {
      const res = await axios.get(`http://${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllUserData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <NavBar
        user={user}
        onLogout={logout}
        onBack={() => navigation.goBack()}
        title="Admin Dashboard"
      />
      <CustomAlert
        isVisible={isModalVisible}
        onConfirm={() => {
          deleteUser(selectedUser.id);
          setModalVisible(false);
        }}
        onCancel={() => setModalVisible(false)}
        user={selectedUser || {}}
      />
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0066CC" />
        </View>
      ) : (
        <FlatList
          data={allUserData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProfileUpdate", {
                    user: item,
                    refresh: getAllData,
                  })
                }
                style={styles.cardTouchable}
              >
                <CircleAvatar
                  firstName={item.firstName}
                  lastName={item.lastName}
                />
                <View style={styles.cardDetails}>
                  <Text style={styles.name}>
                    {item.firstName} {item.lastName}
                  </Text>
                  <Text style={styles.email}>{item.email}</Text>
                  <Text style={styles.userType}>{item.role}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => confirmDelete(item)}
              >
                <Icon name="trash-outline" size={24} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddUser", { refresh: getAllData })}
      >
        <Icon name="add" size={30} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
