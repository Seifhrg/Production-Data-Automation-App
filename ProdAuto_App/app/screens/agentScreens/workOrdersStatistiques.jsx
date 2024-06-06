import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";

const screenWidth = Dimensions.get("window").width;

const WorkOrderStatistique = () => {
  const workOrders = useSelector((state) => state.workOrders.workOrders);

  if (!workOrders || workOrders.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>No work orders available.</Text>
      </View>
    );
  }

  const workOrderQuantityData = {
    labels: workOrders.map((order) => `WO ${order.DOCO}`),
    datasets: [
      {
        data: workOrders.map((order) => order.quantityOrdered),
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        label: "Ordered",
      },
      {
        data: workOrders.map((order) => order.quantityShipped),
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
        label: "Shipped",
      },
      {
        data: workOrders.map((order) => order.quantityCanceled),
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        label: "Canceled",
      },
    ],
  };

  const workOrderCompletionTimeData = {
    labels: workOrders.map((order) => `WO ${order.DOCO}`),
    datasets: [
      {
        data: workOrders.map((order) => {
          const start = new Date(order.startDate);
          const end = new Date(order.completionDate);
          return (end - start) / (1000 * 60 * 60 * 24); // Days difference
        }),
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        label: "Completion Time (Days)",
      },
    ],
  };

  const workOrderTimelineData = {
    labels: workOrders.map((order) => `WO ${order.DOCO}`),
    datasets: [
      {
        data: workOrders.map((order) => new Date(order.startDate).getTime()),
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        label: "Start Date",
      },
      {
        data: workOrders.map((order) =>
          new Date(order.completionDate).getTime()
        ),
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
        label: "Completion Date",
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Work Order Statistics</Text>

      <Text style={styles.chartTitle}>Work Order Quantities</Text>
      <BarChart
        data={workOrderQuantityData}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
        yAxisSuffix=" units"
        fromZero
      />

      <Text style={styles.chartTitle}>Work Order Completion Time</Text>
      <LineChart
        data={workOrderCompletionTimeData}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
        yAxisSuffix=" days"
        fromZero
      />

      <Text style={styles.chartTitle}>Work Order Timeline</Text>
      <LineChart
        data={workOrderTimelineData}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
        yAxisSuffix=" ms"
        fromZero
      />
    </ScrollView>
  );
};

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fa",
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: 8,
    textAlign: "center",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default WorkOrderStatistique;
