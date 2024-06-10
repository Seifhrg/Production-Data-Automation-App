import React from "react";
import { useSelector } from "react-redux";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { statusMap } from "../../config/StatusOptions";
import Navbar from "../../components/NavBar";
import { useAuthStore } from "../../providers/AuthProvider";
import { useNavigation } from "@react-navigation/native";
const WorkOrderStatistique = () => {
  const workOrders = useSelector((state) => state.workOrders.workOrders);
  const { logout, user } = useAuthStore();
  const navigation = useNavigation();

  const totalWorkOrders = workOrders.length;

  const statusCounts = workOrders.reduce((acc, order) => {
    acc[order.statusCode] = (acc[order.statusCode] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(statusCounts).map((key) => ({
    name: statusMap[key] || key,
    count: statusCounts[key],
    color: getColor(key),
    legendFontColor: "#333",
    legendFontSize: 15,
    percent: ((statusCounts[key] / totalWorkOrders) * 100).toFixed(1) + "%",
  }));

  function getColor(statusCode) {
    const colors = {
      10: "#FF6384",
      30: "#36A2EB",
      45: "#FFCE56",
      50: "#4BC0C0",
      91: "#9966FF",
      99: "#FF9F40",
      98: "#FF63F4",
    };
    return colors[statusCode] || "#CCCCCC";
  }

  return (
    <SafeAreaView style={styles.container}>
      <Navbar
        user={user}
        onLogout={logout}
        onBack={() => navigation.goBack()}
        title="Statistics"
      />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.header}>Work Order Status Breakdown</Text>
        <View style={styles.chartContainer}>
          <PieChart
            data={chartData}
            width={Dimensions.get("window").width - 32}
            height={320}
            chartConfig={chartConfig}
            accessor="count"
            backgroundColor="transparent"
            paddingLeft="0"
            center={[Dimensions.get("window").width / 4, 0]}
            absolute
            hasLegend={false}
          />
        </View>
        <View style={styles.legendContainer}>
          {chartData.map((item) => (
            <View key={item.name} style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: item.color }]}
              />
              <Text style={styles.legendText}>{item.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#ffffff",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  decimalPlaces: 0,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForLabels: {
    fontSize: 14,
    fontWeight: "bold",
  },
  propsForBackgroundLines: {
    strokeDasharray: "", // solid background lines with no dashes
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
  propsForLabels: {
    fontSize: 14,
    fontWeight: "bold",
    fill: "#333",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
    borderBottomWidth: 2,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  chartContainer: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    width: Dimensions.get("window").width - 32, // Center the chart container
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginTop: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    marginBottom: 15,
  },
  legendColor: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 10,
  },
  legendText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
    textTransform: "capitalize",
  },
});

export default WorkOrderStatistique;
