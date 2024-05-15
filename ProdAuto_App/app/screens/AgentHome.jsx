import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "./Styles/AgentHomeStyles";
import { LinearGradient } from "expo-linear-gradient";
import { useAuthStore } from "../providers/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { fetchWorkOrders } from "../store/Actions/WorkOrdersActions";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import { statusMap } from "../config/StatusOptions";
const AgentHome = () => {
  const navigation = useNavigation();
  const { logout, user } = useAuthStore();

  const dispatch = useDispatch();
  const workOrders = useSelector((state) => state.workOrders.workOrders);

  const [launchedOrders, setLaunchedOrders] = useState([]);
  const [materialIssuedOrders, setMaterialIssuedOrders] = useState([]);
  const [partialReceiptOrders, setPartialReceiptOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [accountingCompletedOrders, setAccountingCompletedOrders] = useState(
    []
  );
  const [closedOrders, setClosedOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(fetchWorkOrders());
    });

    return unsubscribe;
  }, [navigation, dispatch]);

  useEffect(() => {
    const data = workOrders.map((order) => ({
      ...order,
      statusCode: statusMap[order.statusCode] || "Unknown Status",
    }));

    setLaunchedOrders(
      data.filter((order) => order.statusCode === statusMap[10])
    );
    setMaterialIssuedOrders(
      data.filter((order) => order.statusCode === statusMap[30])
    );
    setPartialReceiptOrders(
      data.filter((order) => order.statusCode === statusMap[45])
    );
    setCompletedOrders(
      data.filter((order) => order.statusCode === statusMap[50])
    );
    setAccountingCompletedOrders(
      data.filter((order) => order.statusCode === statusMap[91])
    );
    setClosedOrders(data.filter((order) => order.statusCode === statusMap[99]));
  }, [workOrders]);

  return (
    <SafeAreaView style={styles.container}>
      <NavBar
        user={user}
        onLogout={logout}
        onBack={() => navigation.goBack()}
        title="Agent Dashboard"
      />
      <View style={styles.container2}>
        <View style={styles.totalCard}>
          <Text style={styles.totalCardTitle}>Total Work Orders</Text>
          <Text style={styles.totalCardCount}>{workOrders.length}</Text>
        </View>
        {[
          {
            title: statusMap[10],
            data: launchedOrders,
            colors: ["#76d275", "#48a162"],
          },
          {
            title: statusMap[30],
            data: materialIssuedOrders,
            colors: ["#f4d35e", "#ee964b"],
          },
          {
            title: statusMap[45],
            data: partialReceiptOrders,
            colors: ["#ffbb00", "#fe8c00"],
          },
          {
            title: statusMap[50],
            data: completedOrders,
            colors: ["#f25f5c", "#c94b4b"],
          },
          {
            title: statusMap[91],
            data: accountingCompletedOrders,
            colors: ["#8e44ad", "#9b59b6"],
          },
          {
            title: statusMap[99],
            data: closedOrders,
            colors: ["#3498db", "#2980b9"],
          },
        ].map((card, index) => (
          <AnimatedCard
            key={index}
            title={card.title}
            count={card.data.length.toString()}
            colors={card.colors}
            onPress={() =>
              navigation.navigate("WorkOrderList", {
                status: card.title,
              })
            }
          />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#4A90E2" }]}
          onPress={() => navigation.navigate("AddWorkOrder")}
        >
          <Text style={styles.buttonText}>Add New Work Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const AnimatedCard = ({ title, count, colors, onPress }) => {
  const scale = useSharedValue(1);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <TouchableOpacity
      onPressIn={() => {
        scale.value = withSpring(0.95);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      onPress={onPress}
      style={styles.cardTouchable}
    >
      <Animated.View style={[styles.card, animatedStyles]}>
        <LinearGradient colors={colors} style={styles.gradient}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardCount}>{count}</Text>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};
export default AgentHome;
