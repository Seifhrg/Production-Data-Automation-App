import React, { useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles/WorkOrderListStyles";
import CircleAvatar from "./CircleAvatar";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWorkOrders,
  selectWorkOrder,
} from "../store/Actions/WorkOrdersActions"; // import the new action

import { statusMap } from "../config/StatusOptions";

const WorkOrderList = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const workOrders = useSelector((state) => state.workOrders.workOrders);
  const status = route.params.status;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(fetchWorkOrders());
    });

    return unsubscribe;
  }, [navigation, dispatch]);

  const filteredData = workOrders.filter(
    (order) => statusMap[order.statusCode] === status
  );
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.navButton}
        >
          <Icon name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Work Order List</Text>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.DOCO.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => {
                dispatch(selectWorkOrder(item)); // dispatch the new action
                navigation.navigate("WorkOrderUpdate");
              }}
              style={styles.cardTouchable}
            >
              <CircleAvatar doco={item.DOCO} />
              <View style={styles.cardDetails}>
                <Text style={styles.documentType}>{item.documentType}</Text>
                <Text style={styles.quantityOrdered}>
                  Quantity Ordered: {item.quantityOrdered}
                </Text>
                <Text style={styles.statusCode}>
                  Status: {statusMap[item.statusCode]}
                </Text>
                <Text style={styles.requestedDate}>
                  Requested Date : {item.requestedDate}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default WorkOrderList;
