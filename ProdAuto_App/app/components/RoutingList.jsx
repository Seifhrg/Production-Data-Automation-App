import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "@env";
import { useAuthStore } from "../providers/AuthProvider";
import Icon from "react-native-vector-icons/Ionicons";

const RoutingList = ({ navigation }) => {
  const [routingList, setRoutingList] = useState([]);
  const [KITL, setKITL] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useAuthStore();
  const workOrder = useSelector((state) => state.workOrders.selectedWorkOrder);
  const numOF = workOrder.DOCO;

  useEffect(() => {
    fetchRoutingList();
  }, []);

  const fetchRoutingList = async () => {
    try {
      const response = await axios.get(
        `http://${API_URL}/work-order-routing/${numOF}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRoutingList(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleCopyOperations = async () => {
    try {
      const response = await axios.post(
        `http://${API_URL}/work-order-routing/copy-operations`,
        {
          numOF,
          KITL,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRoutingList(response.data);
    } catch (error) {
      Alert.alert("Error", "No routing found with this KITL");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Routing List </Text>
      </View>
      {routingList.length === 0 ? (
        <View style={styles.noRoutingContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter KITL"
            value={KITL}
            onChangeText={setKITL}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleCopyOperations}
          >
            <Text style={styles.buttonText}>Attach Routing Operations</Text>
          </TouchableOpacity>
          <Text style={styles.noRoutingText}>
            No routing found for this work order
          </Text>
        </View>
      ) : (
        routingList.map((routing, index) => (
          <View key={index} style={styles.routingItem}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>Operation {index + 1}</Text>
            </View>
            <View style={styles.itemContent}>
              <View style={styles.itemRow}>
                <Icon name="code-working" size={20} color="#007AFF" />
                <Text style={styles.label}>Sequence Number:</Text>
                <Text style={styles.itemText}>
                  {routing.sequenceNumberOperations}
                </Text>
              </View>
              <View style={styles.itemRow}>
                <Icon name="business" size={20} color="#007AFF" />
                <Text style={styles.label}>Business Unit:</Text>
                <Text style={styles.itemText}>{routing.businessUnit}</Text>
              </View>
              <View style={styles.itemRow}>
                <Icon name="document-text" size={20} color="#007AFF" />
                <Text style={styles.label}>Description:</Text>
                <Text style={styles.itemText}>{routing.Description}</Text>
              </View>
              <View style={styles.itemRow}>
                <Icon name="flash-outline" size={20} color="#007AFF" />
                <Text style={styles.label}>Run Labour:</Text>
                <Text style={styles.itemText}>{routing.runLabour}</Text>
              </View>
              <View style={styles.itemRow}>
                <Icon name="cog" size={20} color="#007AFF" />
                <Text style={styles.label}>Run Machine:</Text>
                <Text style={styles.itemText}>{routing.runMachine}</Text>
              </View>
              <View style={styles.itemRow}>
                <Icon name="hammer" size={20} color="#007AFF" />
                <Text style={styles.label}>Setup Labor:</Text>
                <Text style={styles.itemText}>{routing.setupLabor}</Text>
              </View>
              <View style={styles.itemRow}>
                <Icon name="barcode" size={20} color="#007AFF" />
                <Text style={styles.label}>KITL:</Text>
                <Text style={styles.itemText}>{routing.KITL}</Text>
              </View>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    paddingTop: Platform.OS === "ios" ? 60 : 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 20,
    textAlign: "center",
    color: "#007AFF",
    fontFamily: "Roboto",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CED0CE",
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  routingItem: {
    backgroundColor: "#FFF",
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    borderLeftWidth: 5,
    borderLeftColor: "#007AFF",
    overflow: "hidden",
  },
  itemHeader: {
    backgroundColor: "#007AFF",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
  },
  itemContent: {
    padding: 15,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: "#555",
    marginLeft: 10,
  },
  label: {
    fontWeight: "600",
    color: "#007AFF",
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  noRoutingContainer: {
    alignItems: "center",
    paddingTop: 40,
  },
  noRoutingText: {
    marginTop: 20,
    fontSize: 18,
    color: "#FF3B30",
    textAlign: "center",
    fontWeight: "bold",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },

  navTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
});

export default RoutingList;
