import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";
import { API_URL } from "@env";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../../providers/AuthProvider";
import NavBar from "../../components/NavBar";

const InventoryList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { logout, user, token } = useAuthStore();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://${API_URL}/item-location`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, item.quantityAvailable <= 60 && styles.cardWarning]}
      onPress={() => navigation.navigate("ItemDetails", { item })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.title}>Article Code: {item.codeArticle}</Text>
        <Icon name="info" size={24} color="#fff" />
      </View>
      <View style={styles.cardBody}>
        <View style={styles.cardDetail}>
          <Text style={styles.label}>Lot Status:</Text>
          <Text style={styles.value}>{item.lotStatusCode}</Text>
        </View>
        <View style={styles.cardDetail}>
          <Text style={styles.label}>Quantity On Hand:</Text>
          <Text style={styles.value}>{item.quantityOnHand}</Text>
        </View>
        <View style={styles.cardDetail}>
          <Text style={styles.label}>Quantity Reserved:</Text>
          <Text style={styles.value}>{item.quantityReserved}</Text>
        </View>
        <View style={styles.cardDetail}>
          <Text style={styles.label}>Quantity Available:</Text>
          <Text
            style={
              item.quantityAvailable <= 60 ? styles.valueWarning : styles.value
            }
          >
            {item.quantityAvailable}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavBar
        user={user}
        onLogout={logout}
        onBack={() => navigation.goBack()}
        title="Inventory List"
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.codeArticle.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    overflow: "hidden",
  },
  cardWarning: {
    borderColor: "#ff4d4d",
    borderWidth: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  cardBody: {
    paddingTop: 8,
  },
  cardDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  value: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  valueWarning: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ff4d4d",
  },
});

export default InventoryList;
