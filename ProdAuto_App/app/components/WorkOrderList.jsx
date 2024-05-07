import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles/WorkOrderListStyles";
import CircleAvatar from "./CircleAvatar";
import Icon from "react-native-vector-icons/Ionicons";

const WorkOrderList = ({ navigation, route }) => {
  const { workOrders } = route.params;

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
        data={workOrders}
        keyExtractor={(item) => item.DOCO.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("WorkOrderUpdate", {
                  workOrder: item,
                })
              }
              style={styles.cardTouchable}
            >
              <CircleAvatar doco={item.DOCO} />
              <View style={styles.cardDetails}>
                <Text style={styles.documentType}>{item.documentType}</Text>
                <Text style={styles.quantityOrdered}>
                  Quantity Ordered: {item.quantityOrdered}
                </Text>
                <Text style={styles.statusCode}>Status: {item.statusCode}</Text>
                <Text style={styles.requestedDate}>
                  Requested Date : {item.requestedDate}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteIcon}
              onPress={() => console.log("Delete Pressed", item)}
            >
              <Icon name="trash-outline" size={24} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default WorkOrderList;
