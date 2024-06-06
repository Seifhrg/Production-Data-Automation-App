import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { API_URL } from "@env";
import { useAuthStore } from "../../providers/AuthProvider";
import NavBar from "../../components/NavBar";

// React.memo to prevent unnecessary re-renders.
const LogItem = React.memo(({ item }) => (
  <View style={styles.logItem}>
    <View style={styles.logItemHeader}>
      <Text style={styles.logTitle}>{item.action}</Text>
      <Text style={styles.logDate}>
        {new Date(item.timestamp).toLocaleString()}
      </Text>
    </View>
    <Text style={styles.logText}>Entity: {item.entity}</Text>
    <Text style={styles.logText}>Entity ID: {item.entityId}</Text>
    <Text style={styles.logText}>User ID: {item.userId}</Text>
    <Text style={styles.logText}>Method: {item.method}</Text>
    <Text style={styles.logText}>URL: {item.url}</Text>
    <Text style={styles.logText}>Status Code: {item.statusCode}</Text>
  </View>
));

const Logs = () => {
  const { token, logout, user } = useAuthStore();
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, [selectedDate]);

  const fetchLogs = async () => {
    try {
      const res = await axios.get(`http://${API_URL}/logs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data.filter((log) => log.userId !== null);
      setLogs(data);
      filterLogs(data, selectedDate, searchQuery);
    } catch (error) {
      console.error("Error fetching logs: ", error);
    }
  };

  const filterLogs = (logs, date, query) => {
    const filtered = logs.filter((log) => {
      const logDate = new Date(log.timestamp);
      const isSameDate = logDate.toDateString() === date.toDateString();
      const matchesQuery =
        log.userId.toString().includes(query) ||
        log.entity.toLowerCase().includes(query.toLowerCase());
      return isSameDate && matchesQuery;
    });
    setFilteredLogs(filtered);
  };

  // Callback to prevent unnecessary re-renders.
  const handleSearch = useCallback(
    (query) => {
      setSearchQuery(query);
      filterLogs(logs, selectedDate, query);
    },
    [logs, selectedDate]
  );

  const handleDateChange = (event, date) => {
    const selectedDate = date || new Date();
    setShowDatePicker(false);
    setSelectedDate(selectedDate);
  };

  const renderItem = useCallback(({ item }) => <LogItem item={item} />, []);

  return (
    <SafeAreaView style={styles.container}>
      <NavBar user={user} onLogout={logout} title="Log History" />
      <View style={styles.spacing} />
      <View style={styles.datePickerContainer}>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.datePickerButton}
        >
          <Text style={styles.datePickerButtonText}>
            {selectedDate.toDateString()}
          </Text>
          <Icon name="calendar-today" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by user ID or entity"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {/* FlatList is optimized with initialNumToRender, maxToRenderPerBatch, and windowSize to improve performance. */}
      <FlatList
        data={filteredLogs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
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
  spacing: {
    height: 16,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  datePickerButtonText: {
    flex: 1,
    fontSize: 18,
    color: "#fff",
  },
  searchBar: {
    height: 45,
    borderColor: "#007BFF",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  listContainer: {
    paddingBottom: 20,
  },
  logItem: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  logItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  logTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  logDate: {
    fontSize: 16,
    color: "#666",
  },
  logText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 6,
  },
});

export default Logs;
