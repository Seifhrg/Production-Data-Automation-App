import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { API_URL, EMPTY_IMAGE } from "@env";
import tw from "twrnc";
import styles from "./Styles/AdminScreenStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuthStore } from "../providers/AuthProvider";

export default function AdminScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [allUserData, setAllUserData] = useState("");

  const { logout, user, isUserDataSet } = useAuthStore();

  async function getAllData() {
    axios
      .get(`http://${API_URL}/users`)
      .then((res) => {
        setAllUserData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  useEffect(() => {
    getAllData();
  }, []);
  const UserCard = ({ data }) => (
    <View style={styles.card}>
      <Image source={{ uri: data.image || EMPTY_IMAGE }} style={styles.image} />
      <View style={styles.cardDetails}>
        <Text style={styles.name}>
          {data.firstName} {data.lastName}
        </Text>
        <Text style={styles.email}>{data.email}</Text>
        <Text style={styles.userType}>{data.role}</Text>
      </View>
      <View>
        <Icon name="pencil" size={30} color="black" />
      </View>
    </View>
  );
  return (
    <>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.container}>
          {user && isUserDataSet && (
            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {user.firstName} {user.lastName}
              </Text>
              <Text style={styles.userType}>{user.description}</Text>
            </View>
          )}
          <FlatList
            data={allUserData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <UserCard data={item} />}
          />
        </View>
      )}

      <TouchableOpacity
        onPress={logout}
        style={tw`bg-blue-500 w-full rounded-none my-0 p-3`}
      >
        <Text style={tw`text-base text-white text-center`}>Log Out</Text>
      </TouchableOpacity>
    </>
  );
}
