import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from "react-native";
import axios from "axios";
import { API_URL } from "@env";
import { useAuthStore } from "../../providers/AuthProvider";
import NavBar from "../../components/NavBar";
const TransactionHistoryList = () => {
  const { logout, user, token } = useAuthStore();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  const fetchTransactionHistory = async () => {
    try {
      const response = await axios.get(
        `http://${API_URL}/transaction-history`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>Transaction ID: {item.UKID}</Text>
        <Text style={styles.date}>
          {new Date(item.orderAndTransactionDate).toLocaleDateString()}
        </Text>
      </View>
      <Text style={styles.text}>Order Number: {item.numOF}</Text>
      <Text style={styles.text}>Article Code: {item.codeArticle}</Text>
      <Text style={styles.text}>Document Type: {item.documentType}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavBar
        user={user}
        onLogout={logout}
        onBack={() => navigation.goBack()}
        title="Transaction History"
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.UKID.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fa",
    paddingTop: Platform.OS === "ios" ? 60 : 0,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingTop: 18,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
});

export default TransactionHistoryList;
