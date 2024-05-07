import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import styles from "./Styles/WorkOrderStyle";
import { API_URL } from "@env";

import WorkOrderForm from "../../components/WorkOrderForm";

export default function AddWorkOrder({ navigation, route }) {
  const [workOrderData, setWorkOrderData] = useState({
    quantityOrdered: "",
    requestedDate: new Date(),
    workOrderDate: new Date(),
    startDate: new Date(),
    quantityShipped: "0",
    quantityCanceled: "0",
    unaccountedDirectLaborHours: "0",
    documentType: "",
    statusChangeDate: new Date(),
    statusCode: "",
    completionDate: new Date(),
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function validateInput() {
    let newErrors = {};

    if (!workOrderData.documentType) {
      newErrors.documentType = "Document type is required";
    }
    if (!workOrderData.statusCode) {
      newErrors.statusCode = "Status code is required";
    }
    if (
      workOrderData.quantityOrdered === "" ||
      isNaN(workOrderData.quantityOrdered) ||
      parseInt(workOrderData.quantityOrdered) < 1
    ) {
      newErrors.quantityOrdered = "Quantity ordered must be a positive number";
    }
    if (
      isNaN(workOrderData.quantityShipped) ||
      parseInt(workOrderData.quantityShipped) < 0
    ) {
      newErrors.quantityShipped = "Quantity shipped cannot be negative";
    }
    if (
      isNaN(workOrderData.quantityCanceled) ||
      parseInt(workOrderData.quantityCanceled) < 0
    ) {
      newErrors.quantityCanceled = "Quantity canceled cannot be negative";
    }
    if (
      isNaN(workOrderData.unaccountedDirectLaborHours) ||
      parseInt(workOrderData.unaccountedDirectLaborHours) < 0
    ) {
      newErrors.unaccountedDirectLaborHours =
        "Unaccounted direct labor hours cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (validateInput()) {
      setLoading(true);
      const updatedData = {
        ...workOrderData,
        quantityOrdered: parseInt(workOrderData.quantityOrdered, 10),
        quantityShipped: parseInt(workOrderData.quantityShipped, 10),
        quantityCanceled: parseInt(workOrderData.quantityCanceled, 10),
        unaccountedDirectLaborHours: parseInt(
          workOrderData.unaccountedDirectLaborHours,
          10
        ),
      };

      axios
        .post(`http://${API_URL}/work-orders`, updatedData)
        .then((res) => {
          Alert.alert("Success", "New Work Order Added");
          if (route.params?.refresh) {
            route.params.refresh();
          }
          navigation.goBack();
        })
        .catch((error) => {
          console.log(updatedData);
          console.error("Add Failed", error);
          Alert.alert(
            "Error",
            "Failed to add the work order. Please try again."
          );
        })
        .finally(() => setLoading(false));
    } else {
      let errorMessages = Object.values(errors).join("\n");
      Alert.alert(
        "Validation Error",
        errorMessages ||
          "Please fill all necessary fields correctly and try again."
      );
    }
  }

  const handleInputChange = (field, value) => {
    setWorkOrderData({ ...workOrderData, [field]: value });
    // Also clear errors as the user types
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.navButton}
        >
          <Icon name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Add Work Order</Text>
      </View>
      <WorkOrderForm
        workOrderData={workOrderData}
        handleInputChange={handleInputChange}
        errors={errors}
        handleSubmit={handleSubmit}
      />
    </ScrollView>
  );
}
