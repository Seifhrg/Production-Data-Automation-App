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
        <Icon name="access-time" size={16} color="#888" />{" "}
        {new Date(item.timestamp).toLocaleString()}
      </Text>
    </View>

    <View style={styles.logDetail}>
      <Icon name="person-outline" size={20} color="#007BFF" />
      <Text style={styles.logText}>User ID: {item.userId}</Text>
    </View>
    <View style={styles.logDetail}>
      <Icon name="http" size={20} color="#007BFF" />
      <Text style={styles.logText}>Method: {item.method}</Text>
    </View>
    <View style={styles.logDetail}>
      <Icon name="link" size={20} color="#007BFF" />
      <Text style={styles.logText}>URL: {item.url}</Text>
    </View>
    <View style={styles.logDetail}>
      <Icon name="check-circle-outline" size={20} color="#007BFF" />
      <Text style={styles.logText}>Status Code: {item.statusCode}</Text>
    </View>
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
      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.filterButton}
        >
          <Icon name="calendar-today" size={24} color="#fff" />
          <Text style={styles.filterButtonText}>
            {selectedDate.toDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            style={styles.datePicker}
          />
        )}
        <View style={styles.searchBarContainer}>
          <Icon
            name="search"
            size={24}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchBar}
            placeholder="Search by user ID or entity"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>
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
    backgroundColor: "#f8f9fa",
  },
  spacing: {
    height: 16,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  filterButtonText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 8,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#007BFF",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginLeft: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
  },
  datePicker: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  listContainer: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  logItem: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  logItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    paddingBottom: 8,
  },
  logTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
  },
  logDate: {
    fontSize: 14,
    color: "#666",
    flexDirection: "row",
    alignItems: "center",
  },
  logDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  logText: {
    fontSize: 16,
    color: "#495057",
    marginLeft: 8,
  },
});

export default Logs;
