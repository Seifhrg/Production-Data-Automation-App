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
import Icon from "react-native-vector-icons/Ionicons";

const TransactionHistoryList = ({ navigation }) => {
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
        <Text style={styles.title}>{item.transactionExplanation}</Text>
        <Text style={styles.date}>
          <Icon name="calendar-outline" size={16} color="#888" />{" "}
          {new Date(item.orderAndTransactionDate).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardRow}>
          <Icon name="document-text-outline" size={20} color="#007BFF" />
          <Text style={styles.text}>Order Number: {item.numOF}</Text>
        </View>
        <View style={styles.cardRow}>
          <Icon name="pricetag-outline" size={20} color="#007BFF" />
          <Text style={styles.text}>Article Code: {item.codeArticle}</Text>
        </View>
        <View style={styles.cardRow}>
          <Icon name="document-outline" size={20} color="#007BFF" />
          <Text style={styles.text}>Document Type: {item.documentType}</Text>
        </View>
      </View>
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
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#e3e3e3",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    paddingBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0056b3",
  },
  date: {
    fontSize: 14,
    color: "#6c757d",
    flexDirection: "row",
    alignItems: "center",
  },
  cardContent: {
    paddingTop: 12,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: "#495057",
    marginLeft: 8,
  },
});

export default TransactionHistoryList;
